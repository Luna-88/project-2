import { useState, useEffect, useRef } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import { mapMatrix } from '../data/maps/mapMatrix'

import * as constants from '../models/constants'

import tileMap from '../assets/tileset/tileSetTest.png'

//fixed

const DrawTileMap = () => {
    const { height, width } = useWindowSize()
    const [image, setImage] = useState(null)
    const canvas = useRef(null)

    useEffect(() => {
        const image = new Image()
        image.src = tileMap
        image.onload = () => setImage(image)
    }, [])

    useEffect(() => {
        if (image && canvas) {
            const ctx = canvas.current.getContext('2d')
            ctx.beginPath()
            for (let index = mapMatrix.length - 1; index > -1; --index) {
                if (mapMatrix[index] === 0) {
                    ctx.drawImage(
                        image,
                        192,
                        160,
                        32,
                        32,
                        (index % (mapMatrix.length / constants.sizes.column)) *
                            constants.sizes.tileWidth,
                        Math.floor(
                            index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
                if (mapMatrix[index] === 1) {
                    ctx.drawImage(
                        image,
                        160,
                        128,
                        32,
                        32,
                        (index % (mapMatrix.length / constants.sizes.column)) *
                            constants.sizes.tileWidth,
                        Math.floor(
                            index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
                if (mapMatrix[index] === 2) {
                    ctx.drawImage(
                        image,
                        256,
                        128,
                        32,
                        32,
                        (index % (mapMatrix.length / constants.sizes.column)) *
                            constants.sizes.tileWidth,
                        Math.floor(
                            index / (mapMatrix.length / constants.sizes.row)
                        ) * constants.sizes.tileHeight,
                        constants.sizes.tileWidth,
                        constants.sizes.tileHeight
                    )
                }
            }
        }
    }, [image, width, height])

    return (
        <div>
            <canvas ref={canvas} width={width} height={height} />
        </div>
    )
}

export default DrawTileMap
