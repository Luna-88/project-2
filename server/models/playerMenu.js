const jwt = require('jsonwebtoken')

const config = require('../config/authentication')
const Games = require('../models/game')

async function createGame(request, response) {
    let cookies = request.headers.cookie
    let token = cookies.slice(12, cookies.length)
    let userId = jwt.verify(token, config.secret).userId

    try {
        const game = {
            userId: userId,
            inventory: {
                gaiaGun: false,
                cartridge: [],
                spaceshipPieces: [],
                hardDrivePieces: []
            },
            puzzles: []
        }

        const newGame = new Games(game)
        await newGame.save()

        response.status(200).send('Game created successfully')
    }
    catch (error) {
        console.log(error)
    }
}

async function loadGame(request, response, next) {
    let cookies = request.headers.cookie
    let token = cookies.slice(12, cookies.length)
    let userId = jwt.verify(token, config.secret).userId

    await Games.find({ userId: userId })
        .sort({ _id: -1 })
        .limit(1)
        .then((game) => {
            try {
                if (game.length === 0) {
                    return response.status(404).send('You need to start a new game first')
                }
                next()
            }
            catch (error) {
                console.log(error)
            }
        })
}

async function deleteGame(request, response) {
    let cookies = request.headers.cookie
    let token = cookies.slice(12, cookies.length)
    let userId = jwt.verify(token, config.secret).userId

    try {
        await Games.deleteMany({ userId: userId })
        response.status(200).send('Deleted games successfully')
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    createGame,
    loadGame,
    deleteGame,
}