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

    const [index, setIndex] = useState(0)
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

        setIndex(Math.floor(position.y / constants.sizes.tileHeight) * constants.sizes.row + Math.floor(position.x / constants.sizes.tileWidth))

        // if (dir === 'down') {
        //     if (
        //         spriteTopOffset + 32 >= squareTopOffset &&
        //         spriteTopOffset <= squareTopOffset + 32 &&
        //         spriteLeftOffset >= squareLeftOffset &&
        //         spriteLeftOffset <= squareLeftOffset + 32
        //     ) {
        //         square.style.backgroundImage = `url(${buttonDown})`
        //     }
        // } else if (dir === 'up') {
        //     if (
        //         spriteTopOffset + 24 <= squareTopOffset + 32 &&
        //         spriteTopOffset >= squareTopOffset &&
        //         spriteLeftOffset >= squareLeftOffset &&
        //         spriteLeftOffset <= squareLeftOffset + 32
        //     ) {
        //         square.style.backgroundImage = `url(${buttonDown})`
        //     }
        // } else if (dir === 'left') {
        //         if (
        //             spriteTopOffset >= squareTopOffset &&
        //             spriteTopOffset <= squareTopOffset + 32 &&
        //             spriteLeftOffset + 24 <= squareLeftOffset + 32 &&
        //             spriteLeftOffset + 24 >= squareLeftOffset
        //         ) {
        //             square.style.backgroundImage = `url(${buttonDown})`
        //         }
        //     } else if (dir === 'right') {
        //         if (
        //             spriteTopOffset >= squareTopOffset &&
        //             spriteTopOffset <= squareTopOffset + 32 &&
        //             spriteLeftOffset + 24 >= squareLeftOffset &&
        //             spriteLeftOffset + 24 <= squareLeftOffset + 32
        //         ) {
        //             square.style.backgroundImage = `url(${buttonDown})`
        //         }
        //     }

        // function topCollision(prev) {
        //     // New world bounds
        //     let collide = null
        //     console.log('index', index)

        //     for ( let item in mapMatrix ) { 
        //         if ( mapMatrix[item] == 3 && index === 63) {
        //             console.log('collide')

        //             if (index === item ){
        //                 collide = true
        //             }
        //         }
        //     }   
        //     return collide
        // } 
        // topCollision()
    }

    return {
        walk,
        dir,
        step,
        position,
        modifier,
    }
}