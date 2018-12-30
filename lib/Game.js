// The game module is responsible for initializing and managing the gameplay.

'use strict';

const Board = require('./board');
const Player = require('./player');

class Game {
    constructor(config) {
        this.players = config.players.map((name, index) => {
            return new Player({
                game      : this,
                name,
                number    : index,
                opponents : config.players.length - 1
            });
        });

        this.board = new Board({ game : this });
    }
    start() {
        alert('Game started!');
    }
}

module.exports = Game;
