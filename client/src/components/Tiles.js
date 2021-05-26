import useDraggable from "../hooks/useDraggable"

export default function Tiles() {
    const { position } = useDraggable("handle")
    
    return (
        <div
            style={{
                position: "relative",
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: "grey",
                overflow: "hidden",
                border: "1px solid black"
            }}
        >
            <div id="handle"
                style={{
                    position: "absolute",
                    top: position.y,
                    left: position.x,
                    zIndex: 100,
                    width: 200,
                    height: 200,
                    border: "1px solid black",
                    backgroundColor: "white"
                }}
            >
            </div>
        </div>
    )
}