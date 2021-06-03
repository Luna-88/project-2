import useCanvas from '../hooks/useCanvas'

export default function GameCanvas(props) {
    const { draw } = props
    const canvasRef = useCanvas(draw)

    return (<canvas
        id="canvas"
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
    />
    )
}