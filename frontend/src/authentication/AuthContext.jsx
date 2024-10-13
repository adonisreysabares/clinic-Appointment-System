import React, { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) =>{
    const [userData, setUserData] = useState(null)

    const login = (user) => setUserData(user)
    const logout = () => setUserData(null)

    return(
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}