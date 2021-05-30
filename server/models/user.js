const mongoose = require('mongoose')
require('./db')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    isAdmin: Boolean
})

module.exports = mongoose.model('User', userSchema, 'user')