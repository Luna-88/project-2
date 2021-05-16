const express = require('express')
const adminRouter = express.Router()

adminRouter.post('/add-user', async (request, response) => {
    try {
        response.json({ message: "User added" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem adding user")
    }
})

adminRouter.delete('/delete-user', async (request, response) => {
    try {
        response.json({ message: "User deleted" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem deleting user")
    }
})

adminRouter.put('/modify-user', async (request, response) => {
    try {
        response.json({ message: "User modified" })
    }
    catch (error) {
        console.log(error)
        response.status(500).send("There was a problem modifying user")
    }
})

module.exports = {
    adminRouter,
}