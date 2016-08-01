// The board module defines the models needed to create a usable
// game area, which pieces will occupy.

// TODO: Move this out into another module.
const util = {
    isPiece(piece) {
        return typeof piece === 'object' && Boolean(piece);
    }
};

// Spaces are positions on the game board, which can be occupied
// by either a pawn or a wall, depending on its type.
class Space {
    constructor(config) {
        if (!config.type || typeof config.type !== 'string') {
            throw new Error('Spaces cannot be made without a type.');
        }

        // The type of space is important because it denotes which
        // kind of piece is allowed to occupy it.
        this.type = config.type;
    }

    occupy(piece) {
        if (this.occupant) {
            throw new Error(
                'This space is already occupied.'
            );
        }
        if (!util.isPiece(piece)) {
            throw new Error(
                'Spaces cannot be occupied without a piece.'
            );
        }
        if (this.type !== piece.type) {
            throw new Error(
                piece.type[0].toUpperCase() + piece.type.slice(1) +
                `s cannot occupy spaces meant for ${this.type}s.`
            );
        }

        this.occupant = piece;
    }
}

// PawnSpaces are a special type of space which can only be
// occupied by a pawn.
class PawnSpace extends Space {
    constructor(option) {
        const config = Object.assign({}, option, {
            type : 'pawn'
        });

        super(config);
    }

    // Provide a way to clean up the space, assuming a
    // pawn has left it.
    vacate() {
        this.occupant = null;
    }
}

// WallSpaces are a special type of space which can only be
// occupied by a wall.
class WallSpace extends Space {
    constructor(option) {
        const config = Object.assign({}, option, {
            type : 'wall'
        });

        super(config);
    }
}

class Line {
    constructor(option) {
        this.board = option.board;
        this.spaces = option.spaces;
    }
}

// Rows are a collection of spaces, which sit within a game board.
class Row extends Line {
    constructor(option) {
        super(option);

        option.spaces.forEach((space) => {
            space.row = this;
        });
    }

    get north() {
        const rows = this.board.rows;
        return rows[rows.indexOf(this) - 1];
    }

    get south() {
        const rows = this.board.rows;
        return rows[rows.indexOf(this) + 1];
    }
}

class Column extends Line {
    constructor(option) {
        super(option);

        option.spaces.forEach((space) => {
            space.column = this;
        });
    }

    get east() {
        const columns = this.board.columns;
        return columns[columns.indexOf(this) + 1];
    }

    get west() {
        const columns = this.board.columns;
        return columns[columns.indexOf(this) - 1];
    }
}

// Boards are a collection of spaces, the physical area where
// the game actions take place. Pawns and walls are placed on
// the spaces within the board.
class Board {
    constructor() {
        const numRows = 17;
        const numColumns = numRows;
        const numSpaces = numRows * numColumns;
        const rowSpaces = [];
        const columnSpaces = [];

        this.spaces = [];

        for (let i = 0; i < numSpaces; i += 1) {
            const rowNum = Math.trunc(i / numColumns);
            const columnNum = i % numColumns;
            const isEvenRow = (rowNum % 2) === 0;
            const isEvenColumn = (columnNum % 2) === 0;
            const space = (isEvenRow && isEvenColumn) ?
                new PawnSpace() :
                new WallSpace();

            const isNewRow = columnNum === 0;
            if (isNewRow) {
                rowSpaces.push([]);
            }
            if (!columnSpaces[columnNum]) {
                columnSpaces.push([]);
            }

            this.spaces.push(space);
            rowSpaces[rowNum].push(space);
            columnSpaces[columnNum].push(space);
        }

        this.rows = rowSpaces.map((spaces) => {
            return new Row({
                board : this,
                spaces
            });
        });

        this.columns = columnSpaces.map((spaces) => {
            return new Column({
                board : this,
                spaces
            });
        });
    }
}

module.exports = Board;
