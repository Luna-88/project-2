function getPuzzle(puzzle, index) {
    switch (index) {
        case 0: // solar puzzle
            if (!puzzle) { return '❌' } else { return '🌞' }
        case 1: // wind puzzle
            if (!puzzle) { return '❌' } else { return '🌀' }
        default:
            return '❌'
    }
}

function getSpaceshipPiece(shipPiece, index) {
    switch (index) {
        case 0: // piece1
            if (!shipPiece) { return '❌' } else { return '🛸' }
        case 1: // piece2
            if (!shipPiece) { return '❌' } else { return '🚀' }
        default:
            return '❌'
    }
}

module.exports = {
    getPuzzle,
    getSpaceshipPiece,
}