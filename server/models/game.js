const mongoose = require('mongoose')
require('./db')

const gameSchema = new mongoose.Schema({
    userId: { type: String },
    username: { type: String },
    inventory: {
        gaiaGun: { type: Boolean },
        cartridge: { type: Array },
        spaceshipPieces: { type: Array },
    },
    puzzles: { type: Array }
})

module.exports = mongoose.model('Game', gameSchema, 'game')