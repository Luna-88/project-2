import { useState, useEffect } from 'react'
import { getPuzzle, getSpaceshipPiece } from '../components/ItemIcon'

import handleClickWithFetch from '../models/handleClickWithFetch'

export default function PlayerMenu() {
    let [serverResponse, setServerResponse] = useState()
    const [gameRows, setGameRows] = useState([])

    const getGames = async () => {
        let response = await fetch('/api/player/select-game')
        let data = await response.json()
        setGameRows(data[0])
    }

    const handleNewGameOnClick = async () => {
        handleClickWithFetch(setServerResponse, 'POST', '/api/player/new-game')
        getGames()
    }

    const handleLoadOnClick = async (record) => {
        let gameId = { gameId: record._id }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(gameId),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            let userResponse = await fetch(
                '/api/player/load-game',
                requestOptions
            )

            if (userResponse.status !== 200) {
                let errorMessage = await userResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (userResponse.status === 200) {
                let serverMessage = await userResponse.text()
                setServerResponse(serverMessage)
                getGames()
            } else {
                setServerResponse(undefined)
            }
        } catch (error) {
            console.error('Failed to reach the server')
        }
    }

    const handleDeleteOnClick = async (record) => {
        let gameId = { gameId: record._id }

        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify(gameId),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            let userResponse = await fetch(
                '/api/player/delete-game',
                requestOptions
            )

            if (userResponse.status !== 200) {
                let errorMessage = await userResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (userResponse.status === 200) {
                let serverMessage = await userResponse.text()
                setServerResponse(serverMessage)
                getGames()
            } else {
                setServerResponse(undefined)
            }
        } catch (error) {
            console.error('Failed to reach the server')
        }
    }

    useEffect(() => {
        getGames()
    }, [])

    return (
        <div className="player-menu-container ">
            <div className="admin-table">
                <table>
                    <tbody>
                        <tr>
                            <th colSpan="6">Your Games</th>
                        </tr>
                        <tr>
                            <th>Game ID</th>
                            <th>Player</th>
                            <th>Puzzles</th>
                            <th>Spaceship</th>
                            <th colSpan="2"></th>
                        </tr>
                        {gameRows.map((row) => {
                            return (
                                <tr key={row._id}>
                                    <td>
                                        {row._id.slice(
                                            row._id.length - 4,
                                            row._id.length
                                        )}
                                    </td>
                                    <td>{row.username}</td>
                                    <td>
                                        {getPuzzle(row.inventory.puzzles[0], 0)}
                                        {getPuzzle(row.inventory.puzzles[1], 1)}
                                    </td>
                                    <td>
                                        {getSpaceshipPiece(
                                            row.inventory.spaceshipPieces[0],
                                            0
                                        )}
                                        {getSpaceshipPiece(
                                            row.inventory.spaceshipPieces[1],
                                            1
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleLoadOnClick(row)
                                            }
                                        >
                                            Load
                                        </button>
                                        <button
                                            className="delete-alert"
                                            onClick={() =>
                                                handleDeleteOnClick(row)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="new-game-container">
                <button onClick={() => handleNewGameOnClick()}>New Game</button>
                <br />
                <a href="/gaia">Explore Gaia</a>
                {serverResponse && (
                    <div className="server-response alert">
                        {serverResponse}
                    </div>
                )}
            </div>
        </div>
    )
}
