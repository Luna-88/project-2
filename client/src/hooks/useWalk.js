import { useState } from "react"
import * as constants from "../constants"
import useWindowSize from "../hooks/useWindowSize"

export default function useWalk(maxSteps) {
    // Set initial location of user
    const { height, width } = useWindowSize()
    let halfWidth = width / 2
    let halfHeight = height / 2
    const [position, setPosition] = useState({ x: halfWidth, y: halfHeight })
    const [dir, setDir] = useState(0)
    const [step, setStep] = useState(0)

    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    }

    const stepSize = 8

    const modifier = {
        down: { x: 0, y: stepSize },
        left: { x: -stepSize, y: 0 },
        right: { x: stepSize, y: 0 },
        up: { x: 0, y: -stepSize },
    }

    function walk(dir) {
        setDir((prev) => {
            if (directions[dir] === prev) move(dir)
            return directions[dir]
        })

        setStep((prev) => (prev < maxSteps - 1 ? prev + 1 : 0))
    }

    function move(dir) {
        // const world = document.getElementById("sprite")
        // const rect = world.getBoundingClientRect()
        // console.log("position x: ", rect.left)
        // console.log("position y: ", rect.top)

        // New world bounds
        if (
            position.x + modifier[dir].x >= 50 &&
            position.x + modifier[dir].x <=
            width - constants.spriteSize.width - 50 &&
            position.y + modifier[dir].y >= 50 &&
            position.y + modifier[dir].y <=
            height - constants.spriteSize.height - 50
        )

            setPosition((prev) => ({
                x: prev.x + modifier[dir].x,
                y: prev.y + modifier[dir].y,
            }))
    }

    return {
        walk,
        dir,
        step,
        position,
    }
}
