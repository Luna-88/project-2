import { useState, useEffect } from 'react'
import { getPuzzle, getSpaceshipPiece } from '../components/ItemIcon'

// import { UserContext } from '../contexts/user/UserContext'
// import { login } from '../models/userLogin'

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
        handleClickWithFetch(
            setServerResponse,
            'POST',
            '/api/player/new-game')
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
            let userResponse = await fetch('/api/player/load-game', requestOptions)

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
            let userResponse = await fetch('/api/player/delete-game', requestOptions)

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
        <div>
            <div className="superhero-table">
                <table>
                    <tbody>
                        <tr>
                            <th>Game ID</th>
                            <th>Player</th>
                            <th>Puzzles</th>
                            <th>Spaceship</th>
                        </tr>
                        {gameRows.map((row) => {
                            return (
                                <tr key={row._id}>
                                    <td>{row._id.slice(row._id.length - 4, row._id.length)}</td>
                                    <td>{row.username}</td>
                                    <td>{getPuzzle((row.puzzles[0]), 0)}{getPuzzle((row.puzzles[1]), 1)}{getPuzzle((row.puzzles[2]), 2)}{getPuzzle((row.puzzles[3]), 3)}</td>
                                    <td>{getSpaceshipPiece((row.inventory.spaceshipPieces[0]), 0)}{getSpaceshipPiece((row.inventory.spaceshipPieces[1]), 1)}{getSpaceshipPiece((row.inventory.spaceshipPieces[2]), 2)}{getSpaceshipPiece((row.inventory.spaceshipPieces[3]), 3)}</td>
                                    <td>
                                        <button onClick={() => handleLoadOnClick(row)}>
                                            Load
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteOnClick(row)}
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


            <div className='player-menu-container'>
                <button
                    onClick={() => handleNewGameOnClick()}//{() => handleClickWithFetch(
                // setServerResponse,
                // 'POST',
                // '/api/player/new-game')}
                >New Game</button>
                {serverResponse && <div>{serverResponse}</div>}
            </div>
        </div>
    )
}