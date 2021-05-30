import { useState, useEffect, useRef } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import useWalk from '../hooks/useWalk'

import { mapMatrix } from '../data/maps/mapMatrix'

import * as constants from '../models/constants'

import tileMap from '../assets/tileset/tileSetTest.png'

//fixed

const DrawTileMap = () => {
    const { height, width } = useWindowSize()
    const { dir, step, walk, position, index } = useWalk(3)
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
            for (let Index = mapMatrix.length - 1; Index > -1; --Index) {
                if (mapMatrix[Index] === 0) {
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
                if (mapMatrix[Index] === 1) {
                    ctx.drawImage(
                        image,
                        192,
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
                if (mapMatrix[Index] === 2) {
                    ctx.drawImage(
                        image,
                        300,
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
