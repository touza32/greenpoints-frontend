import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { PermissionContext } from '../context/PermissionContext';

// screens
import LoadingScreen from '../screens/LoadingScreen';
import Confirmacion from '../screens/Confirmacion';

import LoginScreen from '../screens/Login/LoginScreen';
import ResetPassword from '../screens/Login/ResetPassword';

import AdminMenuScreen from '../screens/Menu/AdminMenuScreen';
import PuntoMenuScreen from '../screens/Menu/PuntoMenuScreen';
import SocioMenuScreen from '../screens/Menu/SocioMenuScreen';
import MenuHamburguesa from '../screens/Menu/MenuHamburguesa';
import MisPuntos from '../screens/Menu/MisPuntos';
import SocioActualizar from '../screens/Menu/SocioActualizar';
import PuntoActualizar from '../screens/Menu/PuntoActualizar';
import ActualizarTipoMaterial from '../screens/Menu/ActualizarTipoMaterial';
import ActualizarPassword from '../screens/Menu/ActualizarPassword';

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
import MisPremios from '../screens/Premios/MisPremios';
import DetalleDeMiPremio from '../screens/Premios/DetalleDeMiPremio';
import DonacionDeMisPuntos from '../screens/Donacion/DonacionDeMisPuntos';

import MisLotes from '../screens/Lote/MisLotes';
import CrearLote from '../screens/Lote/CrearLote';
import ActualizacionLote from '../screens/Lote/ActualizacionLote';
import DetalleLote from '../screens/Lote/DetalleLote';

import AdministrarPremios from '../screens/Administracion/Premios/AdministrarPremios';
import AgregarPremio from '../screens/Administracion/Premios/AgregarPremio';
import EditarPremio from '../screens/Administracion/Premios/EditarPremio';
import VerCodigos from '../screens/Administracion/Premios/VerCodigos';

import AdministrarPlantas from '../screens/Administracion/Plantas/AdministrarPlantas';
import EditarPlanta from '../screens/Administracion/Plantas/EditarPlanta';
import AgregarPlanta from '../screens/Administracion/Plantas/AgregarPlanta';

import AdministrarSponsors from '../screens/Administracion/Sponsors/AdministrarSponsors';
import AgregarSponsor from '../screens/Administracion/Sponsors/AgregarSponsor';
import ActualizarSponsor from '../screens/Administracion/Sponsors/ActualizarSponsor';

import AdministrarTipos from '../screens/Administracion/TiposReciclables/AdministrarTipos';
import AgregarTipo from '../screens/Administracion/TiposReciclables/AgregarTipo';
import EditarTipo from '../screens/Administracion/TiposReciclables/EditarTipo';

import Contacto from '../screens/Menu/Contacto';

import styleText from '../styles/Text';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { permissions } = useContext(PermissionContext);
  const { status, rol } = useContext(AuthContext);

  if (status === 'checking' || permissions === 'unavailable') return <LoadingScreen />

  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>

      {
        (status !== 'authenticated')
          ? (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ title: "", headerShown: false }} />
              <Stack.Screen name="SeleccionRol" component={SeleccionRol} options={{ title: "", headerTitleStyle: { color: "#69A03A", fontWeight: 'bold' }, headerShown: false }} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "", headerShown: false }} />
              <Stack.Screen name="RegistroSocioReciclador" component={RegistroSocioReciclador} options={{ title: "REGISTRO", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="RegistroPuntoReciclaje" component={RegistroPuntoReciclaje} options={{ title: "REGISTRO", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="ConfirmarDireccion" component={ConfirmarDireccion} options={{ title: "CONFIRMAR UBICACIÓN", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
              <Stack.Screen name="RegistroTipoMaterial" component={RegistroTipoMaterial} options={{ title: "SELECCIONAR MATERIALES", headerTitleAlign: 'center', headerTitleStyle: styleText.header }} />
            </>
          )
          : (rol === 3)
            ? (
              <>
                <Stack.Screen name="AdminMenuScreen" component={AdminMenuScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AdministrarPremios" component={AdministrarPremios} options={{ headerShown: false }} />
                <Stack.Screen name="AgregarPremio" component={AgregarPremio} options={{ headerShown: false }} />
                <Stack.Screen name="EditarPremio" component={EditarPremio} options={{ headerShown: false }} />
                <Stack.Screen name="VerCodigos" component={VerCodigos} options={{ headerShown: false }} />
                <Stack.Screen name="AdministrarSponsors" component={AdministrarSponsors} options={{ headerShown: false }} />
                <Stack.Screen name="AgregarSponsor" component={AgregarSponsor} options={{ headerShown: false }} />
                <Stack.Screen name="ActualizarSponsor" component={ActualizarSponsor} options={{ headerShown: false }} />
                <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ headerShown: false }} />
                <Stack.Screen name="AdministrarTipos" component={AdministrarTipos} options={{ headerShown: false }} />
                <Stack.Screen name="EditarTipo" component={EditarTipo} options={{ headerShown: false }} />
                <Stack.Screen name="AgregarTipo" component={AgregarTipo} options={{ headerShown: false }} />
                <Stack.Screen name="AdministrarPlantas" component={AdministrarPlantas} options={{ headerShown: false }} />
                <Stack.Screen name="AgregarPlanta" component={AgregarPlanta} options={{ headerShown: false }} />
                <Stack.Screen name="EditarPlanta" component={EditarPlanta} options={{ headerShown: false }} />
              </>
            )
            : (rol === 2)
              ? (
                <>
                  <Stack.Screen name="PuntoMenuScreen" component={PuntoMenuScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="RegistrarIntercambio" component={RegistrarIntercambio} options={{ headerShown: false }} />
                  <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ headerShown: false }} />
                  <Stack.Screen name="MenuHamburguesa" component={MenuHamburguesa} options={{ headerShown: false }} />
                  <Stack.Screen name="MisLotes" component={MisLotes} options={{ headerShown: false }} />
                  <Stack.Screen name="CrearLote" component={CrearLote} options={{ headerShown: false }} />
                  <Stack.Screen name="ActualizacionLote" component={ActualizacionLote} options={{ headerShown: false }} />
                  <Stack.Screen name="DetalleLote" component={DetalleLote} options={{ headerShown: false }} />
                  <Stack.Screen name="Contacto" component={Contacto} options={{ headerShown: false }} />
                  <Stack.Screen name="PuntoActualizar" component={PuntoActualizar} options={{ headerShown: false }} />
                  <Stack.Screen name="ConfirmarDireccion" component={ConfirmarDireccion} options={{ headerShown: false }} />
                  <Stack.Screen name="ActualizarTipoMaterial" component={ActualizarTipoMaterial} options={{ headerShown: false }} />
                  <Stack.Screen name="ActualizarPassword" component={ActualizarPassword} options={{ headerShown: false }} />
                </>
              )
              : (rol === 1)
                ? (
                  <>
                    <Stack.Screen name="SocioMenuScreen" component={SocioMenuScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MisIntercambios" component={MisIntercambios} options={{ headerShown: false }} />
                    <Stack.Screen name="DetalleDeIntercambio" component={DetalleDeIntercambio} options={{ headerShown: false }} />
                    <Stack.Screen name="MenuHamburguesa" component={MenuHamburguesa} options={{ headerShown: false }} />
                    <Stack.Screen name="MapaPuntosReciclaje" component={MapaPuntosReciclaje} options={{ title: "PUNTOS DE RECICLAJE" }, { headerShown: false }} />
                    <Stack.Screen name="CatalogoPremios" component={CatalogoPremios} options={{ title: "PREMIOS" }, { headerShown: false }} />
                    <Stack.Screen name="DetalleDePremio" component={DetalleDePremio} options={{ headerShown: false }} />
                    <Stack.Screen name="CanjeResultado" component={CanjeResultado} options={{ headerShown: false }} />
                    <Stack.Screen name="MisPremios" component={MisPremios} options={{ headerShown: false }} />
                    <Stack.Screen name="DetalleDeMiPremio" component={DetalleDeMiPremio} options={{ headerShown: false }} />
                    <Stack.Screen name="DonacionDeMisPuntos" component={DonacionDeMisPuntos} options={{ headerShown: false }} />
                    <Stack.Screen name="Contacto" component={Contacto} options={{ headerShown: false }} />
                    <Stack.Screen name="MisPuntos" component={MisPuntos} options={{ headerShown: false }} />
                    <Stack.Screen name="Confirmacion" component={Confirmacion} options={{ headerShown: false }} />
                    <Stack.Screen name="SocioActualizar" component={SocioActualizar} options={{ headerShown: false }} />
                    <Stack.Screen name="ActualizarPassword" component={ActualizarPassword} options={{ headerShown: false }} />
                  </>
                )
                : <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      }

    </Stack.Navigator>
  );
}