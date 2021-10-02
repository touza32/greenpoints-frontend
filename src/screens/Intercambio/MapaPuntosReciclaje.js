// react
import React, { useState, useEffect }  from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';

// hooks
import { useLocation } from '../../hooks/useLocation';
// screens
import LoadingScreen from '../LoadingScreen';
//api
import greenPointsApi from '../../api/greenPointsApi';
// components
import Header from '../../components/Header';

export default function MapaPuntosReciclaje({ route, navigation }) {

    const { hasLocation, initialPosition } = useLocation();
    const [ puntos, setPuntos ] = useState([]);
    const [ tiposReciclable, setTiposReciclable ] = useState([]);
    const [ market, setMarket ] = useState(null);

    useEffect(() => {
        (async () => {
            const puntosData = await greenPointsApi.get('/usuario/punto-reciclaje');
            setPuntos(puntosData.data);
            const tiposReciclableData = await greenPointsApi.get('/tipo-reciclable');
            setTiposReciclable(tiposReciclableData.data);
          })();
    }, [])

    if ( !hasLocation ) return <LoadingScreen />

    const onMarkerPress = (punto) => {
        setMarket(punto);
    }

    const clearMarkers = () => {
        setMarket(null);
    }

    const filterTipo = async (tipoId) => {
        const puntosData = await greenPointsApi.get('/usuario/punto-reciclaje?tipoId=' + tipoId );
        setPuntos(puntosData.data);
        console.log(tipoId);
    }

    return (
        <View style={{ flex: 1}}>
            <Header navigation={navigation} title="PUNTOS DE RECICLAJE" />
            <MapView
                onPress={() => clearMarkers()}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
            >
                { puntos.map((punto) => (
                  <Marker
                    onPress={() => onMarkerPress(punto)}
                    key={ punto.id }
                    coordinate={{ 
                        latitude: punto.latitud, 
                        longitude: punto.longitud 
                    }}
                    title={ punto.nombre }
                  />
                ))}
            </MapView>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={ false }
                height={ 50 }
                style={ styles.chipsScrollView }>
                    { tiposReciclable.map((tipoReciclable) => (
                        <TouchableOpacity key={ tipoReciclable.id } style={ styles.chipsItem } onPress={() => filterTipo(tipoReciclable.id)}>
                            <Text>{ tipoReciclable.nombre }</Text>
                        </TouchableOpacity>
                    )) }
            </ScrollView>
            { market ? (
                <View style={ styles.market } >
                    <View>
                        <Text numberOfLines={1} style={ styles.marketTitle }>{ market.nombre }</Text>
                        <Text style={ styles.marketBody }>{ market.description }</Text>
                    </View>
                </View>
            ) : null}
            
        </View>
    )
}

const styles = StyleSheet.create({
    market: {
        position: 'absolute',
        marginBottom: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '90%',
        height: '15%',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10,
        bottom: 0,
        borderRadius: 15,
        borderColor: '#69A03A',
        borderWidth: 0.5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.9,
        shadowRadius: 16.00,
        elevation: 24
    },
    marketTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10
    },
    marketBody: {
        fontSize: 15,
        paddingLeft: 5,
        alignSelf: 'center',
        paddingRight: 5
    },
    chipsScrollView: {
        position: 'absolute',
        top: 120,
        paddingHorizontal: 10
    },
    chipsItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10
    }
  });   
