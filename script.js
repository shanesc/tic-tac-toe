/*
  You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
    Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
*/

/*
  board: controls state of the game board
    - Update board
    - Return board
  player: controls type of player (human or AI), name, stores marker, makes selection
    - Name
    - Marker type
    - Player type
    - Method to make selection
      This will vary depending on human or AI player
    - Methods to return name, marker, player type
  controller (i.e. referee): controls the flow of game, divvy out marker, who makes next selection, checks for win or tie state, clears board, starts game, etc.
    - method to divvy out markers
    - starts game
      clear board
      divvy marker
    - method to check for game end state
    - method to ask player for selection
    - method to update board
*/

// create board module
const board = (function () {
  //   within module, create board array, fill with random X's and O's for now
  // const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'X'];
  let _board = _initialize();
  //   create a method to return the board array
  //     function getboard => return board array;
  function getBoard() {
    return _board;
  }
  //   create a method to update board array
  //     function(marker, position) => board(position) = marker
  function update(marker, position) {
    _board[position] = marker;
    return marker;
  }

  function _initialize() {
    return new Array(9).fill(null);
  }

  function clear() {
    _board = _board.map((position) => null);
    return _board;
  }

  // create a method to determine result of board - draw, win, or null (i.e. not finished yet)
  function getResult() {
    //   if any null values in board, return null (not all moves made)
    if (_board.includes(null)) {
      return null;
      //   else if check against 8 winning combos, if true return win (move to own function)
    } else if (checkForWinner()) {
      return 'win';
      //   else return draw
    } else {
      return 'draw';
    }

    function checkForWinner() {
      // deconstruct array for easier references to positions
      const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = _board;

      // return true for the following
      //     1 === 2 === 3, 4 === 5 === 6, 7 === 8 === 9,
      //     1 === 4 === 7, 2 === 5 === 8, 3 === 6 === 9,
      //     1 === 5 === 9, 3 === 5 === 7
      if (new Set([p1, p2, p3]).size === 1) {
        return true;
      } else if (new Set([p4, p5, p6]).size === 1) {
        return true;
      } else if (new Set([p7, p8, p9]).size === 1) {
        return true;
      } else if (new Set([p1, p4, p7]).size === 1) {
        return true;
      } else if (new Set([p2, p5, p8]).size === 1) {
        return true;
      } else if (new Set([p3, p6, p9]).size === 1) {
        return true;
      } else if (new Set([p1, p5, p9]).size === 1) {
        return true;
      } else if (new Set([p3, p5, p7]).size === 1) {
        return true;
      } else {
        return false;
      }
    }
  }

  return {
    getBoard,
    update,
    getResult,
    clear,
  };
})();

/*
player: controls type of player (human or AI), name, stores marker, makes selection
    - Name
    - Marker type
    - Player type
    - Method to make selection
      This will vary depending on human or AI player
    - Methods to return name, marker, player type
*/

// create players objects from factory functions
//   variables for name and marker
function Player(name, marker, human = false) {
  //   method for getName
  //     function() => return this.name
  function getName() {
    return name;
  }
  //   method for getMarker
  //     function() => return this.marker
  function getMarker() {
    return marker;
  }
  function makeSelection(board) {
    // create selection variable
    if (human) {
      // prompt user for input based on available board spots
    } else {
      // do some AI selection based on board
    }
    // return selection
  }

  return {
    getName,
    getMarker,
    makeSelection,
  };
}

/*
controller (i.e. referee): controls the flow of game, divvy out marker, who makes next selection, checks for win or tie state, clears board, starts game, etc.
    - method to divvy out markers
    - starts game
      clear board
      divvy marker
    - method to check for game end state
    - method to ask player for selection and update board
*/

// create gameControl module
const controller = (() => {
  //  start
  //    clear board
  //    create players
  //    prompt player1 for selection
  function start() {}
  //  _getGameState(board)
  //    if game is over, return tie or winner
  //    if game is not over, return in progress
  //  _getPlayerSelection(player)
  //    update board with selection
  //  makeTurn()
  //    switch active player
  //    getPlayerSelection(activePlayer)
  //  end
  //    return winner
})();

//   create variables to initialize players
//     player1 = {name: foo.getName, marker: foo.getMarker, human}
//     player2 = {name: bar.getName, marker: bar.getMarker, human}
//   create variable for active player
//     activePlayer = player1
//   create method to switch active player
//     function switchPlayer()
//     activePlayer = activePlayer === player1 ? player2 : player 1
//   create a method that plays one turn
//     for active player
//       method to input choice
//         updates position variable
//       update the gameboard array
//         updateGameboard(activePlayer.marker, postion)
//     check result
//       if gameBoard.isWin(), announce result(activePlayer)
//       else if gameBoard.isTie(), annunce result(tie)
//       else newTurn()
//   newTurn method to change activePlayer, perform one turn
//     call switchPlayer()
//     call playTurn()
//   create method to announce result
//     fucntion announceResult(result) => if player, log winner, else log tie

/*
Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)
Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!
Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
Start by just getting the computer to make a random legal move.
Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

*/
