const mongoose = require('mongoose')
require('./db')

const gameSchema = new mongoose.Schema({
    userId: { type: String },
    username: { type: String },
    inventory: {
        puzzles: { type: Array },
        spaceshipPieces: { type: Array },
    },
})

module.exports = mongoose.model('Game', gameSchema, 'game')