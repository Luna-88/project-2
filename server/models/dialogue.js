const mongoose = require('mongoose')
require('./db')

const dialogueSchema = new mongoose.Schema({
    solar: { type: Array },
    wind: { type: Array },
})

module.exports = mongoose.model('Dialogue', dialogueSchema, 'dialogue')