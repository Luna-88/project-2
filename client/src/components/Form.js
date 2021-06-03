import useHandleUserInformation from "../hooks/useHandleUserInformation"

export default function Form({ api, redirect }) {
    const { username,
        setUsername,
        password,
        setPassword,
        handleClick,
        serverResponse } = useHandleUserInformation(api, redirect)

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
    )
}