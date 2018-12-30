// The main entry point of the program. It sets up
// the game how we want to play it and starts it.

'use strict';

const Game = require('./game');

module.exports = new Game({
    players : [
        'Alex',
        'Dara'
    ]
});
