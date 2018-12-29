'use strict';

const { Pawn, Wall } = require('./piece');

const numWalls = 20;

// Players are human or machine participants in the game. They own a pawn and a
// handful of walls. During a player's turn, they must either move their pawn
// or use a wall.
class Player {
    constructor(config) {
        this.game = config.game;
        this.name = config.name;
        this.number = config.number;
        this.pawn = new Pawn({ player : this });

        const numPlayerWalls = numWalls / config.opponents;
        this.walls = [];
        for (let i = 0; i < numPlayerWalls; i += 1) {
            this.walls.push(new Wall({ player : this }));
        }
    }
}

module.exports = Player;
