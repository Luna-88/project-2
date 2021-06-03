import { useState, useEffect, createContext } from 'react'

import * as constants from '../models/constants'

import useWindowSize from './useWindowSize'
import { puzzleMap, puzzleMapTwo, solarPowerMap, windPowerMap, finalMap } from '../data/maps/mapMatrix'


export default function useWalk(maxSteps) {
    // Set current window dimensions
    const { height, width } = useWindowSize()

    // Initial position of sprite
    const init = {
        x: width/2, 
        y: height/2
    }
    
    // Store initial data to local storage
    localStorage.setItem('initial-player-position', JSON.stringify(init))
    
    // function for state on refresh, if no local storage it will return initial state. If there is it will return the previous state.
    function initialState() {
        const playerPositionData = JSON.parse(localStorage.getItem('last-player-position'))
        const playerInitialData = JSON.parse(localStorage.getItem('initial-player-position'))
        if (playerPositionData) {
            return playerPositionData
        } else {
            return playerInitialData
        }
    }

    // Lazy initial state for position
    const [position, setPosition] = useState(() => initialState())

    // useEffect to store existing position in local storage
    useEffect(() => {
        localStorage.setItem('last-player-position', JSON.stringify(position))

    }, [position])


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
   
    // set the initial state for the map
    const initialMap = puzzleMap 

    localStorage.setItem('initial-mapMatrix', JSON.stringify(initialMap))

    function initialMapState() {
        const gameMapData = JSON.parse(localStorage.getItem('last-mapMatrix'))
        const gameInitialMapData = JSON.parse(localStorage.getItem('initial-mapMatrix'))
        if (gameMapData) {
            return gameMapData
        } else {
            return gameInitialMapData
        }
    }

    const [mapMatrix, setMapMatrix] = useState(() => initialMapState())
   
    useEffect(() => {
        localStorage.setItem('last-mapMatrix', JSON.stringify(mapMatrix))

    }, [mapMatrix])




    const stepSize = 2

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


        console.log("index:", index, 'item:', mapMatrix[Math.floor(index)], 'Offset Index:', offsetIndex)
        
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
        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 5 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 5  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 5) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 5 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 5) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 5 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 5 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 5 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 5) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                }   
            }
        }
        
        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 4 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 4  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 4) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 4 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 4) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 4 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 4 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 4 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 4) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                }   
            }
        }

        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 16 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 16  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 16) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 16 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 16) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 16 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 16 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 16 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 16) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                }   
            }
        }

        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 1 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 1  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 1) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 1 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 1) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 1 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 1 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 1 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 1) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                }   
            }
        }

        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 2 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 2  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 2) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 2 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 2) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 2 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 2 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 2 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 2) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                }   
            }
        }

        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 27 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 27  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 27) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 27 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 27) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 27 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 27 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 27 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 27) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                }   
            }
        }
        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 29 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 29  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 29) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 29 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 29) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 29 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 29 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 29 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 29) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
                }   
            }
        }
        for ( let i = 0; i < mapMatrix.length; i++) {
            if ( mapMatrix[i] == 28 ) {
                if (Math.floor(index) == Math.floor(i) || Math.floor(offsetIndex) == Math.floor(i)){                        
                    if( dir === 'right' && mapMatrix[Math.floor(index)] == 28  || dir === 'right' && mapMatrix[Math.floor(offsetIndex)] == 28) {
                        modifier[dir].x = 0
                        console.log('right barrier')
                        // this fucking works! 
                    }
                    if( dir === 'left' && mapMatrix[Math.floor(index)] == 28 ||  (dir === 'left' && mapMatrix[Math.floor(offsetIndex)] == 28) ) {
                        modifier[dir].x = 0
                        console.log('left barrier')
                        // this fucking works! 
                    }
                    if( dir === 'up' && mapMatrix[Math.floor(index)] == 28 || dir === 'up' && mapMatrix[Math.floor(offsetIndex)] == 28 ) {
                        modifier[dir].y = 0
                        console.log('up barrier')
                        // this fucking works! 
                    }

                    if( dir === 'down' && mapMatrix[Math.floor(index)] == 28 || (dir === 'down' && mapMatrix[Math.floor(offsetIndex)] == 28) ) {
                        modifier[dir].y = 0
                        console.log('down barrier')
                        // this fucking works! 
                    }
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

    useEffect(() => {
        if (index === 368) {
            setMapMatrix(puzzleMapTwo)
        }
    })
    useEffect(() => {
        if (index === 201) {
            setMapMatrix(solarPowerMap)
        }
    })
    useEffect(() => {
        if (index === 29) {
            setMapMatrix(windPowerMap)
        }
    })
    useEffect(() => {
        if (index === 334) {
            setMapMatrix(finalMap)
        }
    })
    useEffect(() => {
        if (index === 253) {
            setMapMatrix(puzzleMap)
        }
    })

    return {
        walk,
        dir,
        step,
        position,
        modifier,
        index,
        offsetIndex,
    }
}