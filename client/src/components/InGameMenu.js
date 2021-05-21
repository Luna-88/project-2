import { useState } from 'react'

import handleClickWithFetch from '../models/handleClickWithFetch'

export default function InGameMenu() {
    let [serverResponse, setServerResponse] = useState()

    return (
        <div className='in-menu-container'>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/in-game-menu/inventory')}
            >Inventory</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/in-game-menu/tooltips')}
            >Tooltips</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/in-game-menu/options')}
            >Options</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/in-game-menu/save-game')}
            >Save Game</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/in-game-menu/exit-game')}
            >Exit Game</button>
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    )
}