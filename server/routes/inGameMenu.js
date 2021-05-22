const express = require('express')
const inGameMenuRouter = express.Router()

inGameMenuRouter.get('/inventory', async (request, response) => {
    try {
        response.status(200).send('Accessed inventory')
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

inGameMenuRouter.get('/options', async (request, response) => {
    try {
        response.status(200).send('Opened options')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem with options')
    }
})

inGameMenuRouter.get('/save-game', async (request, response) => {
    try {
        response.status(200).send('Your game has been saved successfully')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem saving your game')
    }
})

inGameMenuRouter.get('/exit-game', async (request, response) => {
    try {
        response.status(200).send('You have exited the game')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem quitting the game')
    }
})

module.exports = {
    inGameMenuRouter,
}