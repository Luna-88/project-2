const express = require('express')
const inGameMenuRouter = express.Router()

inGameMenuRouter.get('/inventory', async (request, response) => {
    try {
        response.json({ message: "Accessed inventory" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem accessing your inventory")
    }
})

inGameMenuRouter.get('/tooltips', async (request, response) => {
    try {
        response.json({ message: "Opened tooltips" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem with tooltips")
    }
})

inGameMenuRouter.get('/options', async (request, response) => {
    try {
        response.json({ message: "Opened options" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem with options")
    }
})

inGameMenuRouter.get('/save-game', async (request, response) => {
    try {
        response.json({ message: "Your game has been saved successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem saving your game")
    }
})

inGameMenuRouter.get('/exit-game', async (request, response) => {
    try {
        response.json({ message: "You've exited the game" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem quitting the game")
    }
})

module.exports = {
    inGameMenuRouter,
}