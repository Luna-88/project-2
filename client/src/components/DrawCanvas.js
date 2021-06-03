import React, { useRef } from 'react'
import GameCanvas from './GameCanvas'

import useWindowSize from '../hooks/useWindowSize'
import energyBeam from '../assets/images/energies/lightbeam.png'
import * as constants from '../models/constants'
import useWalk from '../hooks/useWalk'

import { puzzleMap, solarPowerMap, windPowerMap } from '../data/maps/mapMatrix'

function DrawCanvas() {

    const { dir, step, walk, position, index } = useWalk(3)

    const { width, height } = useWindowSize()


    const image = new Image()
    image.src = energyBeam

    const canvas = useRef(null)

    const draw = (ctx, frameCount) => {
        ctx.beginPath()
        ctx.clearRect( 0, 0, width, height)
        ctx.drawImage(image, 0, 0, 32, 32, position.x + 10*Math.sin(frameCount*0.05)**2, position.y , 32, 32)
    }
    



    return ( <div id='draw-canvas'> <GameCanvas ref={canvas} draw={draw} /></div>)
} 

export default DrawCanvas

