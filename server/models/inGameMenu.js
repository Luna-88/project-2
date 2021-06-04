const jwt = require('jsonwebtoken')

const { getCookies, verifyTokenFromCookies } = require('../models/cookies')
const config = require('../config/authentication')
const Games = require('../models/game')

function accessInventory(energy, request, response) {
    let loadedGame = jwt.verify(getCookies(request)['loadedGame'], config.secret)

    if (!loadedGame) {
        return response.status(404).send('Load a game first')
    } else {
        if (energy === 'solar') {
            // console.log('solar')
        } else if (energy === 'wind') {
            // console.log('wind')
        } else if (energy==='display') {
            return loadedGame
        }
    }
}

async function saveGame(request, response) {
    let loadedGame = jwt.verify(getCookies(request)['loadedGame'], config.secret)
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
    let gameId = verifyTokenFromCookies(request, 'accessToken', '_id')

    if (!loadedGame) {
        return response.status(404).send('Load a game first')
    } else {
        await Games.updateMany({ userId: userId, _id: gameId },
            {
                $set: {
                    'inventory.spaceshipPieces': loadedGame.spaceshipPieces,
                    'inventory.puzzles': loadedGame.puzzles
                }
            })
        return response.status(200).send('Game Saved')
    }
}

function exitGame(response) {
    response.status(200).clearCookie('accessToken').clearCookie('loadedGame')
}

module.exports = {
    accessInventory,
    saveGame,
    exitGame,
}