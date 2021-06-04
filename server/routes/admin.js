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

adminRouter.get('/edit/user/:userId', async (request, response) => {
    try {
        let userId = request.params.userId
        let data = await User.find({ _id: userId })

        response.status(200).send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving users')
    }
})

adminRouter.put('/edit/user/save', async (request, response) => {
    try {
        let userId = request.body._id
        let updatedUsername = request.body.username
        let updatedIsAdmin = request.body.isAdmin

        await User.updateMany({ _id: userId },
            {
                $set: {
                    'username': updatedUsername,
                    'isAdmin': updatedIsAdmin
                }
            })

        response.status(200).send('Player updated')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem updating the information')
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

adminRouter.get('/edit/game/:gameId', async (request, response) => {
    try {
        let gameId = request.params.gameId
        let data = await Game.find({ _id: gameId })

        response.status(200).send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving games')
    }
})

adminRouter.put('/edit/game/save', async (request, response) => {
    try {
        // console.log("reached save server")
        let gameId = request.body._id
        let solar = request.body.solar
        let wind = request.body.wind
        let piece1 = request.body.piece1
        let piece2 = request.body.piece2

        await Game.updateMany({ _id: gameId },
            {
                $set: {
                    'inventory.puzzles.0': solar,
                    'inventory.puzzles.1': wind,
                    'inventory.spaceshipPieces.0': piece1,
                    'inventory.spaceshipPieces.1': piece2
                }
            })

        response.status(200).send('Game updated')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem updating the information')
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
        let data = await User.find({ _id: userId })
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
        let data = await Game.find({ _id: gameId })
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