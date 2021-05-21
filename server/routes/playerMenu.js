const express = require('express')
const playerMenuRouter = express.Router()

playerMenuRouter.post('/add-player', async (request, response) => {
    try {
        response.json({ message: "Player was added" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem adding player")
    }
})

playerMenuRouter.post('/new-game', async (request, response) => {
    try {
        response.json({ message: "New game created successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem starting a new game")
    }
})

playerMenuRouter.get('/load-game', async (request, response) => {
    try {
        response.json({ message: "Loaded game successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem loading your game")
    }
})

playerMenuRouter.delete('/delete-game', async (request, response) => {
    try {
        response.json({ message: "Deleted game successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem deleting your game")
    }
})

module.exports = {
    playerMenuRouter,
}