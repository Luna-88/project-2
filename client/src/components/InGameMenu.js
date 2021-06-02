import { useState, useContext } from 'react'
import Sound from 'react-sound'

import { getPuzzle, getSpaceshipPiece } from './ItemIcon'
import handleClickWithFetch from '../models/handleClickWithFetch'
import useGameMenu from '../hooks/useGameMenu'
import AmbientMusic from '../assets/audio/ambient-music.mp3'
import { useHistory } from 'react-router'

// import UserContext from '../contexts/user/UserContext'

export default function InGameMenu() {
    // const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    const [isPlaying, setIsPlaying] = useState(false)

    const { serverResponse, setServerResponse, inventoryItem } = useGameMenu()

    let history = useHistory()

    const handleExitOnClick = async () => {
        try {
            let serverResponse = await fetch('/api/in-game-menu/exit-game')
            if (serverResponse.status !== 200) {
                let errorMessage = await serverResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (serverResponse.status === 200) {
                let serverMessage = await serverResponse.text()
                setServerResponse(serverMessage)
                history.push('/')
            }
            else {
                setServerResponse(undefined)
            }
        }
        catch (error) {
            console.error("Failed to reach the server")
        }
    }

    return (
        <div className="in-menu-container">
            <div class="dropdown">
                <button class="menu-button">Inventory</button>
                {inventoryItem && (
                    <div class="dropdown-content">
                        <div>
                            Puzzles:
                            {getPuzzle(inventoryItem.puzzles[0])}
                            {getPuzzle(inventoryItem.puzzles[1])}
                            {getPuzzle(inventoryItem.puzzles[2])}
                            {getPuzzle(inventoryItem.puzzles[3])}
                        </div>
                        <div>
                            Spaceship Pieces:
                            {getSpaceshipPiece(
                            inventoryItem.spaceshipPieces[0]
                        )}
                            {getSpaceshipPiece(
                                inventoryItem.spaceshipPieces[1]
                            )}
                            {getSpaceshipPiece(
                                inventoryItem.spaceshipPieces[2]
                            )}
                            {getSpaceshipPiece(
                                inventoryItem.spaceshipPieces[3]
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <button
                    class="menu-button"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {!isPlaying ? 'Play Music' : 'Stop Music'}
                </button>
                <Sound
                    url={AmbientMusic}
                    playStatus={
                        isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
                    }
                    autoLoad={true}
                    loop={true}
                    volume={10}
                />
            </div>
            <button
                class="menu-button"
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/save-game'
                    )
                }
            >
                Save Game
            </button>
            <button
                class="menu-button"
                onClick={() => handleExitOnClick()}
            >
                Exit Game
            </button>
            {serverResponse && <div className="server-response alert">{serverResponse}</div>}
        </div>
    )
}
