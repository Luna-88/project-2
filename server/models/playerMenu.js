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

async function selectGame(request, response) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')

        let selectedGames = []

        await Games.find({ userId: userId })
            .sort({ _id: -1 })
            .then(document => selectedGames.push(document))
        response.send(selectedGames)
}

async function deleteGame(request, response) {
    let userId = verifyTokenFromCookies(request, 'accessToken', 'userId')
    let gameId = request.body.gameId

    if (!userId) {
        return response.status(404).send('Game not found')
    }

    await Games.deleteMany({ _id: gameId })
    response.status(200).send('Game deleted')
}

module.exports = {
    createGame,
    deleteGame,
    selectGame,
}