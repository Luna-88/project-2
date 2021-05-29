import { useLayoutEffect, useState } from 'react'

export default function useWorldOffset(initTop, initLeft) {  
    const [worldTopOffset, setWorldTopOffset] = useState(initTop)
    const [worldLeftOffset, setWorldLeftOffset] = useState(initLeft)

    useLayoutEffect(() => {
        const world = document.getElementById('heres-your-id-name-duh')
        function updateOffset() {
            setWorldTopOffset(world.offsetTop)
            setWorldLeftOffset(world.offsetLeft)
        }
        window.addEventListener('resize', updateOffset)
        updateOffset()
        return () => window.removeEventListener('resize', useWorldOffset)
    }, [])
    return { worldTopOffset, worldLeftOffset }
}
