import * as constants from "../models/constants"

import world from '../assets/images/worlds/world_1.png'

export default function TileGrid({ image }) {
    const height = 600
    const width = 900

    const tiles = []
    let id = 0

    for (let y = 0; y < width - constants.spriteSize.height - 100; y = y + 32) {
        const row = []
        for (let x = 0; x < height - constants.spriteSize.width - 50; x = x + 32) {
            row.push({
                x, y, id: id++
            })
        }
        tiles.push(row)
    }

    console.dir(tiles)

    return (
        <div className="world-container" id="world-container"
            style={{
                // VDR WORLD SIZE
                margin: constants.spriteSize.width + `px`,
                height: height - constants.spriteSize.height + `px`,
                width: width - constants.spriteSize.width + `px`,
                backgroundImage: `url(${world})`,
                backgroundSize: '100% 100%',
            }}>

            {tiles.map((row, y) => (
                <div className="row">
                    {row.map((tile, x) => <div className="tile"
                        style={{
                            borderTop: '1px solid black',
                            borderLeft: '1px solid black',
                            width: 32,
                            height: 32,
                        }}
                    />)}
                </div>
            ))}

        </div>
    )
}