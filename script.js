/*
  You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
    Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
*/

// create gameBoard module
//   within module, create gameboard array, fill with random X's and O's for now
//   create a method to update gameboard array
//     function(marker, position) => gameboardarray(position) = marker
//   create a method to return the gameboard array
//     function getGameboard => return gameboard array;
//   create method that checks for a winner
//     function isWin() => logic to check for various cases of winning
//       return true or false
//   create a method that checks for a draw
//       function isTie => return true or false
// create players objects from factory functions
//   variables for name and marker
//   method for getName
//     function() => return this.name
//   method for getMarker
//     function() => return this.marker
// create gameControl module
//   create variables to initialize players
//     player1 = {name: foo.getName, marker: foo.getMarker}
//     player2 = {name: bar.getName, marker: bar.getMarker}
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
