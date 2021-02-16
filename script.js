// render the contents of board array
function renderToTiles(board) {
  //   for each element in board array
  board.forEach((el, i) => {
    //     query for the tile associated with the index
    const tile = document.querySelector(`#tile${i + 1}`);
    //     set the inner html of the tile to the array value
    tile.innerHTML = el;
  });
}

// create board module
const board = (function () {
  let _board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
  // let _board = new Array(9).fill(null);

  function getState() {
    return _board;
  }

  function update(marker, position) {
    _board[position] = marker;
    return marker;
  }

  function clear() {
    _board = _board.map((position) => null);
    return _board;
  }

  return {
    getState,
    update,
    clear,
  };
})();

// create players objects from factory functions
function Player(name, marker, human = false) {
  function getName() {
    return name;
  }

  function getMarker() {
    return marker;
  }

  function makeSelection(board = null) {
    // create selection variable
    let selection;
    if (human) {
      // prompt user for input based on available board spots
      selection = prompt('Make a selection');
    } else {
      // do some AI selection based on board
    }
    // return selection
    return selection;
  }

  return {
    getName,
    getMarker,
    makeSelection,
  };
}

// create controller module
const controller = (() => {
  function play(playerOne, playerTwo) {
    board.clear();

    let activePlayer = null;
    let keepPlaying = true;

    while (keepPlaying) {
      activePlayer =
        activePlayer === playerOne ? playerTwo : playerOne;
      _takeTurn(activePlayer);
      if (_isWinner() || _isDraw()) {
        keepPlaying = false;
      }
    }

    _end(_isWinner() ? activePlayer : 'Draw');
  }

  function _takeTurn(activePlayer) {
    const selection = activePlayer.makeSelection(board);
    board.update(activePlayer.getMarker(), selection);
    console.log(board.getState());
  }

  function _isWinner() {
    // deconstruct array for easier references to positions
    const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = board.getState();

    // return true for the following
    //     1 === 2 === 3, 4 === 5 === 6, 7 === 8 === 9,
    //     1 === 4 === 7, 2 === 5 === 8, 3 === 6 === 9,
    //     1 === 5 === 9, 3 === 5 === 7
    if (new Set([p1, p2, p3]).size === 1 && p1 !== null) {
      return true;
    } else if (new Set([p4, p5, p6]).size === 1 && p4 !== null) {
      return true;
    } else if (new Set([p7, p8, p9]).size === 1 && p7 !== null) {
      return true;
    } else if (new Set([p1, p4, p7]).size === 1 && p1 !== null) {
      return true;
    } else if (new Set([p2, p5, p8]).size === 1 && p2 !== null) {
      return true;
    } else if (new Set([p3, p6, p9]).size === 1 && p3 !== null) {
      return true;
    } else if (new Set([p1, p5, p9]).size === 1 && p1 !== null) {
      return true;
    } else if (new Set([p3, p5, p7]).size === 1 && p3 !== null) {
      return true;
    } else {
      return false;
    }
  }

  function _isDraw() {
    if (_isWinner() || board.getState().includes(null)) {
      return false;
    } else {
      return true;
    }
  }

  function _end(winner) {
    alert(winner === 'Draw' ? 'Draw' : winner.getName());
    console.log('end');
  }

  return {
    play,
  };
})();

//  start

//    create players
const player1 = Player('test', 'X', true);
const player2 = Player('tester', 'O', true);

renderToTiles(board.getState());

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
