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
                //
                // console.log(serverResponse.isAdmin)
                // console.log(setServerResponse)
                //
                // console.log(serverResponse)
                // console.log(serverMessage)
                //
                // if user "isAdmin" or not

                if (serverMessage === "Signed in successfully" || serverMessage === "Registered successfully!") {
                    // console.log('1 - user path')
                    history.push(redirect)
                } else {
                    // console.log('2 - admin path')
                    history.push('/admin')
                }
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
