export default function Map({ tiles, tileset, size }) {
    return (
        <div style={{
            boxSizing: 'border-box',
            backgroundColor: "white",
            width: size.width,

        }}>
            {tiles.map((row, y) => <div style={{ display: "flex" }}>
                {row.map((tile, x) => <div
                    style={{
                        borderTop: '1px solid black',
                        borderRight: '1px solid black',
                        background: `url(${tileset}) -${tile.v.x * 32}px -${tile.v.y * 32}px no-repeat`,
                        width: 32,
                        height: 32,
                    }}
                />)}
            </div>
            )}
        </div>
    )
}