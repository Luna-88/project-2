import { useLayoutEffect, useState } from 'react'

export default function useClientSize() {
    const initWidth = document.documentElement.clientWidth / 2
    const initHeight = document.documentElement.clientHeight / 2

    const [clientHeight, setClientHeight] = useState(initHeight)
    const [clientWidth, setClientWidth] = useState(initWidth)

    useLayoutEffect(() => {
        function updateClientSize() {
            setClientHeight(document.documentElement.clientHeight)
            setClientWidth(document.documentElement.clientWidth)
        }
        window.addEventListener('resize', updateClientSize)
        updateClientSize()
        return () => window.removeEventListener('resize', updateClientSize)
    }, [])
    return { clientHeight, clientWidth }
}