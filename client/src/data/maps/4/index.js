const tiles = [
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 4, 0, 0, 6, 6, 6, 6, 6, 0, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 0, 0, 0, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 20, 0, 20, 6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 6],
    [6, 6, 0, 6, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 2, 0, 6],
    [6, 6, 0, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 6],
    [6, 6, 0, 6, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6],
    [6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6],
    [6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6],
    [6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 0, 4, 0, 0, 0, 0, 0, 0, 6, 6],
    [6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6],
    [6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
]

const stairs = {
    down: '3',
    up: '1'
}

const message = {
    title: 'Nothing...',
    body: 'Just nothing...'
}
// eslint-disable-next-line
export default {
    tiles,
    stairs,
    message
}