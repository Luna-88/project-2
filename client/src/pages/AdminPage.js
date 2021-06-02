import { useState, useEffect } from 'react'
import { getGaiaGun, getPuzzle, getCartridge, getSpaceshipPiece } from '../components/ItemIcon'
// import { deleteRecord } from '../models/adminActions'


import handleClickWithFetch from '../models/handleClickWithFetch'


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

    function deleteOnClick() {

        function noOnClick() {
            document.getElementById('confirm-delete').style.display = 'none'
        }

        return (
            <div
                id='confirm-delete'
                style={{ textAlign: 'center', display: 'block' }}
            >
                Are you sure?<br />
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
        const getUsers = async () => {
            // fetch uses the "proxy" value set in client/package.json
            let response = await fetch('/api/admin/users')
            let data = await response.json()
            setUserRows(data)
        }
        getUsers()
    }, [])

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
            <br />
            <div className="superhero-table">
                <table>
                    <tbody>
                        <tr><th>Player</th></tr>
                        {userRows.map((row) => {
                            return (
                                <tr key={row._id}>
                                    <td>{row.username}</td>
                                    <td>
                                        <button
                                            onClick={() => setMessage(deleteRecord(row))}
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
    )
}


        // <div className='admin-container'>
        //     <button
        //         onClick={() => handleClickWithFetch(
        //             setServerResponse,
        //             'POST',
        //             '/api/admin/add-user')}
        //     >Add User</button>
        //     <button
        //         onClick={() => handleClickWithFetch(
        //             setServerResponse,
        //             'DELETE',
        //             '/api/admin/delete-user')}
        //     >Delete User</button>
        //     <button
        //         onClick={() => handleClickWithFetch(
        //             setServerResponse,
        //             'PUT',
        //             '/api/admin/modify-user')}
        //     >Modify User</button>
        //     {serverResponse && <div>{serverResponse}</div>}
        // </div>

        // <div className="superhero-table">
        //     <table>
        //         <tbody>
        //             <tr><th>Player</th><th>Password</th><th>Admin</th></tr>
        //             {rows.map((row) => {
        //                 return (
        //                     <tr key={row._id} onClick={() => { history.push('/superhero/' + row._id) }}>
        //                         <td>{row.username}</td>
        //                         <td>{row.password}</td>
        //                         <td>{row.isAdmin}</td>
        //                     </tr>
        //                 )
        //             })}
        //         </tbody>
        //     </table>
        // </div>