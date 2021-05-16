import { useState } from 'react'

export default function UserForm({ api }) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    let [serverResponse, setServerResponse] = useState()

    async function handleClick(event) {
        event.preventDefault()
        const userRegistration = { username, password }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(userRegistration),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let userResponse = await fetch(api, requestOptions)
            if (userResponse.status !== 200) {
                let errorMessage = await userResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (userResponse.status === 200) {
                let serverMessage = await userResponse.text()
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

    function showPassword() {
        let x = document.getElementById("password")
        if (x.type === "password") {
            x.type = "text"
        } else {
            x.type = "password"
        }
    }

    let userDataInvalid = (!username || !password) || (username.trim().length === 0 || password.length === 0)

    return (
        <div>
            <div className="user-form-container">
                <form className="user-form">
                    <label htmlFor="username">Username:</label>
                    <input
                        className="user-input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                        placeholder="username"
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        className="user-input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        placeholder="password"
                    />
                    <input
                        type="checkbox"
                        id="checkbox"
                        onClick={showPassword}
                    />
                    <label id="show-password" htmlFor="checkbox">Show Password</label>
                    <div className="user-btn-container">
                        <button
                            className="user-btn"
                            disabled={userDataInvalid}
                            onClick={handleClick}
                        >Submit
                        </button> {serverResponse && <div>{serverResponse}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}