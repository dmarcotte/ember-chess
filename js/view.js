(function() {
  var SQUARE_DIMENSION = 50,
    BOARD_DIMENSION = SQUARE_DIMENSION*8;
  
  /**
   * Chess.PieceView renders a Chess.Piece
   *
   * Chess.PieceView expects subclasses to provide a `piece` property
   * of type Chess.Piece
   */
  Chess.PieceView = SC.View.extend({
    templateName: 'chessPieceTmpl',
    classNames: 'chess-piece',
    piece: null,
    symbol: function() {
      return this.get('piece').unicode[this.get('piece').color]
    }.property('piece').cacheable()
  });

  /**
   * Subclasses must override color to specify whether they want the
   * white captured pieces, or the black
   */
  Chess.CapturedView = SC.CollectionView.extend({
    color: null,
    capturedForColor: function() {
      var captured = Chess.gameController.get('captured');
      var capturedForColor = [];

      // grab the captured pieces for the color we care about
      for (var prop in captured) {
        if (!captured.hasOwnProperty(prop)) {
          continue;
        }
        var capturedPiece = captured[prop];
        if (capturedPiece && capturedPiece.color === this.get('color')) {
          capturedForColor.push(capturedPiece);
        }
      }

      // sort them in order of move the were captured on dm todo sort these?
      return capturedForColor;
    }.property('Chess.gameController.captured').cacheable(),
    contentBinding: 'capturedForColor',
    itemViewClass: Chess.PieceView.extend({
      pieceBinding: 'content'
    })
  });

  /**
   * Chess.GameInfoView renders information on the game in progress
   */
  Chess.GameInfoView = SC.View.extend({
    gameBinding: 'Chess.gameController',
    capturedWhiteView: Chess.CapturedView.extend({
      color: 'white'
    }),
    capturedBlackView: Chess.CapturedView.extend({
      color: 'black'
    })
  });

  /**
   * Chess.GameView renders a Chess.Game, animating a progression through
   * the game
   */
  Chess.GameView = SC.View.extend({
    classNames: 'chess-board-view',
    /**
     * Compute the {top, left} pair representing where we want to render
     * the given piece, based on its game position, in DOM element relative
     * to this GameView
     */
    computeElemPosition: function(piece) {
      var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        top,
        left;

      if (!piece.position) {
        // this piece should not be placed on the board
        return null;
      }

      switch (piece.get('color')) {
        case 'white':
          top = BOARD_DIMENSION - (SQUARE_DIMENSION * (piece.position.rank));
          left = (SQUARE_DIMENSION * ($.inArray(piece.position.file, files)));
          break;
        case 'black':
          top = (SQUARE_DIMENSION * (8 - piece.position.rank));
          left = (SQUARE_DIMENSION * ($.inArray(piece.position.file, files)));
          break;
        default:
          throw "Er... there's no third color in chess!";
      }
      return {top: top, left: left};
    },
    /**
     * GamePiecesView renders the Chess.Pieces which are actually part of
     * this game.  It is a collection of Chess.PieceView specialized to
     * render on the board, and animate between positions
     */
    GamePiecesView: SC.CollectionView.extend({
      contentBinding: 'Chess.gameController.gamePieces',
      itemViewClass: Chess.PieceView.extend({
        pieceBinding: 'content',
        classNames: 'chess-piece-in-game square',
        gameViewBinding: 'parentView.parentView',
        positionDidChange: function() {
          var elemPosition = this.get('gameView').computeElemPosition(this.get('piece'));

          if (elemPosition) {
            if (!this.$().is(':visible')) {
              this.$().show();
              this.$().animate({opacity: 1});
            }
            this.$().animate({top: elemPosition.top, left: elemPosition.left}, 300);
          } else {
            this.$().animate({opacity: 0}, function() {
              $(this).hide();
            });
          }
        }.observes('piece.position'),
        didInsertElement: function() {
          var elemPosition = this.get('gameView').computeElemPosition(this.get('piece'));

          // set initial position in the document and ensure that the piece is showing
          if (elemPosition) {
            this.$().css({
              top: elemPosition.top,
              left: elemPosition.left
            }).show();
          } else {
            this.$().hide();
          }
        }
      })
    })
  });

  /**
   * Base button for our chess viewer
   */
  Chess.Button = SC.Button.extend({
    target: 'Chess.gameController',
    classNames: 'chess-game-info-button',
    touchStart: function(touch) {
      // do nothing (prevents double clicks on touch devices); this will be
      // addressed in a future release of SC2
    },

    touchEnd: function(touch) {
      // do nothing (prevents double clicks on touch devices); this will be
      // addressed in a future release of SC2
    }
  });

  /**
   * Next button moves the viewer to the chess viewer to the
   * game's next move
   */
  Chess.NextButton = Chess.Button.extend({
    action: 'nextMove'
  });

  /**
   * Previous button moves the viewer to the chess viewer to the
   * game's previous move
   */
  Chess.PreviousButton = Chess.Button.extend({
    action: 'previousMove'
  });

  /**
   * Play/pause toggle for Chess.gameController
   */
  Chess.PlayButton = Chess.Button.extend({
    playingBinding: 'Chess.gameController.playing',
    action: function() {
      if (this.get('playing')) {
        return 'pause';
      } else {
        return 'play';
      }
    }.property('playing'),
    text: function() {
      return this.get('playing') ? 'Pause' : 'Play';
    }.property('playing')
  });
})();