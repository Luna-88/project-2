import { useState, useEffect } from 'react'
import { getGaiaGun, getPuzzle, getCartridge, getSpaceshipPiece, getHardDrivePiece } from '../components/ItemIcon'
import { deleteRecord } from '../models/adminActions'

// import { useHistory } from 'react-router'
// import handleClickWithFetch from '../models/handleClickWithFetch'

function ExpireMessage(props) {
    const [isVisible, setIsVisible] = useState(true);
    const [children, setChildren] = useState(props.children)

    useEffect(() => {
        setChildren(props.children)
        setIsVisible(true)
        setTimer(props.delay);
    }, [props.children]);


    const setTimer = (delay) => {
        setTimeout(() => setIsVisible(false), delay);
    }

    return (
        isVisible
            ? <div>{children}</div>
            : <span />
    )
}

export default function Admin() {
    // let [serverResponse, setServerResponse] = useState()
    const [userRows, setUserRows] = useState([])
    const [gameRows, setGameRows] = useState([])
    const [message, setMessage] = useState([])
    const [key, setKey] = useState(0);

    let onClick = () => {
        setKey(key + 1);
    }

    // const history = useHistory()

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
                            <th>Hard Drive</th>
                        </tr>
                        {gameRows.map((row) => {

                            return (
                                <tr key={row._id}>
                                    <td>{row.username}</td>
                                    <td>{getGaiaGun(row.inventory.gaiaGun)}</td>
                                    <td>{getPuzzle((row.puzzles[0]), 0)}{getPuzzle((row.puzzles[1]), 1)}{getPuzzle((row.puzzles[2]), 2)}{getPuzzle((row.puzzles[3]), 3)}</td>
                                    <td>{getCartridge((row.inventory.cartridge[0]), 0)}{getCartridge((row.inventory.cartridge[1]), 1)}{getCartridge((row.inventory.cartridge[2]), 2)}{getCartridge((row.inventory.cartridge[3]), 3)}</td>
                                    <td>{getSpaceshipPiece((row.inventory.spaceshipPieces[0]), 0)}{getSpaceshipPiece((row.inventory.spaceshipPieces[1]), 1)}{getSpaceshipPiece((row.inventory.spaceshipPieces[2]), 2)}{getSpaceshipPiece((row.inventory.spaceshipPieces[3]), 3)}</td>
                                    <td>{getHardDrivePiece((row.inventory.hardDrivePieces[0]), 0)}{getHardDrivePiece((row.inventory.hardDrivePieces[1]), 1)}{getHardDrivePiece((row.inventory.hardDrivePieces[2]), 2)}{getHardDrivePiece((row.inventory.hardDrivePieces[3]), 3)}</td>
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
                            <td><ExpireMessage delay="5000" key={key}>
                                {message}
                            </ExpireMessage></td>
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