import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { PermissionContext } from '../context/PermissionContext';

// screens
import LoadingScreen from '../screens/LoadingScreen';
import Confirmacion from '../screens/Confirmacion';

import LoginScreen from '../screens/Login/LoginScreen';

import AdminMenuScreen from '../screens/Menu/AdminMenuScreen';
import PuntoMenuScreen from '../screens/Menu/PuntoMenuScreen';
import SocioMenuScreen from '../screens/Menu/SocioMenuScreen';
import MenuHamburguesaSocio from '../screens/Menu/MenuHamburguesaSocio';
import MenuHamburguesaPunto from '../screens/Menu/MenuHamburguesaPunto';

import SeleccionRol from '../screens/Registro/SeleccionRol';
import RegistroSocioReciclador from '../screens/Registro/RegistroSocioReciclador';
import RegistroPuntoReciclaje from '../screens/Registro/RegistroPuntoReciclaje';
import ConfirmarDireccion from '../screens/Registro/ConfirmarDireccion';
import RegistroTipoMaterial from '../screens/Registro/RegistroTipoMaterial';

import RegistrarIntercambio from '../screens/Intercambio/RegistrarIntercambio';
import MisIntercambios from '../screens/Intercambio/MisIntercambios';
import DetalleDeIntercambio from '../screens/Intercambio/DetalleDeIntercambio';
import MapaPuntosReciclaje from '../screens/Intercambio/MapaPuntosReciclaje';

import CatalogoPremios from '../screens/Premios/CatalogoPremios'
import DetalleDePremio from '../screens/Premios/DetalleDePremio';
import CanjeResultado from '../screens/Premios/CanjeResultado';

import CrearLote from '../screens/CrearLote';

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
              <Stack.Screen name="SeleccionRol" component={SeleccionRol} options={{ title: "", headerTitleStyle: { color: "#69A03A", fontWeight: 'bold' }, headerShown: false }} />
              <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ title: "" , headerShown: false }} />
              <Stack.Screen name="RegistroSocioReciclador" component={RegistroSocioReciclador} options={{ title: "REGISTRO", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="RegistroPuntoReciclaje" component={RegistroPuntoReciclaje} options={{ title: "REGISTRO", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="ConfirmarDireccion" component={ConfirmarDireccion} options={{ title: "CONFIRMAR UBICACIÓN", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="RegistroTipoMaterial" component={RegistroTipoMaterial} options={{ title: "SELECCIONAR MATERIALES", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
            </>
          )
          : (rol === 3)
            ? (
              <>
                <Stack.Screen name="AdminMenuScreen" component={AdminMenuScreen} options={{ headerShown: false }}/>
              </>
            )
            : (rol === 2)
              ? (
                <>
                  <Stack.Screen name="PuntoMenuScreen" component={PuntoMenuScreen} options={{ headerShown: false }}/>
                  <Stack.Screen name="RegistrarIntercambio" component={RegistrarIntercambio} options={{ headerShown: false }}/>
                  <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ headerShown: false }} />
                  <Stack.Screen name="MenuHamburguesaPunto" component={MenuHamburguesaPunto} options={{ headerShown: false }} />
                  <Stack.Screen name="CrearLote" component={CrearLote} options={{ headerShown: false }} />
                </>
              )
              : (rol === 1)
              ? (
                <>
                  <Stack.Screen name="SocioMenuScreen" component={SocioMenuScreen} options={{ headerShown: false }}/>
                  <Stack.Screen name="MisIntercambios" component={MisIntercambios} options={{ headerShown: false}} />
                  <Stack.Screen name="DetalleDeIntercambio" component={DetalleDeIntercambio} options={{headerShown: false}}/>
                  <Stack.Screen name="MenuHamburguesaSocio" component={MenuHamburguesaSocio} options={{ headerShown: false }} />
                  <Stack.Screen name="MapaPuntosReciclaje" component={MapaPuntosReciclaje} options={{ title: "PUNTOS DE RECICLAJE" }, { headerShown: false }} />
                  <Stack.Screen name="CatalogoPremios" component={CatalogoPremios} options={{ title: "PREMIOS" }, { headerShown: false }} />
                  <Stack.Screen name="DetalleDePremio" component={DetalleDePremio} options={{ headerShown: false }} />
                  <Stack.Screen name="CanjeResultado" component={CanjeResultado} options={{ headerShown: false }} />
                </>
              )
              : <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      }

    </Stack.Navigator>
  );
}