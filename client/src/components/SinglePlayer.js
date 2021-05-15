import { useState } from "react"

export default function HomePage() {
    let [serverResponse, setServerResponse] = useState()

    async function handleNewGameClick(event) {
        event.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let newGameResponse = await fetch("/api/home-page/single-player/new-game", requestOptions)
            if (newGameResponse.status !== 200) {
                let errorMessage = await newGameResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (newGameResponse.status === 200) {
                let serverMessage = await newGameResponse.text()
                setServerResponse(serverMessage)
            }
            else {
                setServerResponse(undefined)
            }
        }
        catch (error) {
            console.error("Failed to reach the server")
        }
    }

    async function handleLoadGameClick(event) {
        event.preventDefault()
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let loadGameResponse = await fetch("/api/home-page/single-player/load-game", requestOptions)
            if (loadGameResponse.status !== 200) {
                let errorMessage = await loadGameResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (loadGameResponse.status === 200) {
                let serverMessage = await loadGameResponse.text()
                setServerResponse(serverMessage)
            }
            else {
                setServerResponse(undefined)
            }
        }
        catch (error) {
            console.error("Failed to reach the server")
        }
    }

    async function handleDeleteGameClick(event) {
        event.preventDefault()
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let deleteGameResponse = await fetch("/api/home-page/single-player/delete-game", requestOptions)
            if (deleteGameResponse.status !== 200) {
                let errorMessage = await deleteGameResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (deleteGameResponse.status === 200) {
                let serverMessage = await deleteGameResponse.text()
                setServerResponse(serverMessage)
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
        <div className="single-player-container">
            <button
                className="single-player-btn"
                onClick={handleNewGameClick}
            >New Game</button>
            <button
                className="single-player-btn"
                onClick={handleLoadGameClick}
            >Load Game</button>
            <button
                className="single-player-btn"
                onClick={handleDeleteGameClick}
            >Delete Game</button>
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    )
}