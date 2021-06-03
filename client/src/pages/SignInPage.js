import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import title from '../assets/images/titles/title-heroside.png'

export default function useHandleUserInformation() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    let [serverResponse, setServerResponse] = useState()

    let history = useHistory()

    async function handleClick(event) {
        event.preventDefault()
        const userRegistration = { username, password }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(userRegistration),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        setUsername('')
        setPassword('')
        try {
            let userResponse = await fetch('/api/sign-in', requestOptions)

            console.log(userResponse)

            if (userResponse.status !== 200) {
                let errorMessage = await userResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (userResponse.status === 200) {
                let serverMessage = await userResponse.text()
                setServerResponse(serverMessage)
                //
                // console.log(setServerResponse)
                // console.log(serverResponse)
                // console.log(serverMessage)
                //
                if (serverResponse === 'Signed in successfully') {
                    console.log('user')
                    history.push('/home-page')
                } else if (serverResponse.isAdmin === true) {
                    console.log('admin')
                    history.push('/admin')
                    //
                } else {
                    setServerResponse(undefined)
                }
            }
        }
        catch (error) {
            console.error('Failed to reach the server')
        }
    }

    function showPassword() {
        let x = document.getElementById('password')
        if (x.type === 'password') {
            x.type = 'text'
        } else {
            x.type = 'password'
        }
    }

    let userDataInvalid =
        !username ||
        !password ||
        username.trim().length === 0 ||
        password.length === 0

    return (
        <div className="fullscreen-container omit-login-image">
            <section className="game-title">
                <img
                    src={title}
                    width={1920 * 0.55}
                    height={1080 * 0.55}
                    alt="img"
                />
            </section>
            <section>
                <div className="form-section">
                    {/* <Form api={api} redirect={redirect} /> */}
                    <div>
                        <form class="form-container">
                            <section class="form-section column-left">
                                <label htmlFor="username">Username:</label>
                                <input
                                    className="user-input"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(event) => {
                                        setUsername(event.target.value)
                                    }}
                                    placeholder="username"
                                />
                            </section>
                            <section class="form-section column-right">
                                <section>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        className="user-input"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                        placeholder="password"
                                    />
                                </section>
                                <section
                                    class="form-label"
                                    id="show-password"
                                    htmlFor="checkbox"
                                >
                                    <input
                                        type="checkbox"
                                        class="form-checkbox"
                                        id="checkbox"
                                        onClick={showPassword}
                                    />
                                        Show Password
                                    </section>
                            </section>
                            <div className="button-container">
                                <button
                                    disabled={userDataInvalid}
                                    onClick={handleClick}
                                >
                                    Submit
                                    </button>{' '}
                                {serverResponse && <div>{serverResponse}</div>}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="form-container">
                    Don't have an account?
                    <a href='/register'>Register</a>
                </div>
            </section>
        </div>
    )
}