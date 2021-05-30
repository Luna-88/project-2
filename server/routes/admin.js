const express = require('express')
const adminRouter = express.Router()

const User = require('../models/user');

adminRouter.get('/', async (request, response) => {
    try {
        let data = await User.find({});
        response.send(data);
        response.status(200).send('Users retrieved')
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem retrieving users')
    }
})

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