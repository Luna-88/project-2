const bcrypt = require('bcryptjs')

const Users = require('../models/user')

async function registerUser(request, response, next) {
    const user = {
        username: request.body.username,
        password: bcrypt.hashSync(request.body.password, 8)
    }
    try {
        const newUser = new Users(user)
        await newUser.save()
        next()
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