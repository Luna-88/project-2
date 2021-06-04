import { useState, useEffect } from 'react'

export default function useGameMenu() {
    let [serverResponse, setServerResponse] = useState()
    let [inventoryItem, setInventoryItem] = useState()

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

    return {
        serverResponse,
        setServerResponse,
        inventoryItem,
    }
}