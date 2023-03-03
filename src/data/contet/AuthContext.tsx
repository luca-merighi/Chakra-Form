import {createContext, useEffect, useState} from 'react'
import {auth} from '../../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updateProfile, UserInfo } from 'firebase/auth'
import route from 'next/router'
import Cookies from 'js-cookie'

import User from '@/model/User'

interface AuthContextProps {
    user?: User,
    login?: (email: string, password: string) => Promise<void>,
    register?: (email: string, name: string, password: string) => Promise<void>,
    editUsername?: (username: string) => Promise<void>,
    editUserEmail?: (email: string) => Promise<void>,
    logout?: () => Promise<void>
}

interface AuthProviderProps {
    children: any
}

const AuthContext = createContext<AuthContextProps>({})

async function normalUser(firebaseUser): Promise<User> {
    const token = await firebaseUser.getIdToken()
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        password: firebaseUser.password,
        token,
        provider: firebaseUser.providerData[0].providerId,
    }
}

function manageCookie(loggedIn: boolean) {
    if(loggedIn) {
        Cookies.set('chakra-auth', loggedIn, {
            expires: 7
        })
    } else {
        Cookies.remove('chakra-auth')
    }
}

export function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useState<User>(null)
    
    async function configSession(firebaseUser) {
        if(firebaseUser?.email) {
            const user = await normalUser(firebaseUser)
            setUser(user)
            manageCookie(true)
            return user.email
        } else {
            setUser(null)
            manageCookie(false)
            return false
        }
    }
    
    async function login(email, password) {
        try {
            const resp = await signInWithEmailAndPassword(auth, email, password)
            await configSession(resp.user)
            route.push('/UserProfile')
        } finally {
            return
        }
    }

    async function register(email, password) {
        try {
            const resp = await createUserWithEmailAndPassword(auth, email, password)
            await configSession(resp.user)
            route.push('/UserProfile')
        } finally {
            return
        }
    }

    async function editUsername(username) {
        try {
            updateProfile(auth.currentUser, {displayName: username})
        } finally {
            location.reload()
        }
    }

    async function editUserEmail(email) {
        try {
            updateEmail(auth.currentUser, email)
        } finally {
            location.reload()
        }
    }
    
    async function logout() {
        try {
            await signOut(auth)
            await (configSession(null))
            route.push('/Authentication')
        } finally {
            return
        }
    }

    useEffect(() => {
        if(Cookies.get('chakra-auth')) {
            const cancel = auth.onIdTokenChanged(configSession)
            return () => cancel()
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            editUsername,
            editUserEmail,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext