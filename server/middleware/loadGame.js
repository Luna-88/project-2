const jwt = require('jsonwebtoken')

const { verifyTokenFromCookies } = require('../models/cookies')
const { getCookies } = require('../models/cookies')
const Games = require('../models/game')
const config = require('../config/authentication')

async function loadGame(request, response, next) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')

    let loadGameCookie = getCookies(request)['loadedGame']

    if (loadGameCookie === undefined) {
        let loadGame = []

        await Games.find({ userId: userId })
            .sort({ _id: -1 })
            .limit(1)
            .select("-_id")
            .select("-__v")
            .then((game) => {
                try {
                    if (game.length === 0) {
                        return response.status(404).send('You need to start a new game first')
                    }
                    loadGame.push(game[0])

                    const token = jwt.sign(
                        JSON.stringify({
                            userId: loadGame[0].userId,
                            gaiaGun: loadGame[0].inventory.gaiaGun,
                            cartridge: loadGame[0].inventory.cartridge,
                            spaceshipPieces: loadGame[0].inventory.spaceshipPieces,
                            hardDrivePieces: loadGame[0].inventory.hardDrivePieces,
                            puzzles: loadGame[0].puzzles
                        }),
                        config.secret)

                    response.cookie('loadedGame', token, { httpOnly: true, maxAge: 86400 })

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