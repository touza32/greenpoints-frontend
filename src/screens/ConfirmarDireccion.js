// react
import React, { useState }  from "react";
import { Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
// 3rd party libraries
import * as yup from "yup";
// styles
import styleButton from "../styles/Button"
import styleText from "../styles/Text";
// hooks
import { useLocation } from '../hooks/useLocation';
// screens
import LoadingScreen from '../screens/LoadingScreen';


const schema = yup.object().shape({
    address: yup.string().required('Requerido')
});


export default function ConfirmarDireccion({ route, navigation }) {

    const { hasLocation, initialPosition } = useLocation();
    const [ currentMarket, setCurrentMarket ] = useState({
        latitude: 0,
        longitude: 0
    });

    if ( !hasLocation ) return <LoadingScreen />

    const setMarker = (coords) => {
        setCurrentMarket({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        console.log(currentMarket);
    }
    const onSubmit = () => {
        const data = {
            latitude: (currentMarket.latitude === 0) ? initialPosition.latitude : currentMarket.latitude,
            longitude:  (currentMarket.longitude === 0) ? initialPosition.longitude : currentMarket.longitude
        };
        navigation.navigate('RegistroTipoMaterial', { ...route.params, data })
    }

    return (
        <View style={{ flex: 1}}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                onPress={(e) => setMarker(e.nativeEvent.coordinate) }
            >
                <Marker
                  title="Mi ubicación"
                  coordinate={{
                    latitude: (currentMarket.latitude === 0) ? initialPosition.latitude : currentMarket.latitude,
                    longitude: (currentMarket.longitude === 0) ? initialPosition.longitude : currentMarket.longitude
                  }}
                />
            </MapView>
            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 10, paddingBottom: 10 }}>
                <TouchableOpacity
                    style={ styleButton.base }
                    onPress={ onSubmit }
                >
                    <Text style={styleText.button}>SIGUIENTE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}