const express = require('express')
const userRouter = express.Router()

const { registerUser } = require('../middleware/registerUser')
const { signInUser } = require('../middleware/signInUser')

userRouter.post('/register', registerUser, async (request, response) => {
    try {
        response.json({ message: "Registered successfully!" })
    }
    catch (error) {
        console.log(error)
        response.status(400).send("There was a problem registering your information")
    }
})

userRouter.post('/sign-in', signInUser, async (request, response) => {
    try {
        response.json({ message: "Signed in successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(404).send("There was a problem registering your information")
    }
})

module.exports = {
    userRouter,
}