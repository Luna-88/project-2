import { useEffect, useState } from "react"

import useKeyPress from "../hooks/useKeyPress"
import useWalk from '../hooks/useWalk'

export default function Dialogue() {
    const [dialogue, setDialogue] = useState()
    const { dir, step, walk, position, index } = useWalk(3)

    useKeyPress((e) => {
        let arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

        if (arrowKeys.includes(e.key)) {
            walk(e.key.replace('Arrow', '').toLowerCase())
            e.preventDefault()
        }
    })

    const getDialogue = async (dialogue) => {
        let response = await fetch('/api/in-game-menu/dialogue/' + dialogue)
        let data = await response.json()
        setDialogue(data)
    }

    if (index === 201) {
        getDialogue('solar')
    }

    if (index === 368) {
        getDialogue('wind')
    }

    useEffect(() => {
        getDialogue()
    }, [])

    return (
        <section className="dialog-box game-child item-2">
            <div>{dialogue}</div>
        </section>
    )
}