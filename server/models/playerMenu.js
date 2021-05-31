const { verifyTokenFromCookies } = require('../models/cookies')
const Games = require('../models/game')

async function createGame(request, response) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
    let username = verifyTokenFromCookies(request, 'accessToken', 'username')

    const game = {
        userId: userId,
        username: username,
        inventory: {
            gaiaGun: false,
            cartridge: [0, 0, 0, 0],
            spaceshipPieces: [0, 0, 0, 0],
            hardDrivePieces: [0, 0, 0, 0]
        },
        puzzles: [0, 0, 0, 0]
    }

    const newGame = new Games(game)
    await newGame.save()

    response.status(200).send('Game created')
}

async function deleteGame(request, response) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')

    if (!userId) {
        return response.status(404).send('Game not found')
    }

    await Games.deleteMany({ userId: userId })
    response.status(200).send('Game deleted')
}

module.exports = {
    createGame,
    deleteGame,
}