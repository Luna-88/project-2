import { useLayoutEffect, useState } from 'react'

export default function useWindowSize() {
    const [height, setHeight] = useState(640)
    const [width, setWidth] = useState(640)

    useLayoutEffect(() => {
        function updateSize() {
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return { height, width }
}
