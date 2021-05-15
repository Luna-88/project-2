const mongoose = require('mongoose')
require('./db')

const userSchema = new mongoose.Schema({
    username: {
        type: String, trim: true,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String, trim: true,
        required: true,
        minlength: 5,
        maxlength: 70
    }
})

module.exports = mongoose.model('User', userSchema, 'user')