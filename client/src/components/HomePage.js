import { useHistory } from 'react-router-dom'

export default function HomePage() {
    const history = useHistory()

    function handleSinglePlayerClick(event) {
        event.preventDefault()
        history.push("/home-page/single-player")
    }
    function handleMultiplayerClick(event) {
        event.preventDefault()
        history.push("/home-page/multiplayer")
    }

    return (
        <div className="home-page-container">
            <button
                className="single-player-button"
                onClick={handleSinglePlayerClick}
            >Single Player</button>
            <button
                className="multiplayer-button"
                onClick={handleMultiplayerClick}
            >Multiplayer</button>
        </div>
    )
}