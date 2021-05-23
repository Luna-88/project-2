const tiles = [
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 6, 6, 6, 0, 0, 0, 0, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 6, 6, 6, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 6, 6, 6, 4, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6],
    [0, 0, 6, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 0, 0, 3, 0, 6],
    [2, 0, 6, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6],
    [0, 0, 6, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 4, 0, 0, 0, 6],
    [6, 6, 6, 6, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6],
    [6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6],
    [6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6],
    [6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6],
    [6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
    [6, 6, 0, 4, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
]

const stairs = {
    down: '2',
    up: '4'
}

const message = {
    title: 'As you inspect the walls, you notice a faint purple glow. Something definitely seemed off about those rats...',
    body: 'Up ahead, you notice a group of small humanoid creatures...'
}
// eslint-disable-next-line
export default {
    tiles,
    stairs,
    message
}