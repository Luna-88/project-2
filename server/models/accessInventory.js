const jwt = require('jsonwebtoken')

const { getCookies } = require('../models/cookies')
const config = require('../config/authentication')

function accessInventory(request, response) {
    let loadedGame = jwt.verify(getCookies(request)['loadedGame'], config.secret)

    if (!loadedGame) {
        return response.status(404).send('Load a game first')
    }
    return loadedGame
}

module.exports = {
    accessInventory,
}