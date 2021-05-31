function getGaiaGun(gun) {
    switch (gun) {
        case false:
            return '❌'
        case true:
            return '🔫'
        default:
            return '❌'
    }
}

function getPuzzle(puzzle, index) {
    switch (index) {
        case 0: // solar puzzle
            if (!puzzle) { return '❌' } else { return '🔫' }
        case 1: // hydro puzzle
            if (!puzzle) { return '❌' } else { return '🔫' }
        case 2: // wind puzzle
            if (!puzzle) { return '❌' } else { return '🔫' }
        case 3: // thermal puzzle
            if (!puzzle) { return '❌' } else { return '🔫' }
        default:
            return '❌'
    }
}

function getCartridge(cartridge, index) {
    switch (index) {
        case 0: // solar cartridge
            if (!cartridge) { return '❌' } else { return '🔫' }
        case 1: // hydro cartridge
            if (!cartridge) { return '❌' } else { return '🔫' }
        case 2: // wind cartridge
            if (!cartridge) { return '❌' } else { return '🔫' }
        case 3: // thermal cartridge
            if (!cartridge) { return '❌' } else { return '🔫' }
        default:
            return '❌'
    }
}

function getSpaceshipPiece(shipPiece, index) {
    switch (index) {
        case 0: // nose cone
            if (!shipPiece) { return '❌' } else { return '🔫' }
        case 1: // frame
            if (!shipPiece) { return '❌' } else { return '🔫' }
        case 2: // fin
            if (!shipPiece) { return '❌' } else { return '🔫' }
        case 3: // fuel
            if (!shipPiece) { return '❌' } else { return '🔫' }
        default:
            return '❌'
    }
}

function getHardDrivePiece(drivePiece, index) {
    switch (index) {
        case 0: // actuator
            if (!drivePiece) { return '❌' } else { return '🔫' }
        case 1: // platter
            if (!drivePiece) { return '❌' } else { return '🔫' }
        case 2: // spindle
            if (!drivePiece) { return '❌' } else { return '🔫' }
        case 3: // controller
            if (!drivePiece) { return '❌' } else { return '🔫' }
        default:
            return '❌'
    }
}

module.exports = {
    getGaiaGun,
    getPuzzle,
    getCartridge,
    getSpaceshipPiece,
    getHardDrivePiece,
}