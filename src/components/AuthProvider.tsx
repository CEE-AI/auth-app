import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import {User} from '../types/user'
import { getUser, login } from '../Auth'

type AuthContextValue = {
    authToken?: string | null
    currentUser?: User | null
    handleLogin: () => Promise<void>
    handleLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = PropsWithChildren

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [authToken, setAuthToken] = useState<string | null>()
    const [currentUser, setCurrentUser] = useState<User | null>()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser()
                const{authToken, user} = response[1]
                setAuthToken(authToken)
                setCurrentUser(user)
            } catch (error) {
                setAuthToken(null)
                setCurrentUser(null)
            }
        }
        fetchUser();
    }, [])

    const handleLogin = async () =>{
        try {
            const response = await login()

            const{authToken, user} = response[1]
            setAuthToken(authToken)
            setCurrentUser(user)
        } catch (error) {
            setAuthToken(null)
            setCurrentUser(null)
        }
    }

    const handleLogout = async() =>{
        setAuthToken(null)
        setCurrentUser(null)
    }

    return <AuthContext.Provider value={{authToken,currentUser,handleLogin,handleLogout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    const context = useContext(AuthContext)

    if(context === undefined){
        throw new Error('useAuth must be used inside of an AuthProvider')
    }

    return context
}