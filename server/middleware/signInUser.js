const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../models/user')
const config = require('../config/authentication')

async function signInUser(request, response, next) {
    await Users.findOne({ username: request.body.username })
        .then((user) => {
            try {
                if (!user) {
                    return response.status(404).send('User Not found')
                }
                const passwordIsValid = bcrypt.compareSync(
                    request.body.password,
                    user.password
                )
                if (!passwordIsValid) {
                    return response.status(401).send('Invalid Password!')
                }
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: 86400 }) //24h
                response.cookie('accessToken', token, { httpOnly: true, maxAge: 86400 })
                next()
            }
            catch (error) {
                console.log(error)
            }
        })
}

module.exports = {
    signInUser,
}