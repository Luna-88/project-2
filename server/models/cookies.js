const jwt = require('jsonwebtoken')

const config = require('../config/authentication')

function getCookies(request) {
    const rawCookies = request.headers.cookie.split('; ')
    const parsedCookies = {}
    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=')
        parsedCookies[parsedCookie[0]] = parsedCookie[1]
    })
    return parsedCookies
}

function verifyTokenFromCookies(request, cookieName, key) {
    const token = getCookies(request)[cookieName]
    return jwt.verify(token, config.secret)[key]
}

module.exports = {
    getCookies,
    verifyTokenFromCookies,
}