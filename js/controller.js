(function() {
  /**
   * Convenience function which helps us create our chess board
   */
  var createRank = function() {
    return {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null
    }
  };

  /**
   * Call Chess.gameController.set('game', yourGame) with `yourGame`
   * of type Chess.game to watch the game unfold
   */
  Chess.gameController = SC.Object.create({

    /**
     * The game.  Ideally set this to something, otherwise
     * this isn't a very interesting app...
     */
    gameDefinition: Chess.Game.create(),

    gamePieces: Chess.ChessSet.create(),

    _moveNumber: -1,

    /**
     * We maintain a record of which pieces have been captured as the game progresses,
     * indexed by moveNumber
     */
    captured: SC.Object.create({}),

    /**
     * Record the capture of a piece in this game
     * @param piece The piece that has been captured
     * @param moveNumber The move number on which the piece was captured
     */
    _capture: function(piece, moveNumber) {
      this.get('captured').set(moveNumber.toString(), piece);
      // dm todo shouldn't have to do this... file a bug, and refactor captured
      SC.propertyWillChange(this, 'captured');
      SC.propertyDidChange(this, 'captured');
    },

    /**
     * Undo a previous capture, which occurred at the given move.
     * Returns the un-captured piece, or undefined if there was not a capture at this move.
     *
     * @param moveNumber  The move number for which to revert any captures
     */
    _revertCapture: function(moveNumber) {
      var restoredPiece = this.get('captured').get(moveNumber.toString());
      if (restoredPiece) {
        this.get('captured').set(moveNumber, undefined);
      }
      // dm todo shouldn't have to do this... file a bug, and refactor captured
      SC.propertyWillChange(this, 'captured');
      SC.propertyDidChange(this, 'captured');
      return restoredPiece;
    },

    /**
     * A 'board' to place the game's pieces on.  By mirroring an actual
     * board, this makes piece lookup really easy
     */
    board: {
      8: createRank(),
      7: createRank(),
      6: createRank(),
      5: createRank(),
      4: createRank(),
      3: createRank(),
      2: createRank(),
      1: createRank()
    },

    /**
     * Place a 'chess set' on the 'board'.
     *
     * Note that `init` is automatically called by SC on construction
     */
    init: function() {
      var ret = this._super();
      this.get('gamePieces').forEach(function(piece) {
        this.board[piece.get('position').rank][piece.get('position').file] = piece;
      }, this);
      return ret;
    },

    // dm todo everyone should be calling this.  Also fix up its naming:
    // it currently sounds like an action because of nextMove and previousMove
    currentMove: function() {
      return this.get('gameDefinition').moves[this.get('_moveNumber')]
    }.property('_moveNumber').cacheable(),

    previousMove: function() {
      if (this.get('_moveNumber') < 0) {
        // no previous moves; do nothing
        return;
      }

      var move = this.get('gameDefinition').moves[this.get('_moveNumber')];
      var movePiece = this.board[move.toPos.rank][move.toPos.file];

      // sanity check that we've got the right piece
      if (!movePiece || movePiece.symbol !== move.pieceSymbol || movePiece.color != move.color) {
        throw 'Move does not match current board';
      }

      this.board[move.toPos.rank][move.toPos.file] = null;
      this.board[move.fromPos.rank][move.fromPos.file] = movePiece;
      movePiece.set('position', move.fromPos);

      // if there's a captured piece at the position we're reverting from, grant it new life
      var capturedPiece = this._revertCapture(this.get('_moveNumber'));
      if (capturedPiece) {
        capturedPiece.set('position', move.toPos);
        this.board[capturedPiece.position.rank][capturedPiece.position.file] = capturedPiece;
      }

      this.set('_moveNumber', this.get('_moveNumber') - 1);
    },

    nextMove: function() {
      if (this.get('_moveNumber') === this.get('gameDefinition').moves.length - 1) {
        // no more moves; do nothing
        return;
      }

      this.set('_moveNumber', this.get('_moveNumber') + 1);

      var move = this.get('gameDefinition').moves[this.get('_moveNumber')];
      var movePiece = this.board[move.fromPos.rank][move.fromPos.file];

      // sanity check that we've got the right piece
      if (!movePiece || movePiece.symbol !== move.pieceSymbol || movePiece.color != move.color) {
        throw 'Move does not match current board';
      }

      this.board[move.fromPos.rank][move.fromPos.file] = null;

      // if there's a piece at the position we're about to occupy, capture it
      var capturedPiece = this.board[move.toPos.rank][move.toPos.file];
      if (capturedPiece) {
        capturedPiece.set('position', null);
        // record that this piece was captured here in case we need to un-capture it later
        this._capture(capturedPiece, this.get('_moveNumber'));
      }

      movePiece.set('position', move.toPos);
      this.board[movePiece.position.rank][movePiece.position.file] = movePiece;
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