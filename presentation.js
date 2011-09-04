





/**
 * SPROUTCORE
 *
 * 1. Sproutcore in a nutshell
 * 2. Model objects and classical inheritance
 * 3. Building an application
 * 4. Building UI
 * 5. Game Changer
 */














/*******************************************************************************
1. SPROUTCORE IN A NUTSHELL
 *
 * Sproutcore is a javascript library which facilitates
 * building rich applications on the client side
 */












/**
 * OKAY... WHAT ABOUT OUTSIDE OF A NUTSHELL?
 *
 * Sproutcore provides js infrastructure for the following:
 *
 * - data bindings
 *
 * - binding-aware templates
 *
 * - observers and dependant, computed properties
 *
 * - classical object inheritance
 *
 * - buffered DOM update
 */









/**
 * CHECK OUT THIS CHESS APP!  Get it...?  "Check"... huhn?  Anybody?
 *
 * To show off Sproutcore and demonstrate how it works, we're going to
 * become best MATES with an application which plays through chess games.
 */












/*******************************************************************************
2.MODEL OBJECTS AND CLASSICAL INHERITANCE
 */



  /**
   * Base class for chess pieces
   *
   * Note the 'extend' method
   */
  Chess.Piece = SC.Object.extend({
      symbol: '',
      color: null,
      unicode: {black: '', white: ''},
      position: {rank: -1, file: ''},
      toString: function() {
        return this.get('color') + this.get('symbol');
      }
    });



  Chess.King = Chess.Piece.extend({
    symbol: 'K',
    unicode: {
      black: '&#9818;',
      white: '&#9812;'
    }
  });

  Chess.Queen = Chess.Piece.extend({
    symbol: 'Q',
    unicode: {
      black: '&#9819;',
      white: '&#9813;'
    }
  });
  /* and so on...*/


 /**
  * Note that for our Piece objects, we're calling 'create' rather than
  * 'extend' now
  */
  Chess.chessSet = SC.ArrayProxy.extend({
    content: [
      Chess.Rook.create({ color: 'white', position: {rank: 1, file: 'a'} }),
      Chess.Knight.create({ color: 'white', position: {rank: 1, file: 'b'} }),
      /** ...snip!... **/
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'g'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'h'} })
    ]
  });


/**
 * Digression: ArrayProxy
 *
 * ArrayProxy is one of the base classes Sproutcore provides.  It's often
 * the workhorse of Sproutcore apps since I've found it to be great for data
 * driven apps.
 *
 * The reason we would proxy an array is two-fold:
 * - so that we can cleanly enhance the array with convenience functions
 *    (like `.forEach` and `.filter`)
 * - to enable data binding/observing on arrays 
 *    (spoilers!  We're not at bindings yet...)
 */











  /**
   * Note that we're really taking this "modelling" business seriously here...
   * this is the essence of chess game, without anything telling us how
   * to play it, or how to display it.
   */
  Chess.theImmortalGame = Chess.Game.create({
      title: 'The Immortal Game',
      whitePlayer: 'Adolf Anderssen',
      blackPlayer: 'Lionel Kieseritzky',
      moves: [
        {
          pieceSymbol: 'P',
          color: 'white',
          fromPos: {file: 'e', rank: 2},
          toPos: {file: 'e', rank: 4},
          comment: ''
        },
        {
          pieceSymbol: 'P',
          color: 'black',
          fromPos: {file: 'e', rank: 7},
          toPos: {file: 'e', rank: 5},
          comment: ''
        }
        /** ... snip! a whole bunch of moves ... **/
    ]
  });













/*******************************************************************************
3. BUILDING AN APPLICATION
 *
 * Alright!  We've modelled chess... now can we play?
 */


  /**
   * Chess.gameController is the heart of this app, taking care of the
   * actual business of managing the state of the game
   */
  Chess.gameController = SC.Object.create({

    /**
     * The game.  Ideally set this to something, otherwise
     * this isn't a very interesting app...
     */
    gameDefinition: Chess.Game.create(),



    /**
     * We maintain the lists of which pieces have been captured as the game
     * progresses
     *
     * Still in `Chess.gameController = SC.Object.create({`
     */
    captured: SC.Object.create({
      white: SC.ArrayProxy.create({content: []}),
      black: SC.ArrayProxy.create({content: []})
    }),




    /**
     * A 'board' to place the game's pieces on.  By mirroring an actual
     * board, this makes piece lookup really easy
     *
     * Still in `Chess.gameController = SC.Object.create({`
     */
    board: {
      /** ... snip! create 8x8 board ...**/
    },





    /**
     * Place a 'chess set' on the 'board'.
     *
     * Note that `init` is automatically called by SC on construction
     *
     * Note also the "_super" invocation
     *
     * Still in `Chess.gameController = SC.Object.create({`
     */
    init: function() {
      var ret = this._super();

      // neat-o ArrayProxy.forEach
      Chess.chessSet.get('content').forEach(function(piece) {
        this.board[piece.get('position').rank][piece.get('position').file] 
          = piece;
      }, this);

      return ret;
    }

    



    /**
     * Still in `Chess.gameController = SC.Object.create({`
     * 
     * MEGA SNIP!!! the following methods are also defined, but they're
     * pretty boring in that they work exactly as you'd expect
     *  - currentMove: move the game is on
     *  - nextMove: play the next move
     *  - play: autoplay moves
     *  - pause: pause autoplay of moves
     *  - playing: whether or not the game is autoplaying
     */
  });






















/**
 * AAAANNNNNDD... WE'RE DONE!
 *
 * We have a fully functioning app which can be used to step through
 * a given chess game.
 *
 * What's that?  You want a UI?  Oh, all right...
 */
















/*******************************************************************************
4. BUILDING UI
 *
 * Sproutcore's real power comes into play when we're displaying all this
 * stuff and making it interactive.  Recall my list of features from earlier:
 *   a. data bindings
 *   b. binding-aware templates
 *   c. observers and dependant, computed properties
 *   d. classical object inheritance
 *   e. buffered DOM updates
 *
 * We just built a totally sweet (headless)chess app, and we've really only
 * talked only about one of these.
 *
 * Let's slap a UI on it an check out the rest...
 */















/**
 * Markup time!
 *
 * This is a fine time to peruse index.html, noting how the templates
 * look.  We're going to inspect {{view capturedWhiteView}} pretty closely
 * next, so that's worth giving a gander...
 */

















/**
 * POWER: BINDINGS, TEMPLATES, OBSERVERS AND COMPUTED PROPERTIES
 *
 * I like to think of Sproutcore as letting you develop you app as if
 * you only code to a single moment in time: take this value, do this thing.
 *
 * Then, Sproutcore takes care of reliving that moment every time the value
 * changes.
 *
 * Consider {{view capturedWhiteView}} from our template...
 */

  Chess.GameInfoView = SC.View.extend({
    /** snip! **/

    capturedWhiteView: SC.CollectionView.extend({
      // 'Binding' suffix is magic... but, like, good magic
      contentBinding: 'parentView.game.captured.white',
      itemViewClass: Chess.PieceView.extend({
        pieceBinding: 'content'
      })
    })


    /**... snip! **/
  });



















  /**
   * Dependant, computed property example
   */
  Chess.PlayButton = Chess.Button.extend({
    playingBinding: 'Chess.gameController.playing',
    /**... snip! **/
    /**
     * This determines the correct text for the "Play" button
     */
    text: function() {
      return this.get('playing') ? 'Pause' : 'Play';
    }.property('playing')
  });










  /**
   * Observers in action
   */
  Chess.PieceView.extend({
    /** snip! **/
    positionDidChange: function() {
      /** snip! out some code which does the following: **/
      // computes the desired top/left DOM position for this piece
      // as determined by its rank/file board position, then
      // animates it to that position
    }.observes('piece.position')
  });
  


















/**
 * Buffered DOM updates
 *
 * Just take my word for it.
 */
















/*******************************************************************************
5. GAME CHANGER
 *
 * To show off how this app can view any chess game defined in an object
 * of type Chess.Game, in index.html, swap out the line:
 *   `Chess.gameController.set('game', Chess.theImmortalGame);`
 * with:
 *   `Chess.gameController.set('game', Chess.theAmateurGame);`
 *
 * You may now view a replay of one of my historical games!  (I'm black...)
 */
















/**
 * Fun fact: we've actually seen most of the code in the Chess app.
 *
 * The app is pretty polished (not just a demo sham!), so if anyone wants a
 * closer look at the details, I'd love to share.
 */


















/**
 * QUESTIONS?
 */









