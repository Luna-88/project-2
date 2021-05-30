import Actor from "./Actor"
import useKeyPress from "../hooks/useKeyPress"
import useWalk from "../hooks/useWalk"

export default function Player({ skin, sidekick, xOffset, yOffset, light=false }) {
    const { dir, step, walk, position } = useWalk()
    
    const data = {
        h: 32,
        w: 32,
    }


    useKeyPress((e) => {
        let arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
        //console.log(e.key)

        if (arrowKeys.includes(e.key)) {
            walk(e.key.replace("Arrow", "").toLowerCase())
            e.preventDefault()
        } else if (e.key === " " && light===true) {
            document.getElementById("sprite").style.display = "none"
            e.preventDefault()
        } else if (e.key === "q" && light===true) {
            document.getElementById("sprite").style.display = "block"
            e.preventDefault()
        }
    })

    return (
        <Actor
            sprite={skin}
            data={data}
            step={step}
            dir={dir}
            position={position}
            sidekick={sidekick}
            xOffset={xOffset}
            yOffset={yOffset}
        />
    )
}
