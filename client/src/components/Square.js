import useWorldOffset from '../hooks/useWorldOffset'
import * as constants from '../models/constants'


export default function Square(sprites) {
    const { topOffset, leftOffset } = useWorldOffset()

    // const sprite = document.getElementById('sprite')
    // const rect = blue.getBoundingClientRect()

    // let spriteX = Math.ceil(rect.left)
    // let spriteY = Math.ceil(rect.top)

    // function getMultiplier(spriteX, spriteY) {
    //     return {
    //         mX: (spriteX-leftOffset)/constants.spriteSize.width,
    //         mY: (spriteY-topOffset)/constants.spriteSize.height
    //     }
    // }

    function obstaclePosition(mX, mY) {
        return {
            positionX: leftOffset + mX * constants.spriteSize.width,
            positionY: topOffset + mY * constants.spriteSize.height
        }
    }

    const obstaclePos = obstaclePosition(0, 0)

    // const obstaclePos = obstaclePosition(getMultiplier(spriteX, spriteY).mX, getMultiplier(spriteX, spriteY).mY)
    return (
        <div id='square'
            className='square'
            style={{
                position: 'relative',
                boxSizing: 'border-box',
                border: '1px solid black',
                height: '32px',
                width: '32px',
                top: obstaclePos.positionY,
                left: obstaclePos.positionX,
            }} />
    )
}
