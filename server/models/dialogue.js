const mongoose = require('mongoose')
require('./db')

const dialogueSchema = new mongoose.Schema({
    instructions: { type: String },
    solar: { type: Array },
    wind: { type: Array },
})

module.exports = mongoose.model('Dialogue', dialogueSchema, 'dialogue')