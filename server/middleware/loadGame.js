const jwt = require('jsonwebtoken')

const { verifyTokenFromCookies, getCookies } = require('../models/cookies')
const Games = require('../models/game')
const config = require('../config/authentication')

async function loadGame(request, response, next) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
    let loadCookie = getCookies(request)['loadedGame']
    let gameId = request.body.gameId

    async function loadGameToCookies(response, next) {
        await Games.find({ _id: gameId, userId: userId })
            .sort({ _id: -1 })
            .select("-_id")
            .select("-__v")
            .then((game) => {
                try {
                    let loadGame = []

                    if (game.length === 0) {
                        return response.status(404).send('You need to start a new game first')
                    }
                    loadGame.push(game[0])

                    const token = jwt.sign(
                        JSON.stringify({
                            gameId: gameId,
                            userId: loadGame[0].userId,
                            username: loadGame[0].username,
                            spaceshipPieces: loadGame[0].inventory.spaceshipPieces,
                            puzzles: loadGame[0].inventory.puzzles
                        }),
                        config.secret)

                    response.cookie('loadedGame', token, { httpOnly: true, maxAge: 3600000, overwrite: true })

                    next()
                }
                catch (error) {
                    console.log(error)
                }
            })
    }

    if (loadCookie === undefined) {
        loadGameToCookies(response, next)
    } else if (verifyTokenFromCookies(request, 'loadedGame', '_id') !== gameId) {
        loadGameToCookies(response, next)
    } else {
        return response.send('Game already loaded')
    }
}

module.exports = {
    loadGame,
}