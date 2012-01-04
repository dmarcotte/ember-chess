(function() {

  /**
   * Base class for chess pieces
   */
  Chess.Piece = Em.Object.extend({
      symbol: '',
      color: null,
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

  Chess.Rook = Chess.Piece.extend({
    symbol: 'R',
    unicode: {
      black: '&#9820;',
      white: '&#9814;'
    }
  });

  Chess.Bishop = Chess.Piece.extend({
    symbol: 'B',
    unicode: {
      black: '&#9821;',
      white: '&#9815;'
    }
  });

  Chess.Knight = Chess.Piece.extend({
    symbol: 'N',
    unicode: {
      black: '&#9822;',
      white: '&#9816;'
    }
  });

  Chess.Pawn = Chess.Piece.extend({
    symbol: 'P',
    unicode: {
      black: '&#9823;',
      white: '&#9817;'
    }
  });

  /**
   * A chess set, with the pieces defaulted to their initial positions
   */
  Chess.ChessSet = Em.ArrayProxy.extend({
    content: [
      Chess.Rook.create({ color: 'white', position: {rank: 1, file: 'a'} }),
      Chess.Knight.create({ color: 'white', position: {rank: 1, file: 'b'} }),
      Chess.Bishop.create({ color: 'white', position: {rank: 1, file: 'c'} }),
      Chess.Queen.create({ color: 'white', position: {rank: 1, file: 'd'} }),
      Chess.King.create({ color: 'white', position: {rank: 1, file: 'e'} }),
      Chess.Bishop.create({ color: 'white', position: {rank: 1, file: 'f'} }),
      Chess.Knight.create({ color: 'white', position: {rank: 1, file: 'g'} }),
      Chess.Rook.create({ color: 'white', position: {rank: 1, file: 'h'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'a'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'b'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'c'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'd'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'e'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'f'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'g'} }),
      Chess.Pawn.create({ color: 'white', position: {rank: 2, file: 'h'} }),

      Chess.Rook.create({ color: 'black', position: {rank: 8, file: 'a'} }),
      Chess.Knight.create({ color: 'black', position: {rank: 8, file: 'b'} }),
      Chess.Bishop.create({ color: 'black', position: {rank: 8, file: 'c'} }),
      Chess.Queen.create({ color: 'black', position: {rank: 8, file: 'd'} }),
      Chess.King.create({ color: 'black', position: {rank: 8, file: 'e'} }),
      Chess.Bishop.create({ color: 'black', position: {rank: 8, file: 'f'} }),
      Chess.Knight.create({ color: 'black', position: {rank: 8, file: 'g'} }),
      Chess.Rook.create({ color: 'black', position: {rank: 8, file: 'h'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'a'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'b'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'c'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'd'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'e'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'f'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'g'} }),
      Chess.Pawn.create({ color: 'black', position: {rank: 7, file: 'h'} })
    ]
  });

  /**
   * Base class for chess games.  A game is defined by creating an
   * instance of this class and overriding the following properties:
   * 
   * - title: The title of the game
   * - moves: An array of 'move' objects of the following form:
   *    {
   *       pieceSymbol: ['K' | 'Q' | 'R' | 'B' | 'K' | 'P'],
   *       color: ['white' | 'black'],
   *       fromPos: {file: [a-h], rank: [1-8},
   *       toPos: {file: [a-h], rank: [1-8]},
   *       comment: '<comment>'
   *     }
   */
  Chess.Game = Em.Object.extend({
    title: '',
    whitePlayer: '',
    blackPlayer: '',
    moves: []
  });

  /**
   * A pretty, pretty interesting game.
   *
   * Based on the pgn found at
   * http://virtualtravelog.net.s115267.gridserver.com/wp/wp-content/media/Imortal_Game.pgn,
   * annotated by John R Harris
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
      },
      {
        pieceSymbol: 'P',
        color: 'white',
        fromPos: {file: 'f', rank: 2},
        toPos: {file: 'f', rank: 4},
        comment: "The King's Gambit. White wants to get black to give up control of the d4 square so he can build a big center and develop his pieces quickly. The danger is that white weakens his kingside!"
      },
      {
        pieceSymbol: 'P',
        color: 'black',
        fromPos: {file: 'e', rank: 5},
        toPos: {file: 'f', rank: 4},
        comment: "Black accepts the offered pawn! This is a fairly standard response. The other real option is d5, setting up a gambit of his own!"
      },
      {
        pieceSymbol: 'B',
        color: 'white',
        fromPos: {file: 'f', rank: 1},
        toPos: {file: 'c', rank: 4},
        comment: "These days Nf3 is much more common because it prevents Black's next move. However, back when this game was played it was all out war on the King, and aiming your bishop at f7 was a top consideration!"
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'd', rank: 8},
        toPos: {file: 'h', rank: 4},
        attack: 'check',
        comment: ""
      },
      {
        pieceSymbol: 'K',
        color: 'white',
        fromPos: {file: 'e', rank: 1},
        toPos: {file: 'f', rank: 1},
        comment: "Ke2 is just too dangerous."
      },
      {
        pieceSymbol: 'P',
        color: 'black',
        fromPos: {file: 'b', rank: 7},
        toPos: {file: 'b', rank: 5},
        comment: "Bryan's counter gambit: Black tries to lure the White Bishop away from it's attack on the weak f7 pawn."
      },
      {
        pieceSymbol: 'B',
        color: 'white',
        fromPos: {file: 'c', rank: 4},
        toPos: {file: 'b', rank: 5},
        comment: ""
      },
      {
        pieceSymbol: 'N',
        color: 'black',
        fromPos: {file: 'g', rank: 8},
        toPos: {file: 'f', rank: 6},
        comment: ""
      },
      {
        pieceSymbol: 'N',
        color: 'white',
        fromPos: {file: 'g', rank: 1},
        toPos: {file: 'f', rank: 3},
        comment: ""
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'h', rank: 4},
        toPos: {file: 'h', rank: 6},
        comment: ""
      },
      {
        pieceSymbol: 'P',
        color: 'white',
        fromPos: {file: 'd', rank: 2},
        toPos: {file: 'd', rank: 3},
        comment: "Some people say this was a new move for Anderssen. White protects the e4 pawn and opens up his other bishop to start bothering black's queen..."
      },
      {
        pieceSymbol: 'N',
        color: 'black',
        fromPos: {file: 'f', rank: 6},
        toPos: {file: 'h', rank: 5},
        comment: "Threatening Ng3+ check, which would win the exchange: either Kg1 and then ...Nxh1 or hxg3 and then ...Qxh1+ would be deadly!"
      },
      {
        pieceSymbol: 'N',
        color: 'white',
        fromPos: {file: 'f', rank: 3},
        toPos: {file: 'h', rank: 4},
        comment: ""
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'h', rank: 6},
        toPos: {file: 'g', rank: 5},
        comment: ""
      },
      {
        pieceSymbol: 'N',
        color: 'white',
        fromPos: {file: 'h', rank: 4},
        toPos: {file: 'f', rank: 5},
        comment: ""
      },
      {
        pieceSymbol: 'P',
        color: 'black',
        fromPos: {file: 'c', rank: 7},
        toPos: {file: 'c', rank: 6},
        comment: ""
      },
      {
        pieceSymbol: 'P',
        color: 'white',
        fromPos: {file: 'g', rank: 2},
        toPos: {file: 'g', rank: 4},
        comment: ""
      },
      {
        pieceSymbol: 'N',
        color: 'black',
        fromPos: {file: 'h', rank: 5},
        toPos: {file: 'f', rank: 6},
        comment: ""
      },
      {
        pieceSymbol: 'R',
        color: 'white',
        fromPos: {file: 'h', rank: 1},
        toPos: {file: 'g', rank: 1},
        comment: "White is willing to give up the bishop in order to start an attack on the black queen."
      },
      {
        pieceSymbol: 'P',
        color: 'black',
        fromPos: {file: 'c', rank: 6},
        toPos: {file: 'b', rank: 5},
        comment: ""
      },
      {
        pieceSymbol: 'P',
        color: 'white',
        fromPos: {file: 'h', rank: 2},
        toPos: {file: 'h', rank: 4},
        comment: ""
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'g', rank: 5},
        toPos: {file: 'g', rank: 6},
        comment: ""
      },
      {
        pieceSymbol: 'P',
        color: 'white',
        fromPos: {file: 'h', rank: 4},
        toPos: {file: 'h', rank: 5},
        comment: ""
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'g', rank: 6},
        toPos: {file: 'g', rank: 5},
        comment: ""
      },
      {
        pieceSymbol: 'Q',
        color: 'white',
        fromPos: {file: 'd', rank: 1},
        toPos: {file: 'f', rank: 3},
        comment: ""
      },
      {
        pieceSymbol: 'N',
        color: 'black',
        fromPos: {file: 'f', rank: 6},
        toPos: {file: 'g', rank: 8},
        comment: "Black must move the knight as Bxf4 would win the trapped queen."
      },
      {
        pieceSymbol: 'B',
        color: 'white',
        fromPos: {file: 'c', rank: 1},
        toPos: {file: 'f', rank: 4},
        comment: ""
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'g', rank: 5},
        toPos: {file: 'f', rank: 6},
        comment: "Stop and notice black's pieces. They are all on their original squares except for the queen. White has several pieces developed in exchange for his lost bishop."
      },
      {
        pieceSymbol: 'N',
        color: 'white',
        fromPos: {file: 'b', rank: 1},
        toPos: {file: 'c', rank: 3},
        comment: ""
      },
      {
        pieceSymbol: 'B',
        color: 'black',
        fromPos: {file: 'f', rank: 8},
        toPos: {file: 'c', rank: 5},
        comment: ""
      },
      {
        pieceSymbol: 'N',
        color: 'white',
        fromPos: {file: 'c', rank: 3},
        toPos: {file: 'd', rank: 5},
        comment: "White looks deep into the position and sees a chance for checkmate! He starts to throw his pieces away as bait for the black queen and bishop."
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'f', rank: 6},
        toPos: {file: 'b', rank: 2},
        comment: ""
      },
      {
        pieceSymbol: 'B',
        color: 'white',
        fromPos: {file: 'f', rank: 4},
        toPos: {file: 'd', rank: 6},
        comment: "The trap is set! White looks like a mad man giving everything away, especially his rooks - and with check no less!"
      },
      {
        pieceSymbol: 'Q',
        color: 'black',
        fromPos: {file: 'b', rank: 2},
        toPos: {file: 'a', rank: 1},
        attack: 'check',
        comment: ""
      },
      {
        pieceSymbol: 'K',
        color: 'white',
        fromPos: {file: 'f', rank: 1},
        toPos: {file: 'e', rank: 2},
        comment: "The white King moves to a safe square. White's pieces are all over the black King."
      },
      {
        pieceSymbol: 'B',
        color: 'black',
        fromPos: {file: 'c', rank: 5},
        toPos: {file: 'g', rank: 1},
        comment: ""
      },
      {
        pieceSymbol: 'P',
        color: 'white',
        fromPos: {file: 'e', rank: 4},
        toPos: {file: 'e', rank: 5},
        comment: "What a crazy move! White, in the middle of the storm, quietly moves a pawn, effectively shutting out the black queen from getting back to defend the King. White has EXACTLY the right amount of pieces to force checkmate."
      },
      {
        pieceSymbol: 'N',
        color: 'black',
        fromPos: {file: 'b', rank: 8},
        toPos: {file: 'a', rank: 6},
        comment: ""
      },
      {
        pieceSymbol: 'N',
        color: 'white',
        fromPos: {file: 'f', rank: 5},
        toPos: {file: 'g', rank: 7},
        attack: 'check',
        comment: ""
      },
      {
        pieceSymbol: 'K',
        color: 'black',
        fromPos: {file: 'e', rank: 8},
        toPos: {file: 'd', rank: 8},
        comment: ""
      },
      {
        pieceSymbol: 'Q',
        color: 'white',
        fromPos: {file: 'f', rank: 3},
        toPos: {file: 'f', rank: 6},
        attack: 'check',
        comment: "The queen becomes a decoy to remove the black knight from its duties protecting the e7 square."
      },
      {
        pieceSymbol: 'N',
        color: 'black',
        fromPos: {file: 'g', rank: 8},
        toPos: {file: 'f', rank: 6},
        comment: ""
      },
      {
        pieceSymbol: 'B',
        color: 'white',
        fromPos: {file: 'd', rank: 6},
        toPos: {file: 'e', rank: 7},
        attack: 'checkmate',
        comment: "Truly an IMMORTAL GAME!"
      }
    ]
  });

  /**
   * A much, much less interesting game
   */
  Chess.theAmateurGame = Chess.Game.create({
    title: 'The Amateur Game',
    whitePlayer: 'Someone Who\'s Played Before',
    blackPlayer: 'Me',
    moves: [
      {
        pieceSymbol: 'P',
        color: 'white',
        fromPos: {file: 'e', rank: 2},
        toPos: {file: 'e', rank: 3},
        comment: 'This look innocuous.'
      },
      {
        pieceSymbol: 'P',
        color: 'black',
        fromPos: {file: 'a', rank: 7},
        toPos: {file: 'a', rank: 6},
        comment: 'Not sure what Black\'s plan is here...'
      },
      {
        pieceSymbol: 'B',
        color: 'white',
        fromPos: {file: 'f', rank: 1},
        toPos: {file: 'c', rank: 4},
        comment: "A little bit of control-the-center action."
      },
      {
        pieceSymbol: 'P',
        color: 'black',
        fromPos: {file: 'g', rank: 7},
        toPos: {file: 'g', rank: 6},
        comment: "Again: sensing a lack of plan.  What could possibly go wrong?"
      },
      {
        pieceSymbol: 'Q',
        color: 'white',
        fromPos: {file: 'd', rank: 1},
        toPos: {file: 'f', rank: 3},
        comment: "Still looking innocuous."
      },
      {
        pieceSymbol: 'P',
        color: 'black',
        fromPos: {file: 'c', rank: 7},
        toPos: {file: 'c', rank: 5},
        comment: "\"Fiddle-dee-dee.  Since it's so early in the game and I'm in no danger, I'll just move this pawn.\""
      },
      {
        pieceSymbol: 'Q',
        color: 'white',
        fromPos: {file: 'f', rank: 3},
        toPos: {file: 'f', rank: 7},
        attack: 'checkmate',
        comment: "Oh my."
      }
    ]
  })
})();