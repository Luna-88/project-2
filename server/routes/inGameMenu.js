const express = require('express')
const inGameMenuRouter = express.Router()

const { accessInventory, saveGame, exitGame } = require('../models/inGameMenu')

inGameMenuRouter.get('/inventory', (request, response) => {
    try {
        response.status(200).json(accessInventory(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem accessing your inventory')
    }
})

inGameMenuRouter.get('/tooltips', async (request, response) => {
    try {
        response.status(200).send('Opened tooltips')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem with tooltips')
    }
})

inGameMenuRouter.get('/save-game', async (request, response) => {
    try {
        await saveGame(request, response)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem saving your game')
    }
})

inGameMenuRouter.get('/exit-game', (request, response) => {
    try {
        response.status(200).send(exitGame(response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem quitting the game')
    }
})

module.exports = {
    inGameMenuRouter,
}