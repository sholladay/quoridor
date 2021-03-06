// The game module is responsible for initializing and managing the gameplay.

'use strict';

const Board = require('./board');
const Player = require('./player');

class Game {
    constructor(config) {
        this.players = config.players.map((playerName, index) => {
            return new Player({
                game      : this,
                name      : playerName,
                number    : index,
                opponents : config.players.length - 1
            });
        });

        this.board = new Board({ game : this });
    }
    start() {
        console.log('Game started!');
    }
}

module.exports = Game;
