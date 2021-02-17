// create board module
const board = (function () {
  let _board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
  // let _board = new Array(9).fill(null);

  function getState() {
    return _board;
  }

  function update(marker, position) {
    if (_board[position] === null) {
      _board[position] = marker;
      return marker;
    } else {
      return null;
    }
  }

  function clear() {
    _board = _board.map((position) => null);
    return _board;
  }

  // render the contents of board array
  function renderToTiles() {
    _board.forEach((el, i) => {
      const tile = document.querySelector(`#tile${i + 1}`);
      tile.innerHTML = el;
    });
  }

  return {
    getState,
    update,
    clear,
    renderToTiles,
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
  let activePlayer = null;
  let playerOne = null;
  let playerTwo = null;
  let result = null;

  function start() {
    //    create players
    playerOne = Player('Player 1', 'X', true);
    playerTwo = Player('Player 2', 'O', true);

    // set active player
    activePlayer = playerOne;

    // clear the board
    board.clear();
    board.renderToTiles();
    result = null;

    // add click event listener to all DOM tiles
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
      tile.addEventListener('click', _selectTile, { once: true });
    });
  }

  function _selectTile(e) {
    const arrayPosition = e.currentTarget.id.slice(-1);
    _takeTurn(arrayPosition - 1);
  }

  function _takeTurn(selection) {
    const isValid = board.update(activePlayer.getMarker(), selection);
    if (isValid) {
      board.renderToTiles();
      if (_isGameOver()) {
        _end(result);
      } else {
        activePlayer = _switchPlayer();
      }
    }
  }

  function _switchPlayer() {
    return activePlayer === playerOne ? playerTwo : playerOne;
  }

  function _isGameOver() {
    if (_isWinner()) {
      result = activePlayer;
      return true;
    } else if (_isDraw()) {
      result = 'draw';
      return true;
    } else {
      return false;
    }
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

  function _end(result) {
    const message =
      result === 'draw'
        ? `It's a tie!!`
        : `${result.getName()} wins!!`;
    const modalContent = document.querySelector('.modal-content');
    const modal = document.querySelector('.modal');
    modalContent.innerHTML = message;
    modal.classList.add('open');
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        start();
      }
    });
  }

  return {
    start,
  };
})();

controller.start();
