import handle from '../assets/images/objects/drag-handle.png'

export default function TilePalette({ tileset, position, size }) {
    const { width, height } = size
    const tiles = []
    let id = 0

    for (let y = 0; y < height; y = y + 32) {
        const row = []
        for (let x = 0; x < width; x = x + 32) {
            row.push({
                x, y, id: id++
            })
        }
        tiles.push(row)
    }

    console.dir(tiles)

    return (
        <div id="palette"
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                zIndex: 100,
                border: "1px solid black",
                backgroundColor: "white"
            }}
        >
            <img src={handle} id='handle' alt='img' />
            {tiles.map((row, y) => (
                <div style={{ display: "flex" }}>
                    {row.map((tile, x) => <div
                        style={{
                            borderTop: '1px solid black',
                            borderRight: '1px solid black',
                            background: `url(${tileset}) -${x*32}px -${y*32}px no-repeat`,
                            width: 32,
                            height: 32,
                        }}
                    />)}
                </div>
            ))}
        </div>
    )
}