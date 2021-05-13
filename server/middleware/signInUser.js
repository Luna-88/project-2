const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../models/user')
const config = require('../config/authentication')

async function signInUser(request, response, next) {
    await Users.findOne({ username: request.body.username })
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
                const token = jwt.sign({ username: user.username }, config.secret, { expiresIn: 86400 }) //24h
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