import { useLayoutEffect, useState } from 'react'

export default function useWorldOffset() {
    const initWidth = document.documentElement.clientWidth / 2
    const initHeight = document.documentElement.clientHeight / 2
    const [topOffset, setTopOffset] = useState(initHeight)
    const [leftOffset, setLeftOffset] = useState(initWidth)

    // console.log(topOffset, 'top')
    // console.log(leftOffset, 'width')

    // const topOffset = world.offsetTop
    // const leftOffset = world.offsetLeft

    useLayoutEffect(() => {
        const world = document.getElementById('heres-your-id-name-duh')
        function updateOffset() {
            setTopOffset(world.offsetTop)
            setLeftOffset(world.offsetLeft)
        }
        window.addEventListener('resize', updateOffset)
        updateOffset()
        return () => window.removeEventListener('resize', useWorldOffset)
    }, [])
    return { topOffset, leftOffset }
}
