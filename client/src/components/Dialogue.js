import { useEffect, useState } from 'react'

import useKeyPress from '../hooks/useKeyPress'
import useWalk from '../hooks/useWalk'

import wallaceBlink from '../assets/images/objects/wallace/wallace-blink.gif'

export default function Dialogue() {
    const [dialogue, setDialogue] = useState()
    const { dir, step, walk, position, index, offsetIndex } = useWalk(3)

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

    const getInventory = async (energy) => {
        let response = await fetch('/api/in-game-menu/inventory/' + energy)
        let data = await response.json()
    }


    if (index === 201 || offsetIndex === 201) {
        getDialogue('solar')
        getInventory('solar')
    }
    
    if (index === 39 || index === 38 || offsetIndex === 39 || offsetIndex === 38) {
    // if (index === 78 || offsetIndex === 78) {
        getDialogue('winning')
        getInventory('winning')
    }

    if (index === 29 || offsetIndex === 29) {
        getDialogue('wind')
        getInventory('wind')
    }

    useEffect(() => {
        getDialogue('instructions')
        return() => getDialogue('')
    }, [])

    return (
        <div className="game-child item-2 dialog-container">
            <div className="dialog-overlay">
                <img src={wallaceBlink} width="200" height="200"></img>
            </div>
            <div>
                <section className="dialog-box">
                    <div className="dialog-padding">{dialogue}</div>
                </section>
            </div>
        </div>
    )
}
