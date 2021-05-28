import React, { useState } from 'react'
import GameCanvas from './GameCanvas'
import { useWindowResize } from 'beautiful-react-hooks'



export default function DrawCanvas() {
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)


    useWindowResize((e) => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    })

    const draw = ctx => {
        ctx.fillStyle = 'salmon'
        ctx.beginPath()
        ctx.fillRect( 0, 0, 640, 640)
    }

    return ( <div> {windowWidth} {windowHeight} <GameCanvas draw={draw} /> </div>)
}

