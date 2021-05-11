const bcrypt = require('bcryptjs')

const db = require('../models/db')

//Change to mongoose
async function checkDuplicateUsername(request, response, next) {
    const usersCollection = await db.getCollection('users')
    await usersCollection.findOne({
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
    db.getCollection("users").then((user) => {
        return user.insertOne({
            username: request.body.username,
            password: bcrypt.hashSync(request.body.password, 8),
            accuseCount: 0
        })
    })
    next()
}

module.exports = {
    checkDuplicateUsername,
    registerUser,
}