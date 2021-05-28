import React, { useState } from 'react'
import playerContext from './playerContext'

const PlayerState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const isLoggedIn = false

    return (
        // pass in some value object to share it's state
        <playerContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                // message: 'ADMIN MODE is ON'
            }}>
            {/* this allows all wrapped components to have access to the object */}
            {props.children}
        </playerContext.Provider>
    )
}

export default PlayerState