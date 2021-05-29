import { useState } from 'react'
import * as constants from '../models/constants'
import useWindowSize from '../hooks/useWindowSize'

export default function useWalk(maxSteps) {
    // Set initial location of user
    const { height, width } = useWindowSize()

    const [position, setPosition] = useState({
        x: width/2,
        y: height/2,
    })

    const [dir, setDir] = useState(0)
    const [step, setStep] = useState(0)

    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    }

    const stepSize = 4

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
        // New world bounds
        if (
            position.x + modifier[dir].x >= position.x + modifier[dir].x <=
                width - constants.spriteSize.width + position.y + modifier[dir].y >=
            position.y + modifier[dir].y <= height - constants.spriteSize.height
        )
            setPosition((prev) => ({
                x: prev.x + modifier[dir].x ,
                y: prev.y + modifier[dir].y,
            }))
    }



    return {
        walk,
        dir,
        step,
        position,
        modifier,
    }
}
