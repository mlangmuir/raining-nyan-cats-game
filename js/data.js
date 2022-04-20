const normalBtn = document.querySelector('#normal-btn');
const hardBtn = document.querySelector('#hard-btn');

// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 525;
const GAME_HEIGHT = 700;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 105;
const ENEMY_HEIGHT = 218.4;
let MAX_ENEMIES = 3;

normalBtn.addEventListener('click', () => {
    MAX_ENEMIES = 4;
});

hardBtn.addEventListener('click', () => {
    MAX_ENEMIES = 5;
});

// These constants represent the player width and height.
const PLAYER_WIDTH = 105;
const PLAYER_HEIGHT = 75.6;