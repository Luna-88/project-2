const express = require('express')
const adminRouter = express.Router()

const { deleteUser, deleteGame } = require('../models/admin')
const User = require('../models/user')
const Game = require('../models/game')

adminRouter.get('/user-database', async (request, response) => {
    try {
        let data = await User.find({})
        response.status(200).send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving users')
    }
})

adminRouter.get('/game-database', async (request, response) => {
    try {
        let data = await Game.find({})
        response.status(200).send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving games')
    }
})

adminRouter.delete('/delete-user', async (request, response) => {
    try {
        response.status(200).send(await deleteUser(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem deleting your game')
    }
})

adminRouter.delete('/delete-game', async (request, response) => {
    try {
        response.status(200).send(await deleteGame(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem deleting your game')
    }
})

adminRouter.put('/user/:userId', async (request, response) => {
    try {
        let userId = request.params.id
        let data = await User.find({_id: userId})
        response.status(200).send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving games')
    }
})

adminRouter.put('/game/:gameId', async (request, response) => {
    try {
        let gameId = request.params.gameId
        let data = await Game.find({_id: gameId})
        response.status(200).send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving games')
    }
})

module.exports = {
    adminRouter,
}