import { useState } from 'react'

import * as constants from '../models/constants'

import useWindowSize from './useWindowSize'
import { puzzleMap } from '../data/maps/mapMatrix'


export default function useWalk(maxSteps) {
    // Set initial location of user
    const { height, width } = useWindowSize()

    const [position, setPosition] = useState({
        x: width / 2,
        y: height / 2,
    })


    const [dir, setDir] = useState(0)
    const [step, setStep] = useState(0)
    const [index, setIndex] = useState(230)
    const [offsetIndex, setOffsetIndex] = useState(231)

    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    }

    const stepSize = 4
    const stepOffset = 1

    const modifier = {
        down: { x: 0, y: stepSize },
        left: { x: -stepSize, y: 0 },
        right: { x: stepSize, y: 0 },
        up: { x: 0, y: -stepSize },

    }
    const indexModifier = {
        down: { x: 0, y: stepOffset },
        left: { x: -stepOffset, y: 0 },
        right: { x: stepOffset, y: 0 },
        up: { x: 0, y: -stepOffset },

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


        console.log("index:", index, 'item:', puzzleMap[Math.floor(index)], 'Offset Index:', offsetIndex)
        
        if ( dir === 'left') {
            setOffsetIndex((Math.floor((position.y + 31)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x) / constants.sizes.tileWidth))))
        }
        if ( dir === 'right') {
            setOffsetIndex((Math.floor((position.y + 31)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x + 31) / constants.sizes.tileWidth))))
        }
        if ( dir === 'up') {
            setOffsetIndex((Math.floor((position.y)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x + 31) / constants.sizes.tileWidth))))
        }
        if ( dir === 'down') {
            setOffsetIndex((Math.floor((position.y + 31)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x + 31) / constants.sizes.tileWidth))))
        }

        // COLLISION MATH
        for ( let i = 0; i < puzzleMap.length; i++) {
            if ( puzzleMap[i] == 5 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && puzzleMap[Math.floor(index)] == 5  || dir === 'right' && puzzleMap[Math.floor(offsetIndex)] == 5) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && puzzleMap[Math.floor(index)] == 5 ||  (dir === 'left' && puzzleMap[Math.floor(offsetIndex)] == 5) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && puzzleMap[Math.floor(index)] == 5 || dir === 'up' && puzzleMap[Math.floor(offsetIndex)] == 5 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && puzzleMap[Math.floor(index)] == 5 || (dir === 'down' && puzzleMap[Math.floor(offsetIndex)] == 5) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                        
                        // if ((position.y + modifier[dir].y) > (constants.sizes.tileHeight *  i / constants.sizes.row ) && position.y + constants.spriteSize.height <= (constants.sizes.tileHeight *  i / constants.sizes.row )  ){
                        //     modifier[dir].y = 0 
                        // }
                }   
            }
        }
        
        if (worldBounds) {
            setPosition((prev) => ({
                x: prev.x + modifier[dir].x,
                y: prev.y + modifier[dir].y,
            }))
        }

        if ( dir === 'left' ) {
            setIndex((Math.floor((position.y)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x ) / constants.sizes.tileWidth))))
        }
        if ( dir === 'right' ) {
            setIndex((Math.floor((position.y)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x + 31) / constants.sizes.tileWidth)))) 
        }
        if (dir === 'up' ) {
            setIndex((Math.floor((position.y)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x)/ constants.sizes.tileWidth))))
        }
        if ( dir === 'down' ) {
            setIndex((Math.floor((position.y + 31)/ constants.sizes.tileHeight) * constants.sizes.row) + (Math.floor(((position.x) / constants.sizes.tileWidth))))
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