const bcrypt = require('bcryptjs')

const Users = require('../models/users')

async function checkDuplicateUsername(request, response, next) {
    await Users.findOne({
        username: request.body.username
    }).then((user) => {
        try {
            if (user) {
                return response.status(400).send(`Failed! Username is already in use!`)
            }
        }
        catch (error) {
            response.status(500).json(error)
        }
        next()
    })
}

async function registerUser(request, response, next) {
    const user = {
        username: request.body.username,
        password: bcrypt.hashSync(request.body.password, 8)
    }
    try {
        const newUser = new Users(user)
        await newUser.save()
    }
    catch (error) {
        console.log("Registration", error)
        response.status(500).json(error)
    }
    next()
}

module.exports = {
    checkDuplicateUsername,
    registerUser,
}