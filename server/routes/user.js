const express = require('express')
const userRouter = express.Router()

userRouter.use(express.urlencoded({ extended: true }))
userRouter.use(express.json())

const registerMiddleware = require('../middleware/registerUser')
const signInMiddleware = require('../middleware/signInUser')

userRouter.post('/register', registerMiddleware.checkDuplicateUsername, registerMiddleware.registerUser, async (request, response) => {
    try {
        response.json({ message: "Registered successfully!" })
    }
    catch (error) {
        console.log(error)
        response.status(404).send("There was a problem registering your information")
    }
})

userRouter.post('/signIn', signInMiddleware.signInUser, async (request, response) => {
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