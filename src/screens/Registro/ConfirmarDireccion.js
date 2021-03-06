// react
import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
// 3rd party libraries
import * as yup from "yup";
// styles
import styleButton from "../../styles/Button"
import styleText from "../../styles/Text";
// hooks
import { useLocation } from '../../hooks/useLocation';
// screens
import LoadingScreen from '../LoadingScreen';

import Header from '../../components/Header';


const schema = yup.object().shape({
    address: yup.string().required('Requerido')
});


export default function ConfirmarDireccion({ route, navigation }) {

    const { puntoActualizar } = route.params;

    const { hasLocation, initialPosition } = useLocation();
    const [currentMarket, setCurrentMarket] = useState({
        latitude: 0,
        longitude: 0
    });

    if (!hasLocation) return <LoadingScreen />

    const setMarker = (coords) => {
        setCurrentMarket({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    }
    const onSubmit = () => {
        const data = {
            latitud: (currentMarket.latitude === 0) ? initialPosition.latitude : currentMarket.latitude,
            longitud: (currentMarket.longitude === 0) ? initialPosition.longitude : currentMarket.longitude
        };
        puntoActualizar
            ? navigation.navigate('ActualizarTipoMaterial', { ...route.params, ...data })
            : navigation.navigate('RegistroTipoMaterial', { ...route.params, ...data })
    }

    return (
        <View style={{ flex: 1 }}>
            {puntoActualizar && <Header navigation={navigation} title="ACTUALIZAR DATOS" />}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: puntoActualizar ? route.params.latitud : initialPosition.latitude,
                    longitude: puntoActualizar? route.params.longitud : initialPosition.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                onPress={(e) => setMarker(e.nativeEvent.coordinate)}
            >
                <Marker
                    title="Mi ubicaci??n"
                    coordinate={{
                        latitude: (currentMarket.latitude === 0) ? 
                            (puntoActualizar ? route.params.latitud : initialPosition.latitude )
                            : currentMarket.latitude,
                        longitude: (currentMarket.longitude === 0) ? 
                            (puntoActualizar ? route.params.longitud : initialPosition.longitude )
                            : currentMarket.longitude
                    }}
                />
            </MapView>
            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 10, paddingBottom: 10 }}>
                <TouchableOpacity
                    style={styleButton.base}
                    onPress={onSubmit}
                >
                    <Text style={styleText.button}>SIGUIENTE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}