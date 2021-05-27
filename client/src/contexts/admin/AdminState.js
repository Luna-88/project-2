import React, { useState } from 'react'
import adminContext from './adminContext'

const AdminState = (props) => {
    const [isAdmin, setIsAdmin] = useState(false)
    // const isAdmin = false

    return (
        // pass in some value object to share it's state
        <adminContext.Provider
            value={{
                isAdmin,
                setIsAdmin,
                // message: 'ADMIN MODE is ON'
            }}>
            {/* this allows all wrapped components to have access to the object */}
            {props.children}
        </adminContext.Provider>
    )
}

export default AdminState