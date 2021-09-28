import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { PermissionContext } from '../context/PermissionContext';

// screens
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import Seleccion_de_rol from '../screens/Seleccion_de_rol';
import Confirmacion from '../screens/Confirmacion';
import AdminMenuScreen from '../screens/AdminMenuScreen';
import PuntoMenuScreen from '../screens/PuntoMenuScreen';
import SocioMenuScreen from '../screens/SocioMenuScreen';
import RegistroSocioReciclador from '../screens/RegistroSocioReciclador';
import RegistroPuntoReciclaje from '../screens/RegistroPuntoReciclaje';
import ConfirmarDireccion from '../screens/ConfirmarDireccion';
import RegistroTipoMaterial from '../screens/RegistroTipoMaterial';
import RegistrarIntercambio from '../screens/RegistrarIntercambio';
import MisIntercambios from '../screens/MisIntercambios';
import DetalleDeIntercambio from '../screens/DetalleDeIntercambio';

import MenuHamburguesaSocio from '../screens/MenuHamburguesaSocio';
import MenuHamburguesaPunto from '../screens/MenuHamburguesaPunto';

import styleText from '../styles/Text';

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
              <Stack.Screen name="Seleccion_de_rol" component={Seleccion_de_rol} options={{ title: "", headerTitleStyle: { color: "#69A03A", fontWeight: 'bold' } }} />
              <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ title: "" }} />
              <Stack.Screen name="RegistroSocioReciclador" component={RegistroSocioReciclador} options={{ title: "REGISTRO", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="RegistroPuntoReciclaje" component={RegistroPuntoReciclaje} options={{ title: "REGISTRO", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="ConfirmarDireccion" component={ConfirmarDireccion} options={{ title: "CONFIRMAR UBICACIÓN", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="RegistroTipoMaterial" component={RegistroTipoMaterial} options={{ title: "SELECCIONAR MATERIALES", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              
              
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
                  <Stack.Screen name="PuntoMenuScreen" component={PuntoMenuScreen} options={{ title: "" }, { headerShown: false }}/>
                  <Stack.Screen name="RegistrarIntercambio" component={RegistrarIntercambio} options={{ headerShown: false }}/>
                  <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ title: "" }} />
                  <Stack.Screen name="MenuHamburguesaPunto" component={MenuHamburguesaPunto} options={{ title: "" }, { headerShown: false }} />
                </>
              )
              : (rol === 1)
              ? (
                <>
                  <Stack.Screen name="SocioMenuScreen" component={SocioMenuScreen} options={{ title: "" }, { headerShown: false }}/>
                  <Stack.Screen name="MisIntercambios" component={MisIntercambios} options={{ title: "MIS INTERCAMBIOS", headerTitleStyle: { color: "#69A03A", fontWeight: 'bold' } }} />
                  <Stack.Screen name="DetalleDeIntercambio" component={DetalleDeIntercambio} />
                  <Stack.Screen name="MenuHamburguesaSocio" component={MenuHamburguesaSocio} options={{ title: "" }, { headerShown: false }} />
                </>
              )
              : <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      }

    </Stack.Navigator>
  );
}