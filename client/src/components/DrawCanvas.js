import React, { useState } from 'react'
import GameCanvas from './GameCanvas'
import { useWindowResize } from 'beautiful-react-hooks'

import grass from '../assets/tileset/tiles/grass.png'


export default function DrawCanvas() {
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)


    useWindowResize((e) => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    })

    let width = window.innerWidth
    let height = window.innerHeight

    let w = 640
    let h = 640

    const draw = ctx => {
        ctx.beginPath()
        ctx.clearRect( 0, 0, width, height)
        ctx.fillRect( ((width-w)/2), ((height-h)/2), w, h)
    }

    return ( <div><GameCanvas draw={draw} /></div>)
}

