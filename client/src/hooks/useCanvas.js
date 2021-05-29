import { useRef, useEffect } from 'react'

export default function useCanvas(draw) {
    
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        requestAnimationFrame(() => draw(context))

    }, [draw])


    return canvasRef
}
