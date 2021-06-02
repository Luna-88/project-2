const express = require('express')
const adminRouter = express.Router()

const User = require('../models/user');
const Game = require('../models/game');

adminRouter.get('/users', async (request, response) => {
    try {
        let data = await User.find({});
        response.send(data);
        // response.status(200).send('Users retrieved')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving users')
    }
})

adminRouter.get('/games', async (request, response) => {
    try {
        let data = await Game.find({});
        response.send(data);
        // response.status(200).send('Games retrieved')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving games')
    }
})

adminRouter.get('/games/:id', async (request, response) => {
    try {
        let data = await Game.find({});
        response.send(data);
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