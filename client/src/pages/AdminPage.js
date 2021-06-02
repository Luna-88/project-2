import { useState, useEffect } from 'react'
import { getGaiaGun, getPuzzle, getCartridge, getSpaceshipPiece } from '../components/ItemIcon'
// import { deleteRecord } from '../models/adminActions'

function deleteRecord(record) {
    switch (record.isAdmin) {
        case undefined: // delete game record
            console.log('0: Games Record ', record.isAdmin)
            console.log(record)
            return ('Deleted game record: ' + record._id)
        case false: // delete user record
            console.log('1: User Record ', record.isAdmin)
            return (record.username + ' user record was deleted')
        case true: // admin user flag
            console.log('2: User Record', record.isAdmin)
            return (record.username + ' is an administrator and cannot be deleted')
        default:
            return null
    }
}

export default function Admin() {
    let [serverResponse, setServerResponse] = useState()
    const [userRows, setUserRows] = useState([])
    const [gameRows, setGameRows] = useState([])
    const [message, setMessage] = useState()

    const getUsers = async () => {
        let response = await fetch('/api/admin/user-database')
        let data = await response.json()
        setUserRows(data)
    }

    const getGames = async () => {
        let response = await fetch('/api/admin/game-database')
        let data = await response.json()
        setGameRows(data)
    }

    const handleDeleteUserOnClick = async (record) => {
        let userId = { userId: record._id }

        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify(userId),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            let userResponse = await fetch('/api/admin/delete-user', requestOptions)

            if (userResponse.status !== 200) {
                let errorMessage = await userResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (userResponse.status === 200) {
                let serverMessage = await userResponse.text()
                setServerResponse(serverMessage)
                getUsers()
            } else {
                setServerResponse(undefined)
            }
        } catch (error) {
            console.error('Failed to reach the server')
        }
    }

    const handleDeleteGameOnClick = async (record) => {
        let gameId = { gameId: record._id }

        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify(gameId),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            let userResponse = await fetch('/api/admin/delete-game', requestOptions)

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
        getUsers()
        getGames()
    }, [])

    return (
        <div>
            <br />
            <div className="superhero-table">
                <table>
                    <tbody>
                        <tr>
                            <th>Player</th>
                            <th>Player ID</th>
                        </tr>
                        {userRows.map((row) => {
                            return (
                                <tr key={row._id}>
                                    <td>{row.username}</td>
                                    <td>{row._id.slice(row._id.length - 4, row._id.length)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUserOnClick(row)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => setMessage(deleteRecord(row))}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <br />
            <div className="superhero-table">
                <table>
                    <tbody>
                        <tr>
                            <th>Player</th>
                            <th>Game ID</th>
                            <th>Gaia Gun</th>
                            <th>Puzzles</th>
                            <th>Cartridge</th>
                            <th>Spaceship</th>
                        </tr>
                        {gameRows.map((row) => {
                            return (
                                <tr key={row._id}>
                                    <td>{row.username}</td>
                                    <td>{row._id.slice(row._id.length - 4, row._id.length)}</td>
                                    <td>{getGaiaGun(row.inventory.gaiaGun)}</td>
                                    <td>{getPuzzle((row.puzzles[0]), 0)}{getPuzzle((row.puzzles[1]), 1)}{getPuzzle((row.puzzles[2]), 2)}{getPuzzle((row.puzzles[3]), 3)}</td>
                                    <td>{getCartridge((row.inventory.cartridge[0]), 0)}{getCartridge((row.inventory.cartridge[1]), 1)}{getCartridge((row.inventory.cartridge[2]), 2)}{getCartridge((row.inventory.cartridge[3]), 3)}</td>
                                    <td>{getSpaceshipPiece((row.inventory.spaceshipPieces[0]), 0)}{getSpaceshipPiece((row.inventory.spaceshipPieces[1]), 1)}{getSpaceshipPiece((row.inventory.spaceshipPieces[2]), 2)}{getSpaceshipPiece((row.inventory.spaceshipPieces[3]), 3)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteGameOnClick(row)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                        // onClick={() => setMessage(handleDeleteGameOnClick(row))}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <br />
            <div className="superhero-table">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {message}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {serverResponse}
        </div>
    )
}