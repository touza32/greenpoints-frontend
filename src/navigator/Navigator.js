import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

// screens
import LoginScreen from '../screens/LoginScreen';
import Seleccion_de_rol from '../screens/Seleccion_de_rol'
import Confirma_registro from '../screens/Confirma_registro'
import AdminMenuScreen from '../screens/AdminMenuScreen';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { status } = useContext( AuthContext );

  return (
    <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: 'white'}}}>

      {
        (status !== 'authenticated') 
          ? (
            <>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="Seleccion_de_rol" component={Seleccion_de_rol} />
                <Stack.Screen name="Confirma_registro" component={Confirma_registro} />
            </>
          )
          : (
            <Stack.Screen name="Menu de Administrador" component={AdminMenuScreen} />
          )
      }

    </Stack.Navigator>
  );
}