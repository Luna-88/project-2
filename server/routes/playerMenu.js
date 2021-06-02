const express = require('express')
const playerMenuRouter = express.Router()
const Games = require('../models/game')

const { verifyTokenFromCookies, getCookies } = require('../models/cookies')
const { createGame } = require('../models/playerMenu')
const { loadGame } = require('../middleware/loadGame')
const { deleteGame } = require('../models/playerMenu')

playerMenuRouter.post('/add-player', async (request, response) => {
    try {
        response.status(200).json({ message: 'Player was added' })
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem adding player')
    }
})

playerMenuRouter.post('/new-game', async (request, response) => {
    try {
        response.send(await createGame(request, response))
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem starting a new game')
    }
})

//ADD DATA TO COOKIES
playerMenuRouter.post('/load-game', async (request, response) => {
    try {
        let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
        let gameId = request.body.gameId
console.log("gameId ", gameId)
        let loadGameCookie = getCookies(request)['loadedGame']

        if (loadGameCookie === undefined) {
            let loadGame = []

            await Games.find({ _id: gameId, userId: userId })
                .sort({ _id: -1 })
                // .select("-_id")
                // .select("-__v")
                .then((game) => {

                    response.send(game)
                }
                )
            // response.status(200).send('Game loaded')
        }
    }
    catch (error) {
        console.log(error)
        response.status(500).send('There was a problem loading your game')
    }
})

playerMenuRouter.get('/select-game', async (request, response) => {
    try {
        let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
        let selectedGames = []

        await Games.find({ userId: userId })
            .sort({ _id: -1 })
            .then(document => selectedGames.push(document))
        response.send(selectedGames)
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