import { useEffect, useState } from "react"

export default function Dialogue() {
    const [dialogue, setDialogue] = useState()

    const getDialogue = async () => {
        let response = await fetch('/api/in-game-menu/dialogue')
        let data = await response.json()
        setDialogue(data)
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