const mongoose = require('mongoose')
require('./db')

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('User', userSchema, 'user')