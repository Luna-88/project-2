import { useState } from 'react'
import * as constants from '../models/constants'
import useWindowSize from '../hooks/useWindowSize'
import useWorldOffset from './useWorldOffset'

export default function useWalk(maxSteps) {
    // Set initial location of user
    // const { height, width } = useWindowSize()
    const height = 640
    const width = 640

    // let halfWidth = width / 2
    // let halfHeight = height / 2

    const { topOffset, leftOffset } = useWorldOffset()
    const leftOffsetInit = leftOffset //+ (width/2) + 32
    const topOffsetInit = topOffset //+ (height/2) + 32
    // const leftOffsetInit = 32
    // const topOffsetInit = 32

    const [position, setPosition] = useState({
        x: leftOffsetInit,
        y: topOffsetInit,
    })

    const [dir, setDir] = useState(0)
    const [step, setStep] = useState(0)

    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    }

    const stepSize = 1

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
        // const rect = world.getBoundingClientRect()
        // const rect = world.offsetTop
        // console.log("position x: ", rect)
        // console.log("position y: ", rect)

        // const world = document.getElementById('heres-your-id-name-duh')
        // const topOffset = world.offsetTop
        // const leftOffset = world.offsetLeft

        // New world bounds


        if (
            position.x + modifier[dir].x >= leftOffset &&
            position.x + modifier[dir].x <=
            width - constants.spriteSize.width + leftOffset &&
            position.y + modifier[dir].y >= + topOffset &&
            position.y + modifier[dir].y <=
            height - constants.spriteSize.height + topOffset

            // position.x + modifier[dir].x >= 32 + leftOffset &&
            // position.x + modifier[dir].x <=
            // width - constants.spriteSize.width - 32 + leftOffset &&
            // position.y + modifier[dir].y >= 32 + topOffset &&
            // position.y + modifier[dir].y <=
            // height - constants.spriteSize.height - 32 + topOffset
        )
            setPosition((prev) => ({
                x: prev.x + modifier[dir].x,
                y: prev.y + modifier[dir].y,
            }))

        console.log("modifier", modifier[dir].x)

        function currentPosition() {
            const currentX = Math.ceil((position.x - leftOffset) / 32)
            const currentY = Math.ceil((position.y - topOffset) / 32)
            return { currentX: currentX, currentY: currentY }
        }

        function neighbouringTiles() {
            const myPosition = currentPosition()
            const neighbours = { north: myPosition.currentY * myPosition.currentX - 20, west: myPosition.currentX * myPosition.currentY - 1, south: myPosition.currentY * myPosition.currentX + 20, east: myPosition.currentX * myPosition.currentY + 1 }
            return neighbours
        }

        console.log("current ", currentPosition())
        console.log("neighbours ", neighbouringTiles())

        // console.log(topOffset, "top")
        // console.log(leftOffset, "left")
    }

    return {
        walk,
        dir,
        step,
        position,
    }
}
