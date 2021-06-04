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
            const token = jwt.sign(
                JSON.stringify({
                    gameId: loadedGame.gameId,
                    userId: loadedGame.userId,
                    username: loadedGame.username,
                    spaceshipPieces: ['1', '0'],
                    puzzles: ['1', '0']
                }),
                config.secret)
            response.cookie('loadedGame', token, { httpOnly: true, maxAge: 3600000, overwrite: true })
        } else if (energy === 'wind') {
            const token = jwt.sign(
                JSON.stringify({
                    gameId: loadedGame.gameId,
                    userId: loadedGame.userId,
                    username: loadedGame.username,
                    spaceshipPieces: ['1', '1'],
                    puzzles: ['1', '1']
                }),
                config.secret)
            response.cookie('loadedGame', token, { httpOnly: true, maxAge: 3600000, overwrite: true })
        } else if (energy === 'display') {
            return loadedGame
        }
    }
}

async function saveGame(request, response) {
    let loadedGame = jwt.verify(getCookies(request)['loadedGame'], config.secret)
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')

    console.log("save puzzle[0]", loadedGame)

    if (!loadedGame) {
        return response.status(404).send('Load a game first')
    } else {
        await Games.updateMany({ userId: userId, _id: loadedGame.gameId },
            {
                $set: {
                    'inventory.puzzles.0': loadedGame.puzzles[0],
                    'inventory.puzzles.1': loadedGame.puzzles[1],
                    'inventory.spaceshipPieces.0': loadedGame.spaceshipPieces[0],
                    'inventory.spaceshipPieces.1': loadedGame.spaceshipPieces[1]
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