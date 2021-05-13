const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../models/user')
const config = require('../config/authentication')

async function signInUser(request, response, next) {
    await Users.findOne({ username: request.body.username })
        .then((user) => {
            try {
                if (!user) {
                    return response.status(404).json({ message: "User Not found" })
                }
                const passwordIsValid = bcrypt.compareSync(
                    request.body.password,
                    user.password
                )
                if (!passwordIsValid) {
                    return response.status(401).json({ message: "Invalid Password!" })
                }
                const token = jwt.sign({ username: user.username }, config.secret, { expiresIn: 86400 }) //24h
                response.cookie('accessToken', token, { httpOnly: true, maxAge: 3600000 })
                next()
            }
            catch (error) {
                console.log(error)
                response.status(500).json(error)
            }
        })
}

module.exports = {
    signInUser,
}