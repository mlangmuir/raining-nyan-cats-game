// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  state = "loading"; // loading, active, damaged, ended
  lives = 5;

  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
  }

  start = ()=> {
    // this.startTime=
    this.state = "active";
    this.gameLoop();
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    
    if (this.state === "active" || this.state === "damaged") {
      // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
      // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
      this.enemies.forEach((enemy) => {
        enemy.update(timeDiff);
      });

      // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
      // We use filter to accomplish this.
      // Remember: this.enemies only contains instances of the Enemy class.
      this.enemies = this.enemies.filter((enemy) => {
        return !enemy.destroyed;
      });

      // We need to perform the addition of enemies until we have enough enemies.
      while (this.enemies.length < MAX_ENEMIES) {
        // We find the next available spot and, using this spot, we create an enemy.
        // We add this enemy to the enemies array
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
        // Changes size of nyan cat images when game state is active
        // this.enemies.style.height = '112.5px';
        // this.enemies.style.width = '234px';
      }
    }

    if(this.state === "active") {

      // We check if the player is dead. If he is, we alert the user
      // and return from the method (Why is the return statement important?)

      const catSong = document.querySelector('#audio');
      const gameOver = document.querySelector('#game-over');
      const songDiv = document.querySelector('#song-div');
      const scoreDiv = document.querySelector('#heart-div');
      const yourTime = document.querySelector('#your-time');
      const timeText = document.querySelector('#time-text');

      if (this.isPlayerDamaged()) {
        this.lives--;
        // Fixes a bug where the time would move up when 1 life is left
        if (this.lives === 1) {
          timeText.style.marginTop = '4px';
        }
        // If player out of lives, scoreDiv disappears, gameOver popup appears
        if (this.lives === 0) {
          scoreDiv.style.display = 'none';
          this.state = "ended";
          catSong.pause();
          setTimeout(function() {
            gameOver.style.display = 'block';
            yourTime.innerHTML = `Your time was ${showTime}`
          },500);
          songDiv.innerHTML = `<audio id="dead-sound" autoplay controls><source src="dead-sound.mp3" type="audio/mp3"></audio>`;
          songDiv.style.display = 'none';
          return;
        } else {
          this.state = "damaged";
          let heart = document.querySelector("#heart-" + this.lives);
          heart.style.display = 'none';

          const burger = document.querySelector("#burger");

          const burgerFlashing = () => {
              burger.style.display = (burger.style.display == 'none' ? '' : 'none');
          }
          const burgerFlashInterval = setInterval(burgerFlashing, 75);

          setTimeout (function() {
            clearInterval(burgerFlashInterval)
          },2000);

          console.log("damaged")
          let powerDownDiv = document.querySelector("#power-down-div");
          powerDownDiv.innerHTML = `<audio id="power-down" autoplay controls><source src="power-down.mp3" type="audio/mp3"></audio>`;
          powerDownDiv.style.display = 'none';
          setTimeout(this.resume, 2000);
          // setTimeout --> this.state = "active"
        }
      }     
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  resume = () => {
    console.log("resume");
    let burger = document.querySelector("#burger");
    burger.style.opacity = 1.0;
    this.state = "active";
  }

  isPlayerDamaged = () => {
    if (this.state !== "active") {
      return false;
    }
    // Easy difficulty
    if (MAX_ENEMIES === 3) {
      if (this.enemies[0].y + ENEMY_HEIGHT >= this.player.y && this.enemies[0].x === this.player.x ||
      this.enemies[1].y + ENEMY_HEIGHT >= this.player.y && this.enemies[1].x === this.player.x ||
      this.enemies[2].y + ENEMY_HEIGHT >= this.player.y && this.enemies[2].x === this.player.x) {
        return true;
      } else {
        return false;
      }
    // Normal difficulty
    } else if (MAX_ENEMIES === 4) {
      if (this.enemies[0].y + ENEMY_HEIGHT >= this.player.y && this.enemies[0].x === this.player.x ||
      this.enemies[1].y + ENEMY_HEIGHT >= this.player.y && this.enemies[1].x === this.player.x ||
      this.enemies[2].y + ENEMY_HEIGHT >= this.player.y && this.enemies[2].x === this.player.x ||
      this.enemies[3].y + ENEMY_HEIGHT >= this.player.y && this.enemies[3].x === this.player.x) {
        return true;
      } else {
        return false;
      }
    // Hard difficulty
    } else {
      if (this.enemies[0].y + ENEMY_HEIGHT >= this.player.y && this.enemies[0].x === this.player.x ||
      this.enemies[1].y + ENEMY_HEIGHT >= this.player.y && this.enemies[1].x === this.player.x ||
      this.enemies[2].y + ENEMY_HEIGHT >= this.player.y && this.enemies[2].x === this.player.x ||
      this.enemies[3].y + ENEMY_HEIGHT >= this.player.y && this.enemies[3].x === this.player.x ||
      this.enemies[4].y + ENEMY_HEIGHT >= this.player.y && this.enemies[4].x === this.player.x) {
        return true;
      } else {
        return false;
      }
    }
  }


  moveLeft = () => {
    if (this.state === "active" || this.state === "damaged") {
      this.player.moveLeft();
    }
  }

  moveRight = () => {
    if (this.state === "active" || this.state === "damaged") {
      this.player.moveRight();
    }
  }
}

const playAgainBtn = document.querySelector('#play-again-btn');

const refreshPage = () => {
  location.reload();
}

playAgainBtn.addEventListener('click', refreshPage);