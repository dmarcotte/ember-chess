(function() {

  /**
   * Call Chess.gameController.set('game', yourGame) with `yourGame`
   * of type Chess.game to watch the game unfold
   */
  Chess.gameController = Em.Object.create({

    /**
     * The game.  Ideally set this to something, otherwise
     * this isn't a very interesting app...
     */
    gameDefinition: Chess.Game.create(),

    gamePieces: Chess.ChessSet.create(),

    _moveNumber: -1,

    _getPieceAtPosition: function(position) {
      var gamePieceArray = this.get('gamePieces').get('content');

      var idx = gamePieceArray.length;
      var pieceAtPosition;
      while (idx--) {
        var piece = gamePieceArray[idx];
        if (piece.position.rank === position.rank
          && piece.position.file === position.file
          && !piece.captured) {
          pieceAtPosition = piece;
        }
      }

      return pieceAtPosition
    },

    /**
     * Returns a sparse array of captured pieces, indexed by the move number at which they were captured
     */
    captured: function() {
      var gamePieceArray = this.get('gamePieces').get('content');

      var idx = gamePieceArray.length;
      var capturedPieces = [];
      while (idx--) {
        var piece = gamePieceArray[idx];
        if (piece.captured) {
          capturedPieces[piece.captured] = piece;
        }
      }

      return capturedPieces;
    }.property('_moveNumber'),

    /**
     * Record the capture of a piece in this game
     * @param piece The piece that has been captured
     * @param moveNumber The move number on which the piece was captured
     */
    _capture: function(piece, moveNumber) {
      piece.set('captured', moveNumber);
    },

    /**
     * Undo a previous capture, which occurred at the given move.
     * Returns the un-captured piece, or undefined if there was not a capture at this move.
     *
     * @param moveNumber  The move number for which to revert a capture
     */
    _revertCapture: function(moveNumber) {
      var gamePieceArray = this.get('gamePieces').get('content');

      var idx = gamePieceArray.length;
      while (idx--) {
        var piece = gamePieceArray[idx];
        if (piece.get('captured') === moveNumber) {
          piece.set('captured', undefined);
          break;
        }
      }
    },

    /**
     * Returns the move which this game is currently on
     */
    currentMove: function() {
      return this.get('gameDefinition').moves[this.get('_moveNumber')]
    }.property('_moveNumber').cacheable(),

    previousMove: function() {
      if (this.get('_moveNumber') < 0) {
        // no previous moves; do nothing
        return;
      }

      var move = this.get('currentMove');

      var movePiece = this._getPieceAtPosition(move.toPos);
      movePiece.set('position', move.fromPos);

      // if there's a captured piece for the move we're reverting, grant it new life
      this._revertCapture(this.get('_moveNumber'));

      this.set('_moveNumber', this.get('_moveNumber') - 1);
    },

    nextMove: function() {
      if (this.get('_moveNumber') === this.get('gameDefinition').moves.length - 1) {
        // no more moves; do nothing
        return;
      }

      this.set('_moveNumber', this.get('_moveNumber') + 1);

      var move = this.get('gameDefinition').moves[this.get('_moveNumber')];

      var movePiece = this._getPieceAtPosition(move.fromPos);

      // if there's a piece at the position we're about to occupy, capture it
      var capturedPiece = this._getPieceAtPosition(move.toPos);
      if (capturedPiece) {
        this._capture(capturedPiece, this.get('_moveNumber'));
      }

      movePiece.set('position', move.toPos);
    },


    /**
     * Timer to trigger moves when 'playing'
     */
    _playTimer: null,

    /**
     * Returns true if this gameController is currently automatically
     * playing its game
     */
    playing: function() {
      return !!this.get('_playTimer');
    }.property('_playTimer'),


    /**
     * Call this to make this gameController automatically play this game
     */
    play: function() {
      if (this.get('playing')) {
        // already playing, do nothing
        return;
      }
      var that = this;
      that.nextMove();
      this.set('_playTimer', setInterval(function() {that.nextMove()}, 1500));
    },

    /**
     * Call this to pause the automatic game kicked off by Chess.gameController.play
     *
     */
    pause: function() {
      if (!this.get('playing')) {
        // not playing, nothing to do
        return;
      }
      clearInterval(this.get('_playTimer'));
      this.set('_playTimer', null);
    }
  });
})();