import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

// screens
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import Seleccion_de_rol from '../screens/Seleccion_de_rol';
import Confirmacion from '../screens/Confirmacion';
import AdminMenuScreen from '../screens/AdminMenuScreen';
import PuntoMenuScreen from '../screens/PuntoMenuScreen';
import RegistroSocioReciclador from '../screens/RegistroSocioReciclador';
import RegistroPuntoReciclaje from '../screens/RegistroPuntoReciclaje';
import ConfirmarDireccion from '../screens/ConfirmarDireccion';
import RegistroTipoMaterial from '../screens/RegistroTipoMaterial';
import RegistrarIntercambio from '../screens/RegistrarIntercambio';
import { PermissionContext } from '../context/PermissionContext';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { permissions } = useContext( PermissionContext );
  const { status, rol } = useContext(AuthContext);

  if (status === 'checking' || permissions === 'unavailable') return <LoadingScreen />
  
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>

      {
        (status !== 'authenticated')
          ? (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Seleccion_de_rol" component={Seleccion_de_rol} options={{ title: "" }} />
              <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ title: "" }} />
              <Stack.Screen name="RegistroSocioReciclador" component={RegistroSocioReciclador} options={{ title: "" }} />
              <Stack.Screen name="RegistroPuntoReciclaje" component={RegistroPuntoReciclaje} options={{ title: "" }} />
              <Stack.Screen name="ConfirmarDireccion" component={ConfirmarDireccion} options={{ title: "CONFIRMAR UBICACIÓN", headerTitleStyle: { color: "#69A03A", fontWeight: 'bold' } }} />
              <Stack.Screen name="RegistroTipoMaterial" component={RegistroTipoMaterial} options={{ title: "SELECCIONAR TIPO DE MATERIALES", headerTitleStyle: { color: "#69A03A", fontWeight: 'bold' } }} />
            </>
          )
          : (rol === 3)
            ? (
              <>
                <Stack.Screen name="AdminMenuScreen" component={AdminMenuScreen} />
              </>
            )
            : (rol === 2)
              ? (
                <>
                  <Stack.Screen name="PuntoMenuScreen" component={PuntoMenuScreen} />
                  <Stack.Screen name="RegistrarIntercambio" component={RegistrarIntercambio} />
                </>
              )
              : <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      }

    </Stack.Navigator>
  );
}