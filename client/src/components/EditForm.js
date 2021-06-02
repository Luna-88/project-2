import { useState } from 'react'

export default function EditForm() {
    const [serverResponse, setServerRepsonse] = useState()

    const [username, setUsername] = useState()
    const [isAdmin, setIsAdmin] = useState()

    const [hydroPuzzle, setHydroPuzzle] = useState()
    const [solarPuzzle, setSolarPuzzle] = useState()
    const [windPuzzle, setWindPuzzle] = useState()
    const [thermalPuzzle, setThermalPuzzle] = useState()

    let userDataInvalid =
        !username ||
        !isAdmin ||
        !hydroPuzzle ||
        !solarPuzzle ||
        !windPuzzle ||
        !thermalPuzzle
 
    const handleSaveOnClick = () => {
    }

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
                    <label htmlFor="isAdmin">Administrator Access:</label>
                    <input
                        className="user-input"
                        type="text"
                        id="isAdmin"
                        value={isAdmin}
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                        placeholder="isAdmin"
                    />
                    </section>
                </section>
                <div className="button-container">
                    <button
                        disabled={userDataInvalid}
                        onClick={handleSaveOnClick}
                    >
                        Save
                        </button>
                    {serverResponse && <div>{serverResponse}</div>}
                </div>
            </form>
        </div>
    )
}