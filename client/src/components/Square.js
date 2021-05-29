import useWorldOffset from '../hooks/useWorldOffset'

import * as constants from '../models/constants'

import buttonUp from '../assets/images/objects/buttonUp.png'

export default function Square(sprites) {
    const { worldTopOffset, worldLeftOffset } = useWorldOffset()

    function obstaclePosition(mX, mY) {
        return {
            positionX: worldLeftOffset + mX * constants.spriteSize.width,
            positionY: worldTopOffset + mY * constants.spriteSize.height
        }
    }

    const obstaclePos = obstaclePosition(13, 4)

    return (
        <div id='square'
            className='square'
            style={{
                position: 'relative',
                top: obstaclePos.positionY,
                left: obstaclePos.positionX,
                height: '32px',
                width: '32px',
                backgroundImage: `url(${buttonUp})`,
                backgroundSize: '100% 100%',
                boxSizing: 'border-box',
                border: '1px solid black',
            }} />
    )
}
