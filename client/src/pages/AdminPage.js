import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import handleClickWithFetch from '../models/handleClickWithFetch'

export default function Admin() {
    // let [serverResponse, setServerResponse] = useState()
    const [rows, setRows] = useState([])
    const history = useHistory()

    useEffect(() => {
        const getUsers = async () => {
            // fetch uses the "proxy" value set in client/package.json
            let response = await fetch('/api/admin')
            let data = await response.json()
            setRows(data)
        }
        getUsers()
    }, [])

    return (
        <div className="superhero-table">
            <table>
                <tbody>
                    <tr><th>Player</th><th>Password</th><th>Admin</th></tr>
                    {rows.map((row) => {
                        return (
                            <tr key={row._id} onClick={() => { history.push('/superhero/' + row._id) }}>
                                <td>{row.username}</td>
                                <td>{row.password}</td>
                                <td>{row.isAdmin}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}



//         <div className='admin-container'>
//             <button
//                 onClick={() => handleClickWithFetch(
//                     setServerResponse,
//                     'POST',
//                     '/api/admin/add-user')}
//             >Add User</button>
//             <button
//                 onClick={() => handleClickWithFetch(
//                     setServerResponse,
//                     'DELETE',
//                     '/api/admin/delete-user')}
//             >Delete User</button>
//             <button
//                 onClick={() => handleClickWithFetch(
//                     setServerResponse,
//                     'PUT',
//                     '/api/admin/modify-user')}
//             >Modify User</button>
//             {serverResponse && <div>{serverResponse}</div>}
//         </div>
//     )
// }