import { useState } from 'react'

import * as constants from '../models/constants'

import useWorldOffset from './useWorldOffset'
import useSpriteOffset from './useSpriteOffset'

import buttonDown from '../assets/images/objects/buttonDown.png'

export default function useWalk(maxSteps) {
    const initTop = document.documentElement.clientHeight / 2
    const initLeft = document.documentElement.clientWidth / 2
    const height = 640
    const width = 640
    const stepSize = 8

    const { worldTopOffset, worldLeftOffset } = useWorldOffset(initTop, initLeft)
    const { spriteTopOffset, spriteLeftOffset } = useSpriteOffset()

    const [position, setPosition] = useState({
        x: worldLeftOffset,
        y: worldTopOffset,
    })
    const [dir, setDir] = useState(0)
    const [step, setStep] = useState(0)

    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    }

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
        let worldBounds = (
            position.x + modifier[dir].x >= worldLeftOffset &&
            position.x + modifier[dir].x <=
            width + worldLeftOffset - constants.spriteSize.width &&
            position.y + modifier[dir].y >= worldTopOffset &&
            position.y + modifier[dir].y <=
            height + worldTopOffset - constants.spriteSize.height
        )

        if (worldBounds) {
            setPosition((prev) => ({
                x: prev.x + modifier[dir].x,
                y: prev.y + modifier[dir].y,
            }))
        }

        const square = document.getElementById('square')
        const squareTopOffset = square.offsetTop
        const squareLeftOffset = square.offsetLeft


        if (dir === 0) {
            if (
                spriteTopOffset + 32 >= squareTopOffset &&
                spriteTopOffset + 32 <= squareTopOffset + 32 &&
                spriteLeftOffset + 32 >= squareLeftOffset &&
                spriteLeftOffset + 32 <= squareLeftOffset + 32
            ) {
                square.style.backgroundImage = `url(${buttonDown})`
            }
        } else if (dir === 3) {
            if (
                spriteTopOffset + 32 >= squareTopOffset &&
                spriteTopOffset + 32 <= squareTopOffset + 32 &&
                spriteLeftOffset + 32 >= squareLeftOffset &&
                spriteLeftOffset + 32 <= squareLeftOffset + 32
            ) {
                square.style.backgroundImage = `url(${buttonDown})`
            }
        } else if (dir === 'left') {
                if (
                    spriteTopOffset >= squareTopOffset &&
                    spriteTopOffset <= squareTopOffset + 32 &&
                    spriteLeftOffset <= squareLeftOffset + 16 &&
                    spriteLeftOffset >= squareLeftOffset
                ) {
                    square.style.backgroundImage = `url(${buttonDown})`
                }
            } else if (dir === 'right') {
                if (
                    spriteTopOffset >= squareTopOffset &&
                    spriteTopOffset <= squareTopOffset + 32 &&
                    spriteLeftOffset + 16 >= squareLeftOffset &&
                    spriteLeftOffset + 16 <= squareLeftOffset + 32
                ) {
                    square.style.backgroundImage = `url(${buttonDown})`
                }
            }

        console.log("sqTop ", squareTopOffset)
        console.log("sqLeft ", squareLeftOffset)

        console.log("spTop ", spriteTopOffset)
        console.log("spLeft ", spriteLeftOffset)

        console.log("dir", dir)
    }

    return {
        walk,
        dir,
        step,
        position,
    }
}
