import { useState } from 'react'
import * as constants from '../models/constants'
import useWindowSize from '../hooks/useWindowSize'

import useWorldOffset from '../hooks/useWorldOffset'

import { mapMatrix } from "../features/getTileImage"

export default function useWalk(maxSteps) {
    // Set initial location of user
    const { height, width } = useWindowSize()

    const [position, setPosition] = useState({
        x: width/2,
        y: height/2,
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
        if (
            position.x + modifier[dir].x >= position.x + modifier[dir].x <=
                width - constants.spriteSize.width + position.y + modifier[dir].y >=
            position.y + modifier[dir].y <= height - constants.spriteSize.height

            // position.x + modifier[dir].x >= worldLeftOffset &&
            // position.x + modifier[dir].x <=
            // width + worldLeftOffset - constants.spriteSize.width &&
            // position.y + modifier[dir].y >= worldTopOffset &&
            // position.y + modifier[dir].y <=
            // height + worldTopOffset - constants.spriteSize.height
        )
            setPosition((prev) => ({
                x: prev.x + modifier[dir].x ,
                y: prev.y + modifier[dir].y,
            }))    
            
            setIndex(Math.floor(position.y / constants.sizes.tileHeight) * constants.sizes.row + Math.floor(position.x / constants.sizes.tileWidth))
            // console.log('long', index)

            function topCollision(prev) {
                // New world bounds
                let collide = null
                console.log('index', index)
                
                for ( let item in mapMatrix ) { 
                    if ( mapMatrix[item] == 3 && index === 63) {
                        console.log('collide')
                
                        if (index === item ){
                            collide = true
                        }
                    }
                }   
                return collide
            } 
            topCollision()
    }

   
   
       
        // if (

        //     position.y + modifier[dir].y <= 
                
        //         }
                
        // )
    //         setPosition((prev) => ({
    //             x: prev.x + modifier[dir].x ,
    //             y: prev.y + modifier[dir].y,
    //         }))
    // }
    


    return {
        walk,
        dir,
        step,
        position,
        modifier,
    }
}
