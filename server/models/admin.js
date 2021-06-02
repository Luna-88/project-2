const User = require('../models/user')
const Game = require('../models/game')

async function deleteUser(request, response) {
    let userId = request.body.userId

    if (!userId) {
        return response.status(404).send('User not found')
    }

    await User.deleteMany({ _id: userId })
    response.status(200).send('User deleted')
}

async function deleteGame(request, response) {
    let gameId = request.body.gameId

    if (!gameId) {
        return response.status(404).send('Game not found')
    }

    await Game.deleteMany({ _id: gameId })
    response.status(200).send('Game deleted')
}

module.exports = {
    deleteUser,
    deleteGame,
}