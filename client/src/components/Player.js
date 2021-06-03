import Actor from "./Actor"
import useKeyPress from "../hooks/useKeyPress"
import useWalk from "../hooks/useWalk"

import beamToggle from '../hooks/useBeam'


export default function Player({ skin, sidekick, xOffset, yOffset, light = true }) {
    const { dir, step, walk, position, index } = useWalk(3)

    const data = {
        h: 32,
        w: 32,
    }

    useKeyPress((e) => {
        let arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

        if (arrowKeys.includes(e.key)) {
            walk(e.key.replace("Arrow", "").toLowerCase())
            e.preventDefault()
        } else if (e.key === " " && light === true) {
            beamToggle()
            e.preventDefault()
        } else if (e.key === "q" && light === true) {
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
