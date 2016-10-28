// The game module is responsible for initializing and managing the gameplay.

'use strict';

const Player = require('./player');
const Board = require('./board');

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
