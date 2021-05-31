import { useState } from 'react'

import * as constants from '../models/constants'

import useWindowSize from '../hooks/useWindowSize'

export default function useWalk(maxSteps) {
    // Set initial location of user
    const { height, width } = useWindowSize()

    const [position, setPosition] = useState({
        x: width / 2,
        y: height / 2,
    })

    const [dir, setDir] = useState(0)
    const [step, setStep] = useState(0)
    const [index, setIndex] = useState(200)

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
        // New world bounds        
        let worldBounds =
            position.x + modifier[dir].x >= 0 &&
            position.x + modifier[dir].x <= 640 - constants.spriteSize.width &&
            position.y + modifier[dir].y >= 0 &&
            position.y + modifier[dir].y <= 640 - constants.spriteSize.height

        if (worldBounds) {
            setPosition((prev) => ({
                x: prev.x + modifier[dir].x,
                y: prev.y + modifier[dir].y,
            }))
        }

        if ( dir === 'left' ) {
            setIndex((Math.floor((position.y / constants.sizes.tileHeight) * constants.sizes.row)) + Math.floor((position.x / constants.sizes.tileWidth)))
        }
        if ( dir === 'right' ) {
            setIndex((Math.floor((position.y / constants.sizes.tileHeight) * constants.sizes.row)) + Math.floor(((position.x + 31) / constants.sizes.tileWidth)))
        }
        if (dir === 'up' ) {
            setIndex((Math.floor((position.y)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor((position.x / constants.sizes.tileWidth))))
        }
        if ( dir === 'down' ) {
            setIndex((Math.floor((position.y + 31)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor((position.x / constants.sizes.tileWidth))))
        }
    }

    return {
        walk,
        dir,
        step,
        position,
        modifier,
        index,
    }
}