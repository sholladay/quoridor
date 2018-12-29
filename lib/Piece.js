// This is the piece module. It is responsible for data and behavior related to
// the objects that are placed on the spaces within the game board.

'use strict';

// Pieces are property owned by a player, either a wall or a pawn.
class Piece {
    constructor(player) {
        if (!player || typeof player !== 'object') {
            throw new Error('Pieces cannot be unowned.');
        }

        // Link to the Player this piece belongs to.
        this.player = player;
    }

    place(space) {
        this.space = space;
        Array.prototype.concat(space).forEach((elem) => {
            elem.occupy(this);
        });

        return this;
    }
}

// Pawns are pieces that a player can choose to move on the board
// during their turn, instead of using a wall. Winning is only
// achieved by eventually moving a pawn to a space on the
// opposite side of the board from where it started.
class Pawn extends Piece {
    // Change the pawn's position, instead of using a wall.
    move(newSpace) {
        // First, remove ourselves from the old space.
        this.space.vacate();
        super.place(newSpace);

        return this;
    }
}

// Walls are pieces that a player can choose to place on the board
// during their turn, instead of moving their pawn. Walls can be
// used offensively or defensively.
class Wall extends Piece {
    constructor(...args) {
        super(...args);
        // Mark the wall as usable. The owner will only be allowed
        // to use this wall once.
        this.available = true;
    }

    // Put the wall on the board, instead of moving a pawn.
    use(spaces) {
        // Ensure that this wall has not been used before, otherwise
        // this is an illegal play.
        if (!this.available) {
            throw new Error('Walls cannot be used more than once.');
        }
        // Mark the wall as used, so it may not be used again.
        this.available = false;

        super.place(spaces);
        // A wall, once used, is immutable.
        Object.freeze(this);

        return this;
    }
}
// How many spaces a wall occupies when used. Walls are always of size 1
// in the other direction.
Wall.length = 3;

module.exports = {
    Pawn,
    Wall
};
