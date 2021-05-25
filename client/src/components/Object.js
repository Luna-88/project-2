import useWindowSize from "../hooks/useWindowSize"

export default function SolarPanel({ image, offsetTop, offsetLeft }) {
    const { height, width } = useWindowSize()

    let positionTop = height - offsetTop
    let positionLeft = width - offsetLeft

    return (
        <div className='solar-panel' id='solar-panel'
            style={{
                position: 'absolute',
                top: positionTop,
                left: positionLeft,
                height: `100px`,
                width: `100px`,
                backgroundImage: `url(${image})`,
                backgroundSize: '100% 100%',
            }}
        />
    )
}