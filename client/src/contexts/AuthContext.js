import React, {useContext, useState, useEffect} from 'react'

import {useMutation, useLazyQuery} from '@apollo/client'
import {CREATE_USER_MUTATION} from '../graphql/mutations'
import { LOGIN, GET_USER } from '../graphql/queries'
import { useNavigate } from 'react-router'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const [loginUser] = useLazyQuery(LOGIN);
    const [getUser] = useLazyQuery(GET_USER);
    const [currentUser, setCurrentUser] = useState()

    const navigate = useNavigate();
    
    useEffect(()=>{

    }, [currentUser])

    // ---------------------------Signup a new user-------------------------------
    async function signup(email, password, name){
        const res = await createUser({
            variables: {
                email,
                password,
                name
            }
        });
        await localStorage.setItem('token', res.data.createUser.token)
        console.log('loginUser res: ', res.data)
        navigate('/home');
    }
    
    // ---------------------------Login a user-------------------------------------
    async function login(email, password){
        try {
            const res = await loginUser({variables: {email, password}});
            await localStorage.setItem('token', res.data.login.token)
            navigate('/home');
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }
    
    // ---------------------------Logout a user-------------------------------------
    async function logout(){
        await localStorage.removeItem('token')
        await setCurrentUser(null);
        navigate('/login', {replace: true})
    }
    
    // ---------------------------Check if user logged in---------------------------
    async function checkAuth(){
        try {
            if(!currentUser){const res = await getUser();
            await setCurrentUser(prevState=>res.data.get_user)}
        } catch (error) {
            console.log(error)
        }
    }
    
    // ---------------------------Export--------------------------------------------
    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        logout,
        checkAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

