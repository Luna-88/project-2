const express = require('express')
const playerMenuRouter = express.Router()

const { createGame } = require('../models/playerMenu')
const { loadGame } = require('../middleware/loadGame')
const { deleteGame } = require('../models/playerMenu')

playerMenuRouter.post('/add-player', async (request, response) => {
    try {
        response.status(200).json({ message: 'Player was added' })
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem adding player')
    }
})

playerMenuRouter.post('/new-game', async (request, response) => {
    try {
        response.send(await createGame(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem starting a new game')
    }
})

playerMenuRouter.get('/load-game', loadGame, async (request, response) => {
    try {
        response.status(200).send('Game loaded')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem loading your game')
    }
})

playerMenuRouter.delete('/delete-game', async (request, response) => {
    try {
        response.send(await deleteGame(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem deleting your game')
    }
})

module.exports = {
    playerMenuRouter,
}