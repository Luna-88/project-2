const jwt = require('jsonwebtoken')

const { getCookies, verifyTokenFromCookies } = require('../models/cookies')
const config = require('../config/authentication')
const Games = require('../models/game')

function accessInventory(request, response) {
    let loadedGame = jwt.verify(getCookies(request)['loadedGame'], config.secret)

    if (!loadedGame) {
        return response.status(404).send('Load a game first')
    }
    return loadedGame
}

async function saveGame(request, response) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
    let loadedGame = jwt.verify(getCookies(request)['loadedGame'], config.secret)

    if (!loadedGame) {
        return response.status(404).send('Load a game first')
    } else {
        await Games.updateMany({ userId: userId },
            {
                $set: {
                    'inventory.cartridge': loadedGame.cartridge,
                    'inventory.spaceshipPieces': loadedGame.spaceshipPieces,
                    'inventory.hardDrivePieces': loadedGame.hardDrivePieces,
                    'inventory.gaiaGun': loadedGame.gaiaGun,
                    'puzzles': loadedGame.puzzles
                }
            })
    }
}

function exitGame(response) {
    response.clearCookie('loadedGame')
}

module.exports = {
    accessInventory,
    saveGame,
    exitGame,
}