const mongoose = require('mongoose')
require('./db')

const dialogueSchema = new mongoose.Schema({
    dialogue: { type: Array },
})

module.exports = mongoose.model('Dialogue', dialogueSchema, 'dialogue')