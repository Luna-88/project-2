import { useState } from 'react'
import { useHistory } from 'react-router-dom'


export default function useHandleUserInformation(api, redirect) {
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
            let userResponse = await fetch(api, requestOptions)

            if (userResponse.status !== 200) {
                let errorMessage = await userResponse.text()
                console.log('We had an error: ', errorMessage)
                setServerResponse(errorMessage)
            } else if (userResponse.status === 200) {
                let serverMessage = await userResponse.text()
                setServerResponse(serverMessage)
                history.push(redirect)
            } else {
                setServerResponse(undefined)
            }
        } catch (error) {
            console.error('Failed to reach the server')
        }
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        handleClick,
        serverResponse,
    }
}
