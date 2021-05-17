const bcrypt = require('bcryptjs')

const Users = require('../models/user')

async function registerUser(request, response, next) {
    let username = request.body.username.trim()
    let password = request.body.password.trim()

    try {
        if ((username.length && password.length) >= 5 && (username.length && password.length) <= 15) {
            const user = {
                username: username,
                password: bcrypt.hashSync(password, 8)
            }
            const newUser = new Users(user)
            await newUser.save()
            next()
        } else {
            response.status(400).json({ message: "Username and password must be between 5 and 15 characters" })
        }
    }
    catch (error) {
        if (error.code === 11000) {
            response.status(409).json({ message: "Failed! Username is already in use!" })
        }
        else {
            console.log(error)
            response.status(500).json(error)
        }
    }
}

module.exports = {
    registerUser,
}