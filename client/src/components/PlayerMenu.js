import { useState } from 'react'

import handleClickWithFetch from '../models/handleClickWithFetch'

export default function PlayerMenu({ multiplayer = false }) {
    let [serverResponse, setServerResponse] = useState()

    let multiplayerButton = ''

    if (multiplayer === true) {
        multiplayerButton = <button
            onClick={() => handleClickWithFetch(
                setServerResponse,
                'POST',
                '/api/player/add-player')}
        >Add Player</button>
    }

    return (
        <div className='player-menu-container'>
            {multiplayerButton}
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'POST',
                    '/api/player/new-game')}
            >New Game</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/player/load-game')}
            >Load Game</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'DELETE',
                    '/api/player/delete-game')}
            >Delete Game</button>
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    )
}