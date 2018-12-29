'use strict';

const { Pawn, Wall } = require('./piece');

// Players are human or machine participants in the game. They own
// a pawn and a handful of walls. During a player's turn, they
// must either move their pawn or use a wall.
class Player {
    constructor(config) {
        // Friendly name given to each player for display on screen.
        this.name = config.name;
        this.game = config.game;
        this.pawn = new Pawn({ player : this });

        const numWalls = 20;
        const numPlayerWalls = numWalls / config.players.length;
        const walls = [];

        for (let i = 0; i < numPlayerWalls; i += 1) {
            walls.push(new Wall({ player : this }));
        }
        this.walls = walls;
    }

    get number() {
        return this.game.players.indexOf(this);
    }
}

module.exports = Player;
