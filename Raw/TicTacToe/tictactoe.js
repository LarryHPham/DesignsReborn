(function(){
  //create Game object of player computer, current player, and moves
  var game = {
    start: false,
    user: '',
    computer: '',
    currentPlayer: '',
    availableCubes: [1,2,3,4,5,6,7,8,9],
    moves: 1,
    computerChosen: [],
    userChosen: [],
  };

  var textBox = document.getElementById('text');

  //determine who goes first and start the game
  playerIcon = function(event){
    reset();
    // assuming no code changes the id="user" this should work and may be hardcoded in other areas as "user"
    if( event.id === 'computer' ){
      game.user = '<span class="fa fa-circle-o"></span>';
      game.computer = '<span class="fa fa-times"></span>';
    }else{
      game.user = '<span class="fa fa-times"></span>';
      game.computer = '<span class="fa fa-circle-o"></span>';
    }

    game.currentPlayer = event.id;
    game.start = true;
    startGame(game.currentPlayer);
  }

  // function when user clicks on game cube to remove the click event
  icon = function(id){
    // just to make it a number for the sake of making it a number
    id = Number(id);
    // detects if game has started
    if(!game.start){
      return;
    }

    // grab element and insert player icon
    let boxId = document.getElementById(id);
    boxId.classList.add(game.currentPlayer);
    boxId.getElementsByClassName("game-block")[0].innerHTML = game[game.currentPlayer];

    // remove onclick attribute from getElementById
    boxId.removeAttribute('onClick');
    removeAvailability(id);
    game.moves++;
    textBox.innerHTML = "Moves: " + game.moves;

    if(game.currentPlayer === 'computer'){
      game.computerChosen.push(id);
      checkStatus(game.currentPlayer);
      game.currentPlayer = "user";
    }else{
      game.userChosen.push(id);
      checkStatus(game.currentPlayer);
      game.currentPlayer = "computer";
      if(game.start){
        computerMove();
      }
    }
  }

  // starts the game
  startGame = function(player){
    if(player !== 'computer'){
      return;
    }
    computerMove();
  }

  // Reset function to start the game over
  reset = function(){
    let gameCube = document.getElementsByClassName('game-cube');
    for(var i = 0; i < gameCube.length; i++){
      gameCube[i].classList.remove('user');
      gameCube[i].classList.remove('computer');
      gameCube[i].getElementsByClassName('game-block')[0].innerHTML = '';
      gameCube[i].setAttribute('onClick', 'icon(this.id)');
    }
    game.moves = 1;
    game.availableCubes = [1,2,3,4,5,6,7,8,9];
    game.userChosen = [];
    game.computerChosen = [];
    game.user = "";
    game.computer = "";
    game.currentPlayer = "";

    textBox.innerHTML = "Moves: " + game.moves;
  }

  // remove the id block from the availableCubes so computer cannot choose the id again
  removeAvailability = function(id){
    let index = game.availableCubes.indexOf(Number(id));
    if(index > -1){
      game.availableCubes.splice(index,1);
    }
  }

  // NOTE: this is just Basic random Number Generator to choose a random open gaming cube
  // give computer 2 seconds to think before making a move
  computerMove = function(){
    // disable user from being able to click on any click event tied to the icon() function
    game.start = false;
    let arrayLength = game.availableCubes.length;
    if(arrayLength > 0){
      setTimeout(function(){
        let randIndex = Math.floor(Math.random() * arrayLength);
        let chosenCubeId = game.availableCubes[randIndex];
        // re-enable user to use click event tied to the icon() function
        game.start = true;
        icon(chosenCubeId);
      }, 1500);
    }
  }

  //check each time a move has been done to check if a winner has been declared
  checkStatus = function(player){
    let chosenArray;
    let winner = false;
    if(player == "computer"){
      chosenArray = game.computerChosen;
    }else{
      chosenArray = game.userChosen;
    }

    // all available ways to win
    switch(true){
      case contains(chosenArray, [1,2,3]):
      winner = true;
      break;
      case contains(chosenArray, [4,5,6]):
      winner = true;
      break;
      case contains(chosenArray, [7,8,9]):
      winner = true;
      break;
      case contains(chosenArray, [1,4,7]):
      winner = true;
      break;
      case contains(chosenArray, [2,5,8]):
      winner = true;
      break;
      case contains(chosenArray, [3,6,9]):
      winner = true;
      break;
      case contains(chosenArray, [1,5,9]):
      winner = true;
      break;
      case contains(chosenArray, [3,5,7]):
      winner = true;
      break;
      default:
    }

    if(winner){
      game.start = false;
      textBox.innerHTML = capitalizeFirstLetter(player) + " has Won!!";
    }
  }

  // contain functions that will generate an array of values and test if -1 is returned all checkedNumbers exist in arrayToBeChecked
  contains = function(arrayToBeChecked, checkNumbers){
    return checkNumbers.map(function (number){
      return arrayToBeChecked.indexOf(number);
    }).indexOf(-1) == -1;
  }

  // function to capitalize the first letter of a string
  capitalizeFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
})();
