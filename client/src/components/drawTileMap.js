import { useState, useEffect, useRef } from 'react'

import useWindowSize from '../hooks/useWindowSize'

import { redFlower, blueFlower, yellowFlower } from '../data/maps/mapMatrix'

import * as constants from '../models/constants'

import tileMap from '../assets/tileset/tileSetTest.png'
import useWalk from '../hooks/useWalk'
import useKeyPress from '../hooks/useKeyPress'

const DrawTileMap = () => {
    const { height, width } = useWindowSize()
    const { dir, step, walk, position, index } = useWalk(3)
    const canvas = useRef(null)

    const [image, setImage] = useState(null)

    useKeyPress((e) => {
        let arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

        if (arrowKeys.includes(e.key)) {
            walk(e.key.replace("Arrow", "").toLowerCase())
            e.preventDefault()
        }
    })

    let mapMatrix = redFlower

    console.log("index DrawTile", index)

    if (index !== 23) {
        mapMatrix = redFlower
    }
    if (index === 23) {
        mapMatrix = yellowFlower
    }

    useEffect(() => {
        const image = new Image()
        image.src = tileMap
        image.onload = () => setImage(image)
    }, [])

    useEffect(() => {
        if (image && canvas) {
            const ctx = canvas.current.getContext('2d')
            ctx.beginPath()
            for (let Index = mapMatrix.length - 1; Index > -1; --Index) {
                if (mapMatrix[Index] === 0) { //Grass
                    ctx.drawImage(
                        image,
                        192,
                        160,
                        32,
                        32,
                        (Index % (mapMatrix.length / constants.sizes.column)) *
                        constants.sizes.tileWidth,
                        Math.floor(
                            Index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
                if (mapMatrix[Index] === 1) { //Red flowers
                    ctx.drawImage(
                        image,
                        224,
                        32,
                        32,
                        32,
                        (Index % (mapMatrix.length / constants.sizes.column)) *
                        constants.sizes.tileWidth,
                        Math.floor(
                            Index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
                if (mapMatrix[Index] === 2) { //Blue flowers
                    ctx.drawImage(
                        image,
                        224,
                        128,
                        32,
                        32,
                        (Index % (mapMatrix.length / constants.sizes.column)) *
                        constants.sizes.tileWidth,
                        Math.floor(
                            Index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
                if (mapMatrix[Index] === 3) { //Yellow flowers
                    ctx.drawImage(
                        image,
                        224,
                        192,
                        32,
                        32,
                        (Index % (mapMatrix.length / constants.sizes.column)) *
                        constants.sizes.tileWidth,
                        Math.floor(
                            Index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
                if (mapMatrix[Index] === 4) { //Buddha
                    ctx.drawImage(
                        image,
                        448,
                        448,
                        32,
                        32,
                        (Index % (mapMatrix.length / constants.sizes.column)) *
                        constants.sizes.tileWidth,
                        Math.floor(
                            Index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
            }
        }
    }, [image, width, height, mapMatrix])

    return (
        <div>
            <canvas ref={canvas} width={width} height={height} />
        </div>
    )
}

export default DrawTileMap