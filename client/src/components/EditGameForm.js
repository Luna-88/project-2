import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

export default function EditUserForm() {
    let gameId = useParams().gameId

    const [serverResponse, setServerResponse] = useState()

    const [currentSolar, setCurrentSolar] = useState()
    const [currentWind, setCurrentWind] = useState()
    const [currentPiece1, setCurrentPiece1] = useState()
    const [currentPiece2, setCurrentPiece2] = useState()

    const [updatedSolar, setUpdatedSolar] = useState(currentSolar)
    const [updatedWind, setUpdatedWind] = useState(currentWind)
    const [updatedPiece1, setUpdatedPiece1] = useState(currentPiece1)
    const [updatedPiece2, setUpdatedPiece2] = useState(currentPiece2)

    let history = useHistory()

    const handleSaveOnClick = async (event) => {
        event.preventDefault()

        const adminForm = {
            _id: gameId,
            solar: updatedSolar,
            wind: updatedWind,
            piece1: updatedPiece1,
            piece2: updatedPiece2,
        }
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(adminForm),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            let userResponse = await fetch('/api/admin/edit/game/save', requestOptions)

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
        const getGames = async () => {
            try {
                let userResponse = await fetch('/api/admin/edit/game/' + gameId)

                if (userResponse.status !== 200) {
                    let errorMessage = await userResponse.text()
                    console.log('We had an error: ', errorMessage)
                    setServerResponse(errorMessage)
                } else if (userResponse.status === 200) {
                    let serverMessage = await userResponse.json()
                    setCurrentSolar(serverMessage[0].inventory.puzzles[0])
                    setCurrentWind(serverMessage[0].inventory.puzzles[1])
                    setCurrentPiece1(serverMessage[0].inventory.spaceshipPieces[0])
                    setCurrentPiece2(serverMessage[0].inventory.spaceshipPieces[1])
                } else {
                    setServerResponse(undefined)
                }
            } catch (error) {
                console.error('Failed to reach the server')
            }
        }
        getGames()
    }, [gameId])

    let userDataInvalid =
        (!updatedSolar ||
            !updatedWind ||
            !updatedPiece1 ||
            !updatedPiece2)

    return (
        <div>
            <form className="form-container">
                <h2>Game ID: {gameId.slice(gameId.length - 4, gameId.length)}</h2><br />
                <h3>Puzzles</h3><br />
                <label htmlFor="solar">Solar:</label>
                <input
                    className="user-input"
                    type="text"
                    id="solar"
                    value={updatedSolar}
                    onChange={(event) => {
                        setUpdatedSolar(event.target.value)
                    }}
                    placeholder={`${currentSolar}`}
                />
                <label htmlFor="wind">Wind:</label>
                <input
                    className="user-input"
                    type="text"
                    id="wind"
                    value={updatedWind}
                    onChange={(event) => {
                        setUpdatedWind(event.target.value)
                    }}
                    placeholder={`${currentWind}`}
                />
                <h3>Spaceship Pieces</h3><br />
                <label htmlFor="piece1">Piece 1:</label>
                <input
                    className="user-input"
                    type="text"
                    id="piece1"
                    value={updatedPiece1}
                    onChange={(event) => {
                        setUpdatedPiece1(event.target.value)
                    }}
                    placeholder={`${currentPiece1}`}
                />
                <label htmlFor="piece2">Piece 2:</label>
                <input
                    className="user-input"
                    type="text"
                    id="piece2"
                    value={updatedPiece2}
                    onChange={(event) => {
                        setUpdatedPiece2(event.target.value)
                    }}
                    placeholder={`${currentPiece2}`}
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