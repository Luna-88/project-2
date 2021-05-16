export default async function handleClickWithFetch(setResponse, requestMethod, api) {

    const requestOptions = {
        method: requestMethod,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        let serverResponse = await fetch(api, requestOptions)
        if (serverResponse.status !== 200) {
            let errorMessage = await serverResponse.text()
            console.log('We had an error: ', errorMessage)
            setResponse(errorMessage)
        } else if (serverResponse.status === 200) {
            let serverMessage = await serverResponse.text()
            setResponse(serverMessage)
        }
        else {
            setResponse(undefined)
        }
    }
    catch (error) {
        console.error("Failed to reach the server")
    }
}