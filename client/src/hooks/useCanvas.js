import { useRef, useEffect } from 'react'
import useWalk from '../hooks/useWalk'

export default function useCanvas(draw) {
    const canvasRef = useRef(null)

    const { dir, step, walk, position, index } = useWalk(3)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        let frameCount = 0
        let animationFrameId

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
    render()

    return () => {

        window.cancelAnimationFrame(animationFrameId)
    }

    }, [draw, position])

    return canvasRef
}
