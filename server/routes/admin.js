const express = require('express')
const adminRouter = express.Router()

const { deleteUser, deleteGame } = require('../models/admin')
const User = require('../models/user')
const Game = require('../models/game')

adminRouter.get('/user-database', async (request, response) => {
    try {
        let data = await User.find({})
        response.send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving users')
    }
})

adminRouter.get('/game-database', async (request, response) => {
    try {
        let data = await Game.find({})
        response.send(data)
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving games')
    }
})

adminRouter.delete('/delete-user', async (request, response) => {
    try {
        response.send(await deleteUser(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem deleting your game')
    }
})

adminRouter.delete('/delete-game', async (request, response) => {
    try {
        response.send(await deleteGame(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem deleting your game')
    }
})

adminRouter.get('/games/:id', async (request, response) => {
    try {
        let data = await Game.find({})
        response.send(data)
        // response.status(200).send('Games retrieved')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving games')
    }
})

adminRouter.delete('/:_id', async (request, response) => {
    try {
        const data = await game.findByIdAndDelete(req.params.id)

        if (!data) {
            response.sendStatus(404)
        } else {
            response.send(data)
        }
    } catch (error) {
        console.log(error)
        response.status(500)
    }
})


//


adminRouter.post('/add-user', async (request, response) => {
    try {
        response.status(200).send('User added')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem adding user')
    }
})

adminRouter.delete('/delete-user', async (request, response) => {
    try {
        response.status(200).send('User deleted')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem deleting user')
    }
})

adminRouter.put('/modify-user', async (request, response) => {
    try {
        response.status(200).send('User modified')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem modifying user')
    }
})

module.exports = {
    adminRouter,
}