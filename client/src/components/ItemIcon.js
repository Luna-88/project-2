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

module.exports = {
    getPuzzle,
    getSpaceshipPiece,
}