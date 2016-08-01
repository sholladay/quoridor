// The main entry point of the program. It sets up
// the game how we want to play it and starts it.

'use strict';

const Game = require('./Game');

const numWalls = 20;
const numPlayers = 2;
const wallsPerPlayer = numWalls / numPlayers;

const playerNames = [
    'Dara',
    ''
];

const game = new Game();
game.start();
