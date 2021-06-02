import { useEffect, useState } from "react"

export default function Dialogue() {
    const [dialogue, setDialogue] = useState()

    const getDialogue = async () => {
        let response = await fetch('/api/in-game-menu/dialogue')
        let data = await response.json()
        console.log("dialogue data", data)
    }

    useEffect(() => {
        getDialogue()
    }, [])
    
    return (
        <div className="dialog-box game-child">
            <div>Game dialogue goes here?</div>{' '}
        </div>
    )
}