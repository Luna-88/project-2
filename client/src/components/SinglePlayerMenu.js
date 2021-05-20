import { useState } from 'react'
import handleClickWithFetch from '../models/handleClickWithFetch'

export default function HomePage() {
    let [serverResponse, setServerResponse] = useState()

    return (
        <div className='single-player-container'>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'POST',
                    '/api/single-player/new-game')}
            >New Game</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/single-player/load-game')}
            >Load Game</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'DELETE',
                    '/api/single-player/delete-game')}
            >Delete Game</button>
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    )
}