import { useState, useEffect } from 'react'

import handleClickWithFetch from '../models/handleClickWithFetch'

export default function InGameMenu() {
    let [serverResponse, setServerResponse] = useState()
    let [inventoryItem, setInventoryItem] = useState()

    function hasGaiaGun(inventory) {
        if (!inventory) {
            return "❌"
        }
        return "🔫"
    }

    useEffect(() => {
        async function getInventory() {
            let requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            try {
                let serverResponse = await fetch('/api/in-game-menu/inventory', requestOptions)
                if (serverResponse.status !== 200) {
                    let errorMessage = await serverResponse.text()
                    console.log('We had an error: ', errorMessage)
                    setServerResponse(errorMessage)
                } else if (serverResponse.status === 200) {
                    let inventory = await serverResponse.json()
                    setInventoryItem(inventory)
                }
                else {
                    setServerResponse(undefined)
                }
            }
            catch (error) {
                console.error("Failed to reach the server")
            }
        }
        getInventory()
    }, [])

    return (
        <div className='in-menu-container'>
            <div class="dropdown">
                <button>Inventory</button>
                {inventoryItem && <div class="dropdown-content">
                    <div>Gaia Gun: {hasGaiaGun(inventoryItem.gaiaGun)}</div>
                    <div>Cartridges: {inventoryItem.cartridge}</div>
                    <div>Spaceship Pieces: {inventoryItem.spaceshipPieces}</div>
                    <div>Hard Drive Pieces: {inventoryItem.hardDrivePieces}</div>
                </div>}
            </div>

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