import React, { createContext, useContext, useEffect, useState } from "react"
import axios from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () =>{
        try {
            const response = await axios.get('/authentication/protected')

            if(response.status){
                setIsAuthenticated(true)
            }else{
                setIsAuthenticated(false)
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() =>{
        checkAuth()
    },[])

    const login = async (email, password) =>{
        try {
            const response = await axios.post('/authentication/login', {
                email,
                password
            })
            if(response.status === 200){
                setIsAuthenticated(true)
            }
        } catch (error) {
            setIsAuthenticated(false)
            throw error
        }
    }

    const logout = async () =>{
        try {
            await axios.post(
                '/authentication/logout',
            )
            setIsAuthenticated(false)
        } catch (error) {
            console.error('Logout Failed', error)
        }
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext)
}