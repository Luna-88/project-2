import React, { useState } from 'react'
import GameCanvas from './GameCanvas'
import { useWindowResize } from 'beautiful-react-hooks'

export default function DrawCanvas() {
    let width = window.innerWidth
    let height = window.innerHeight
    
    const [windowWidth, setWindowWidth] = useState(width)
    const [windowHeight, setWindowHeight] = useState(height)

    useWindowResize((e) => {
        setWindowWidth(width)
        setWindowHeight(height)
    })

    let w = 640
    let h = 640

    const draw = ctx => {
        ctx.beginPath()
        ctx.clearRect( 0, 0, width, height)
        ctx.fillRect( ((width-w)/2), ((height-h)/2), w, h)
    }

    return ( <div><GameCanvas draw={draw} /></div>)
}

