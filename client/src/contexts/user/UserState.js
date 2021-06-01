import React, { useState, useMemo } from 'react'
import UserContext from './UserContext'


const UserState = (props) => {
    const [user, setUser] = useState(false)
    // const isLoggedIn = false

    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

    return (
        // pass in some value object to share it's state
        <UserContext.Provider
            value={{
                providerValue
                // user,
                // setUser,
                // message: 'User is logged in'
            }}>
            {/* this allows all wrapped components to have access to the object */}
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState