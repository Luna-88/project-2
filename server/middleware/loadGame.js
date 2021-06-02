const jwt = require('jsonwebtoken')

const { verifyTokenFromCookies } = require('../models/cookies')
const Games = require('../models/game')
const config = require('../config/authentication')

async function loadGame(request, response, next) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
    let loadGameCookie = verifyTokenFromCookies(request, 'loadedGame', '_id')
    let gameId = request.body.gameId

    if (loadGameCookie === undefined || loadGameCookie !== gameId) {
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
                            _id: gameId,
                            userId: loadGame[0].userId,
                            username: loadGame[0].username,
                            cartridge: loadGame[0].inventory.cartridge,
                            spaceshipPieces: loadGame[0].inventory.spaceshipPieces,
                            gaiaGun: loadGame[0].inventory.gaiaGun,
                            puzzles: loadGame[0].puzzles
                        }),
                        config.secret)

                    response.cookie('loadedGame', token, { httpOnly: true, maxAge: 3600000, overwrite: true })

                    next()
                }
                catch (error) {
                    console.log(error)
                }
            })
        } else {
            return response.send('Game already loaded')
        }
}

module.exports = {
    loadGame,
}