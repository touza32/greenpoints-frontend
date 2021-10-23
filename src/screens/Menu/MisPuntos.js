import React, { useContext, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Header from '../../components/Header';
import Moment from 'moment';
import greenPointsApi from '../../api/greenPointsApi';
import { AuthContext } from '../../context/AuthContext';
import { Divider } from 'react-native-elements';

export default function MisPuntos({ navigation }) {

    const { id } = useContext(AuthContext);
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        (async () => {
            const movimientosData = await greenPointsApi.get('/movimiento-puntos?socioId=' + id);
            const movimientos = await movimientosData.data;
            setMovimientos(movimientos);
        })();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title="MIS PUNTOS" />
            <View style={{ flex: 1, marginTop: '5%' }}>
                <FlatList
                    data={movimientos}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <View style={{ flex: 1, flexDirection: 'row', borderColor: '#B2B2B2', borderBottomWidth: 1 }}>
                            <Text style={[styles.gridHeader, { width: '25%' }]}>Fecha</Text>
                            <Text style={[styles.gridHeader, { width: '55%' }]}>Descripción</Text>
                            <Text style={[styles.gridHeader, { width: '20%' }]}>Cantidad</Text>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.gridItem, { width: '25%' }]}>{Moment(item.fecha).format('DD/MM/yyyy')}</Text>
                            <Text style={[styles.gridItem, { width: '55%' }]}>{item.descripcion}</Text>
                            <Text style={[
                                styles.gridItem,
                                { width: '20%' },
                                item.aumentar ? { color: 'green' } : { color: 'red' }]}>
                                {item.cantidad}
                            </Text>
                        </View>
                    }
                    //ItemSeparatorComponent={() => { return <Divider color='#B2B2B2' /> }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    gridHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        borderColor: '#B2B2B2',
        textAlign: 'center'
    },
    gridItem: {
        fontSize: 15,
        borderColor: '#B2B2B2',
        borderBottomWidth: 1,
        textAlign: 'center'
    }

})

