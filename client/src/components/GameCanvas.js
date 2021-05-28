import React, { useEffect, useRef } from 'react'
import useCanvas from '../hooks/useCanvas'

// let canvas = document.querySelector('.canvas')
// let ctx = canvas.getContext('2d')


export default function GameCanvas(props) {
    
    const {draw} = props
    const canvasRef = useCanvas(draw)

    return ( <canvas  
        id="canvas" 
        ref={canvasRef} 
        height='640px' 
        width={window.innerWidth}/>
    )
}

