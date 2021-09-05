import React, { createContext, useReducer } from "react";
import { authReducer } from './authReducer';
import greenPointsApi from '../api/greenPointsApi';

const authInicialState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    
    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    const signIn = async(user, password) => {
        try {
            const { data } = await greenPointsApi.post('/usuario/login', { user, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.n
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    const signUp = () => {};
    const logOut = () => {};
    const removeError = () => {};

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    );
}
