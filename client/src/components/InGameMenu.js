import { useState, useEffect } from 'react'

import handleClickWithFetch from '../models/handleClickWithFetch'

export default function InGameMenu() {
    let [serverResponse, setServerResponse] = useState()
    let [inventoryItem, setInventoryItem] = useState()

    function hasItem(item) {
        if (item === false || item.length === 0) {
            return '❌'
        } else if (item === true) {
            return '🔫'
        } else {
            return item
        }
    }

    useEffect(() => {
        async function getInventory() {
            let requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            try {
                let serverResponse = await fetch(
                    '/api/in-game-menu/inventory',
                    requestOptions
                )
                if (serverResponse.status !== 200) {
                    let errorMessage = await serverResponse.text()
                    console.log('We had an error: ', errorMessage)
                    setServerResponse(errorMessage)
                } else if (serverResponse.status === 200) {
                    let inventory = await serverResponse.json()
                    setInventoryItem(inventory)
                } else {
                    setServerResponse(undefined)
                }
            } catch (error) {
                console.error('Failed to reach the server')
            }
        }
        getInventory()
    }, [])

    return (
        <div className="in-menu-container">
            <div class="dropdown">
                <button class="menu-button">Inventory</button>
                {inventoryItem && (
                    <div class="dropdown-content">
                        <div>Gaia Gun: {hasItem(inventoryItem.gaiaGun)}</div>
                        <div>
                            Cartridges: {hasItem(inventoryItem.cartridge)}
                        </div>
                        <div>
                            Spaceship Pieces:{' '}
                            {hasItem(inventoryItem.spaceshipPieces)}
                        </div>
                        <div>
                            Hard Drive Pieces:{' '}
                            {hasItem(inventoryItem.hardDrivePieces)}
                        </div>
                    </div>
                )}
            </div>

            <button
                class="menu-button"
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/tooltips'
                    )
                }
            >
                Tooltips
            </button>
            <button
                class="menu-button"
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/options'
                    )
                }
            >
                Options
            </button>
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
                onClick={() =>
                    handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/in-game-menu/exit-game'
                    )
                }
            >
                Exit Game
            </button>
            <div class="server-response">
                {serverResponse && <div>{serverResponse}</div>}
            </div>
        </div>
    )
}
