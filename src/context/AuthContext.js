import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from './authReducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
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

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');

        if (!token) return dispatch({ type: 'notAuthenticated' });

        dispatch({
            type: 'signUp',
            payload: {
                token: token,
                user: user
            }
        });
    };

    const signIn = async(user, password) => {
        try {
            const { data } = await greenPointsApi.post('/usuario/login', { user, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                } 
            });

            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', data.user);
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'addError',
                payload: 'Usuario o contraseña invalidos'
            })
        }
    };

    const signUp = () => {};

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');

        dispatch({ type: 'logout' });
    };
    
    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

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
