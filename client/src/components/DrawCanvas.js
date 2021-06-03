import React, { useRef } from 'react'
import GameCanvas from './GameCanvas'

import useWindowSize from '../hooks/useWindowSize'
import shipEngine from '../assets/images/objects/ship_engine.png'
import shipControl from '../assets/images/objects/ship_control.png'
import * as constants from '../models/constants'
import useWalk from '../hooks/useWalk'

import { puzzleMap, solarPowerMap, windPowerMap } from '../data/maps/mapMatrix'

function DrawCanvas() {

    const { dir, step, walk, position, index } = useWalk(3)

    const { width, height } = useWindowSize()

    const image1 = new Image()
    image1.src = shipControl
    
    const image2 = new Image()
    image2.src = shipEngine

    const canvas = useRef(null)

    const drawEngine = (ctx, frameCount) => {
        ctx.beginPath()
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(image1, 0, 0, 32, 32, 32, 320 + 10 * Math.sin(frameCount * 0.05) ** 2, 32, 32)
    }
    const drawControl = (ctx, frameCount) => {
        ctx.beginPath()
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(image2, 0, 0, 32, 32, 320, 32 + 10 * Math.sin(frameCount * 0.05) ** 2, 32, 32)
    }

    return (<div id='draw-canvas'> <GameCanvas ref={canvas} draw={drawEngine} draw={drawControl}/></div>)
}

export default DrawCanvas

