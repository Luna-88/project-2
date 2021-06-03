import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

export default function EditUserForm() {
    let userId = useParams().userId

    const [serverResponse, setServerResponse] = useState()

    const [currentUsername, setCurrentUsername] = useState()
    const [currentIsAdmin, setCurrentIsAdmin] = useState()
    const [updatedUsername, setUpdatedUsername] = useState(currentUsername)
    const [updatedIsAdmin, setUpdatedIsAdmin] = useState(currentIsAdmin)

    let history = useHistory()

    const handleSaveOnClick = async (event) => {
        event.preventDefault()

        const adminForm = {
            _id: userId,
            username: updatedUsername,
            isAdmin: updatedIsAdmin
        }
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(adminForm),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            let userResponse = await fetch('/api/admin/edit/user/save', requestOptions)

            if (userResponse.status !== 200) {
                let errorMessage = await userResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (userResponse.status === 200) {
                let serverMessage = await userResponse.text()
                setServerResponse(serverMessage)
                history.push('/admin')
            } else {
                setServerResponse(undefined)
            }
        } catch (error) {
            console.error('Failed to reach the server')
        }
    }



    useEffect(() => {
        const getUser = async () => {
            try {
                let userResponse = await fetch('/api/admin/edit/user/' + userId)

                if (userResponse.status !== 200) {
                    let errorMessage = await userResponse.text()
                    console.log('We had an error: ', errorMessage)
                    setServerResponse(errorMessage)
                } else if (userResponse.status === 200) {
                    let serverMessage = await userResponse.json()
                    setCurrentUsername(serverMessage[0].username)
                    setCurrentIsAdmin(serverMessage[0].isAdmin)
                } else {
                    setServerResponse(undefined)
                }
            } catch (error) {
                console.error('Failed to reach the server')
            }
        }
        getUser()
    }, [userId])

    let userDataInvalid =
        !updatedUsername ||
        !updatedIsAdmin

    return (
        <div>
            <form className="admin-form-container">
            <h2>Player ID: {userId.slice(userId.length - 4, userId.length)}</h2><br />
                <label htmlFor="username">Player:</label>
                <input
                    className="user-input"
                    type="text"
                    id="username"
                    value={updatedUsername}
                    onChange={(event) => {
                        setUpdatedUsername(event.target.value)
                    }}
                    placeholder={`${currentUsername}`}
                />
                <label htmlFor="isAdmin">Administrator Access:</label>
                <input
                    className="user-input"
                    type="text"
                    id="isAdmin"
                    value={updatedIsAdmin}
                    onChange={(event) => {
                        setUpdatedIsAdmin(event.target.value)
                    }}
                    placeholder={`${currentIsAdmin}`}
                />

                <div className="button-container">
                    <button
                        disabled={userDataInvalid}
                        onClick={handleSaveOnClick}
                    >
                        Update
                        </button>
                    {serverResponse && <div>{serverResponse}</div>}
                </div>
            </form>
        </div>
    )
}