import { useState, useEffect, useRef } from 'react'

import { puzzleMap, puzzleMapTwo, solarPowerMap, windPowerMap } from '../data/maps/mapMatrix'

import useWindowSize from '../hooks/useWindowSize'
import useWalk from '../hooks/useWalk'
import useKeyPress from '../hooks/useKeyPress'

import energyBeam from '../assets/images/energies/lightbeam.png'
import tileMap from '../assets/tileset/spritesheet_32.png'

import * as constants from '../models/constants'

const DrawTileMap = () => {
    const canvas = useRef(null)
    const [image, setImage] = useState(null)

    // set the initial state for the map
    const initialMap = puzzleMap

    localStorage.setItem('initial-mapMatrix', JSON.stringify(initialMap))

    function initialMapState() {
        const gameMapData = JSON.parse(localStorage.getItem('last-mapMatrix'))
        const gameInitialMapData = JSON.parse(localStorage.getItem('initial-mapMatrix'))
        if (gameMapData) {
            return gameMapData
        } else {
            return gameInitialMapData
        }
    }

    const [mapMatrix, setMapMatrix] = useState(() => initialMapState())

    useEffect(() => {
        localStorage.setItem('last-mapMatrix', JSON.stringify(mapMatrix))

    }, [mapMatrix])

    const { height, width } = useWindowSize()
    const { dir, step, walk, position, index } = useWalk(3)

    useKeyPress((e) => {
        let arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

        if (arrowKeys.includes(e.key)) {
            walk(e.key.replace('Arrow', '').toLowerCase())
            e.preventDefault()
        }
    })

    useEffect(() => {
        const image = new Image()
        image.src = tileMap
        image.onload = () => setImage(image)
    }, [])

    useEffect(() => {
        if (index === 368) {
            const ctx = canvas.current.getContext('2d')
            ctx.clearRect(0, 0, width, height)
            setMapMatrix(puzzleMapTwo)
        }
        if (index === 201) {
            const ctx = canvas.current.getContext('2d')
            ctx.clearRect(0, 0, width, height)
            setMapMatrix(solarPowerMap)
        }
        if (index === 29) {
            const ctx = canvas.current.getContext('2d')
            ctx.clearRect(0, 0, width, height)
            setMapMatrix(windPowerMap)
        }
        if (index === 253) {
            const ctx = canvas.current.getContext('2d')
            ctx.clearRect(0, 0, width, height)
            setMapMatrix(puzzleMap)
        }

        if (image && canvas) {
            const ctx = canvas.current.getContext('2d')
            ctx.beginPath()
            for (let Index = mapMatrix.length - 1; Index > -1; --Index) {
                if (mapMatrix[Index] === 0) {
                    //Grass
                    ctx.drawImage(
                        image,
                        480,
                        480,
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
                        0,
                        0,
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
                        0,
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
                if (mapMatrix[Index] === 3) {
                    ctx.drawImage(
                        image,
                        0,
                        64,
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
                if (mapMatrix[Index] === 4) {
                    ctx.drawImage(
                        image,
                        32,
                        64,
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
                if (mapMatrix[Index] === 5) {
                    ctx.drawImage(
                        image,
                        64,
                        64,
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
                if (mapMatrix[Index] === 6) {
                    ctx.drawImage(
                        image,
                        0,
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
                if (mapMatrix[Index] === 7) {
                    ctx.drawImage(
                        image,
                        0,
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
                if (mapMatrix[Index] === 8) {
                    ctx.drawImage(
                        image,
                        32,
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
                if (mapMatrix[Index] === 9) {
                    ctx.drawImage(
                        image,
                        32,
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
                if (mapMatrix[Index] === 10) {
                    ctx.drawImage(
                        image,
                        64,
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
                if (mapMatrix[Index] === 11) {
                    ctx.drawImage(
                        image,
                        64,
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
                if (mapMatrix[Index] === 12) {
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
                if (mapMatrix[Index] === 13) {
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
                if (mapMatrix[Index] === 14) {
                    ctx.drawImage(
                        image,
                        224,
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
                if (mapMatrix[Index] === 15) {
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
                if (mapMatrix[Index] === 16) {
                    ctx.drawImage(
                        image,
                        224,
                        96,
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
                if (mapMatrix[Index] === 17) {
                    ctx.drawImage(
                        image,
                        64,
                        0,
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
                if (mapMatrix[Index] === 18) {
                    ctx.drawImage(
                        image,
                        64,
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
                if (mapMatrix[Index] === 20) {
                    ctx.drawImage(
                        image,
                        0,
                        96,
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
                if (mapMatrix[Index] === 21) {
                    ctx.drawImage(
                        image,
                        0,
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
                if (mapMatrix[Index] === 22) {
                    ctx.drawImage(
                        image,
                        32,
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
                if (mapMatrix[Index] === 23) {
                    ctx.drawImage(
                        image,
                        64,
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
                if (mapMatrix[Index] === 24) {
                    ctx.drawImage(
                        image,
                        96,
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
                if (mapMatrix[Index] === 25) {
                    ctx.drawImage(
                        image,
                        128,
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
                if (mapMatrix[Index] === 26) {
                    ctx.drawImage(
                        image,
                        160,
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
                if (mapMatrix[Index] === 27) {
                    ctx.drawImage(
                        image,
                        0,
                        224,
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

    }, [image, width, height, mapMatrix, index])

    return (
        <div>
            <canvas ref={canvas} width={width} height={height} />
        </div>
    )
}

export default DrawTileMap
