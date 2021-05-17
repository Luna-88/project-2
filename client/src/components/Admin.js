import { useState } from 'react'
import handleClickWithFetch from '../models/handleClickWithFetch'

export default function Admin() {
    let [serverResponse, setServerResponse] = useState()

    return (
        <div className="admin-container">
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    "POST",
                    "/api/admin/add-user")}
            >Add User</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    "DELETE",
                    "/api/admin/delete-user")}
            >Delete User</button>
            <button
                onClick={() => handleClickWithFetch(
                    setServerResponse,
                    "PUT",
                    "/api/admin/modify-user")}
            >Modify User</button>
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    )
}