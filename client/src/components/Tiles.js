import { useEffect, useState } from 'react'
import spring from '../assets/tileset/spring.png'

import useDraggable from "../hooks/useDraggable"
import TilePalette from "./TilePalette"

export default function Tiles() {
    const [tileset, setTileset] = useState({ spring })
    const [tiles, setTiles] = useState([])
    const [mapSize, setMapSize] = useState({
        width: 800,
        height: 600,
    })

    const { position } = useDraggable("handle")

    useEffect(() => {
        const _tiles = []
        let id = 0
        for (let y = 0; y < mapSize.height; y = y + 32) {
            const row = []
            for (let x = 0; x < mapSize.width; x = x + 32) {
                row.push({
                    x,
                    y,
                    id: id++,
                    v: { x: -32, y: -32 },
                })
            }
            _tiles.push(row)
        }
        setTiles(_tiles)
    }, [])

    return (
        <div
            style={{
                position: "relative",
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: "grey",
                overflow: "hidden",
                border: "1px solid black"
            }}
        >
            <TilePalette
                position={position}
                size={{ height: 288, width: 640 }}
                tileset={tileset}
            />
        </div>
    )
}