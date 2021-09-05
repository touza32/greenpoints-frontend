import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

// screens
import LoginScreen from '../screens/LoginScreen';
import Seleccion_de_rol from '../screens/Seleccion_de_rol';
import Confirma_registro from '../screens/Confirma_registro';
import AdminMenuScreen from '../screens/AdminMenuScreen';
import RegistroSocioReciclador from '../screens/RegistroSocioReciclador';
import RegistroPuntoReciclaje from '../screens/RegistroPuntoReciclaje';
import ConfirmarDireccion from '../screens/ConfirmarDireccion';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { status } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>

      {
        (status !== 'authenticated')
          ? (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Seleccion_de_rol" component={Seleccion_de_rol} />
              <Stack.Screen name="Confirma_registro" component={Confirma_registro} />
              <Stack.Screen name="RegistroSocioReciclador" component={RegistroSocioReciclador} options={{ title: "" }} />
              <Stack.Screen name="RegistroPuntoReciclaje" component={RegistroPuntoReciclaje} options={{ title: "" }} />
              <Stack.Screen name="ConfirmarDireccion" component={ConfirmarDireccion} options={{ title: "CONFIRMAR DIRECCIÓN", headerTitleStyle: {color: "#69A03A", fontWeight: 'bold'}}} />
            </>
          )
          : (
            <Stack.Screen name="Menu de Administrador" component={AdminMenuScreen} />
          )
      }

    </Stack.Navigator>
  );
}