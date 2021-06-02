const express = require('express')
const playerMenuRouter = express.Router()

const { createGame, deleteGame, selectGame } = require('../models/playerMenu')
const { loadGame } = require('../middleware/loadGame')

playerMenuRouter.post('/new-game', async (request, response) => {
    try {
        response.send(await createGame(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem starting a new game')
    }
})

playerMenuRouter.post('/load-game', loadGame, async (request, response) => {
    try {
        response.status(200).send('Game loaded')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem loading your game')
    }
})

playerMenuRouter.get('/select-game', async (request, response) => {
    try { 
        await selectGame(request, response)
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