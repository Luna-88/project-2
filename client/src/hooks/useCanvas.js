import { useRef, useEffect } from 'react'

export default function useCanvas(draw) {
    
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        requestAnimationFrame(() => draw(context))

        const handleResize = e => {
            context.canvas.height = window.innerHeight
            context.canvas.width = window.innerWidth
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)

    }, [draw])


    return canvasRef
}
