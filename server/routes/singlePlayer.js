const express = require('express')
const singlePlayerRouter = express.Router()

singlePlayerRouter.post('/new-game', async (request, response) => {
    try {
        response.json({ message: "New game created successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(400).send("There was a problem starting a new game")
    }
})

singlePlayerRouter.get('/load-game', async (request, response) => {
    try {
        response.json({ message: "Loaded game successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(404).send("There was a problem loading your game")
    }
})

singlePlayerRouter.delete('/delete-game', async (request, response) => {
    try {
        response.json({ message: "Deleted game successfully" })
    }
    catch (error) {
        console.log(error)
        response.status(404).send("There was a problem deleting your game")
    }
})

module.exports = {
    singlePlayerRouter,
}