// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === 'ArrowLeft') {
    gameEngine.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === 'ArrowRight') {
    gameEngine.moveRight();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

// We call the gameLoop method to start the game

const body = document.querySelector('body');
const startBtn = document.getElementsByClassName('start-btn');
const btnDiv = document.querySelector('#btn-div');
const songDiv = document.querySelector('#song-div');
const timeDisplay = document.querySelector("#time-clock");
let showTime;
const burger = document.querySelector("#burger");

// Changes size of burger image when game state is active
burger.style.height = `${PLAYER_HEIGHT}px`;
burger.style.width = `${PLAYER_WIDTH}px`;

const startGame = () => {
  btnDiv.style.display = 'none';
  gameEngine.start();
  // start the timer
  let minutes = 0;
  let seconds = 0;
  // stopwatch function - determines when to increment next value
  const stopWatch = () => {
    seconds ++;
    if (seconds / 60 === 1) {
      seconds = 0;
      minutes ++;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    showTime = timeDisplay.innerHTML = minutes + ":" + seconds;
  }

  setInterval(stopWatch, 1000);

  // start the music
  songDiv.innerHTML = `<audio id="audio" autoplay controls loop><source src="nyan-cat-song.mp3" type="audio/mp3"></audio>`;
  songDiv.style.display = 'none';
}

for (let i = 0; i < startBtn.length; i++) {
  startBtn[i].addEventListener('click', startGame);
}