
import * as Location from 'expo-location';
import { AppState  } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';


export const permissionInitState = {
    locationStatus: 'unavailable'
}


export const PermissionContext = createContext({});

export const PermissionProvider = ({ children }) => {

    const [ permissions , setPermissions ] = useState( permissionInitState );

    useEffect(() => {
        AppState.addEventListener('change', state => {
            if ( state !== 'active') 
                return;
            checkLocationPermission();
        });
    }, [])

    const askLocationPermission = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        setPermissions({
            ...permissions,
            locationStatus: permission.status
        })
    }

    const checkLocationPermission = async () => {
        let permission = await Location.getForegroundPermissionsAsync();

        setPermissions({
            ...permissions,
            locationStatus: permission.status
        });

        if(permission.status !== 'granted')
            askLocationPermission();
    }

    return(
        <PermissionContext.Provider value={{ 
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            { children }
        </PermissionContext.Provider>
    )
}