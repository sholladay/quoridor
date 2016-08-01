// The game module is responsible for initializing and managing the gameplay.

'use strict';

const Player = require('./Player');
const Board = require('./Board');

class Game {
    constructor() {
        const numPlayers = 2;

        // Record who is playing.
        this.players = [];

        for (let i = 0; i < numPlayers; i += 1) {
            this.players.push(new Player());
        }

        this.board = new Board();
    }
}

module.exports = Game;
