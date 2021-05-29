import { useEffect, useState } from 'react'

export default function useSpriteOffset() {
    // const initWidth = document.documentElement.clientWidth / 2
    // const initHeight = document.documentElement.clientHeight / 2
    const [spriteTopOffset, setSpriteTopOffset] = useState(0)
    const [spriteLeftOffset, setSpriteLeftOffset] = useState(0)

    useEffect(() => {
        const sprite = document.getElementById('sprite')
        function updateOffset() {
            setSpriteTopOffset(sprite.offsetTop)
            setSpriteLeftOffset(sprite.offsetLeft)
        }
        window.addEventListener('keydown', updateOffset)
        return () => window.removeEventListener('keydown', updateOffset)
    }, [])
    return { spriteTopOffset, spriteLeftOffset }
}