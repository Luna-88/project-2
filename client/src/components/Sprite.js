export default function Sprite({ image, data, position, sidekick = false, xOffset, yOffset }) {
    const { y, x, h, w } = data

    let styleTop = position.y
    let styleLeft = position.x

    if (sidekick === true) {
        styleTop = position.y - yOffset
        styleLeft = position.x - xOffset
    }

    return (
        <div className='sprite' id='sprite'
            style={{
                position: 'absolute',
                top: styleTop,
                left: styleLeft,
                height: `${h}px`,
                width: `${w}px`,
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `-${x}px -${y}px`
            }}
        />
    )
}