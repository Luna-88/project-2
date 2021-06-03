const express = require('express')
const { displayDialogue } = require('../models/displayDialogue')
const inGameMenuRouter = express.Router()

const { accessInventory, saveGame, exitGame } = require('../models/inGameMenu')

inGameMenuRouter.get('/inventory', (request, response) => {
    try {
        response.status(200).json(accessInventory(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem with your inventory. Please, try loading a game.')
    }
})

inGameMenuRouter.get('/dialogue/instructions', async (request, response) => {
    try {
        displayDialogue('instructions', response)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem with dialogue')
    }
})

inGameMenuRouter.get('/dialogue/solar', async (request, response) => {
    try {
        displayDialogue('solar', response)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem with dialogue')
    }
})

inGameMenuRouter.get('/dialogue/wind', async (request, response) => {
    try {
        displayDialogue('wind', response)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem with dialogue')
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