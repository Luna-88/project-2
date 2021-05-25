import Sprite from './Sprite'

export default function Actor({ sprite, data, position = { x: 0, y: 0 }, step = 0, dir = 0, sidekick, xOffset, yOffset }) {
    const { h, w } = data
    return (
        < Sprite
            image={sprite}
            position = {position}
            data={{
                x: step * w,
                y: dir * h,
                w,
                h,
            }}
            sidekick={sidekick}
            xOffset={xOffset}
            yOffset={yOffset}
        />
    )
}