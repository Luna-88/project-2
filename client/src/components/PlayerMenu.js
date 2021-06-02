import { useState, useEffect } from 'react'
import { getGaiaGun, getPuzzle, getCartridge, getSpaceshipPiece, getHardDrivePiece } from '../components/ItemIcon'


// import { UserContext } from '../contexts/user/UserContext'
// import { login } from '../models/userLogin'

import handleClickWithFetch from '../models/handleClickWithFetch'

export default function PlayerMenu() {
    let [serverResponse, setServerResponse] = useState()
    const [gameRows, setGameRows] = useState([])
    const [message, setMessage] = useState()

    function deleteOnClick() {
        let display = 'block'
        console.log('Open: ' + display)
        function noOnClick() {
            display = 'none'
            let confirmDelete = document.getElementById('confirm-delete')
            confirmDelete.style.display = display
            console.log('Close: ' + display)
        }

        return (
            <div id='confirm-delete'>Are you sure?
                <button onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'DELETE',
                    '/api/player/delete-game')}
                >Yes</button>
                <button onClick={noOnClick}>No</button>
            </div>
        )
    }

    useEffect(() => {
        const getGames = async () => {
            // fetch uses the "proxy" value set in client/package.json
            let response = await fetch('/api/admin/games')
            let data = await response.json()
            setGameRows(data)
        }
        getGames()
    }, [])

    return (
        <div>
            <div>
                <br />
                <div className="superhero-table">
                    <table>
                        <tbody>
                            <tr>
                                <th>Player</th>
                                <th>Gaia Gun</th>
                                <th>Puzzles</th>
                                <th>Cartridge</th>
                                <th>Spaceship</th>
                            </tr>
                            {gameRows.map((row) => {
                                return (
                                    <tr key={row._id}>
                                        <td>{row.username}</td>
                                        <td><button>{getGaiaGun(row.inventory.gaiaGun)}</button></td>
                                        <td>{getPuzzle((row.puzzles[0]), 0)}{getPuzzle((row.puzzles[1]), 1)}{getPuzzle((row.puzzles[2]), 2)}{getPuzzle((row.puzzles[3]), 3)}</td>
                                        <td>{getCartridge((row.inventory.cartridge[0]), 0)}{getCartridge((row.inventory.cartridge[1]), 1)}{getCartridge((row.inventory.cartridge[2]), 2)}{getCartridge((row.inventory.cartridge[3]), 3)}</td>
                                        <td>{getSpaceshipPiece((row.inventory.spaceshipPieces[0]), 0)}{getSpaceshipPiece((row.inventory.spaceshipPieces[1]), 1)}{getSpaceshipPiece((row.inventory.spaceshipPieces[2]), 2)}{getSpaceshipPiece((row.inventory.spaceshipPieces[3]), 3)}</td>
                                        <td>
                                            <button
                                                onClick={() => setMessage(deleteOnClick(row))}
                                            >
                                                Delete Game
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
            </div>
            <div className='player-menu-container'>
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
                <button
                    onClick={() => handleClickWithFetch(
                        setServerResponse,
                        'GET',
                        '/api/player/load-game')}
                >Load Game</button>
                {serverResponse && <div>{serverResponse}</div>}
            </div>
        </div>
    )

    //----------------------------------------------------

    // let [serverResponse, setServerResponse] = useState()

    // const { user, setUser } = useContext(UserContext)

    return (
        <div className='player-menu-container'>
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
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    'GET',
                    '/api/player/load-game')}
            >Load Game</button>
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    )
}