import { useState } from "react"

export default function UserForm({ api }) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

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
        fetch(api, requestOptions)
            .then(response => response.json())
    }

    function showPassword() {
        let x = document.getElementById("password")
        if (x.type === "password") {
            x.type = "text"
        } else {
            x.type = "password"
        }
    }
    return (
        <div>
            <div className="user-form">
                <form>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        className="user-input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                        placeholder="username"
                        required
                    /><br />
                    <label htmlFor="password">Password:</label><br />
                    <input
                        className="user-input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        placeholder="password"
                        required
                    /><br />
                    <input
                        type="checkbox"
                        id="checkbox"
                        onClick={showPassword}
                    />
                    <label id="show-password" htmlFor="checkbox">Show Password</label>
                    <div className="user-button">
                        <button
                            className="user-button-input"
                            onClick={handleClick}
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}