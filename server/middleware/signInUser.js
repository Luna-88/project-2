const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../models/db')
const config = require('../config/authentication')

//Change to mongoose
async function signInUser(request, response, next) {
    const usersCollection = await db.getCollection('users')
    await usersCollection.findOne({ username: request.body.username })
        .then((user) => {
            try {
                if (!user) {
                    return response.status(404).json({ user: "User Not found" })
                }
                const passwordIsValid = bcrypt.compareSync(
                    request.body.password,
                    user.password
                )
                if (!passwordIsValid) {
                    return response.status(401).json({ password: "Invalid Password!" })
                }
                const token = jwt.sign({ username: user.username, accuseCount: user.accuseCount }, config.secret, { expiresIn: 86400 }) //24h
                response.cookie('accessToken', token, { httpOnly: true, maxAge: 3600000 })
            }
            catch (error) {
                console.log("SignInUser", error)
                response.status(500).json(error)
            }
        })
    next()
}

module.exports = {
    signInUser,
}