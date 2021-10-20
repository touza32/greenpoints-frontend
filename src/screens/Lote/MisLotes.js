import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";

//3er party libraries
import Moment from 'moment';

// styles
import styleContainer from "../../styles/Container";
import styleButton from "../../styles/Button"
import styleText from "../../styles/Text";
import { Divider } from 'react-native-elements';
import greenPointsApi from '../../api/greenPointsApi';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';

export default function MisLotes({ props, navigation }) {

    const { id } = useContext(AuthContext);
    const [lotes, setLotes] = useState([]);
    const [filtro, setFiltro] = useState({ id: 0, type: 'abiertos' });
    const [resultado, setResultado] = useState([]);
   
    useEffect(() => {
        (async () => {
            const lotesData = await greenPointsApi.get('/lote?puntoId='+id);
            const lotes = await lotesData.data;
            setLotes(lotes);
            setResultado(lotes.filter(x => x.abierto));
        })();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title="MIS LOTES" />
            <View style={{ flex: 0.11 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setFiltro({ id: 0, type: 'abiertos' })
                            setResultado(lotes.filter(item => item.abierto))
                        }}
                        style={filtro.id === 0 ? styles.filtroBotonE : styles.filtroBotonD}>
                        <Text style={filtro.id === 0 ? styles.filtroTextoE : styles.filtroTextoD}>Abiertos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setFiltro({ id: 1, type: 'cerrados' })
                            setResultado(lotes.filter(item => !item.abierto))
                        }}
                        style={filtro.id === 1 ? styles.filtroBotonE : styles.filtroBotonD}>
                        <Text style={filtro.id === 1 ? styles.filtroTextoE : styles.filtroTextoD}>Cerrados</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 0.8 }}>
                <FlatList
                    data={ resultado }
                    keyExtractor={(lote) => lote.id.toString()}
                    renderItem={({ item }) =>
                        // <TouchableOpacity onPress={() => { navigation.navigate('ActualizacionLote', { loteId: item.id }) }}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={ styles.lote }>
                            <Image source={{ uri: item.imagen }}
                                        style={styles.image}>
                                    </Image>
                                <View style={ styles.loteDetail }>
                                    <Text style={ styles.loteName }>{ item.tipoMaterialNombre }</Text>
                                    <Text style={ styles.loteDate }>{ Moment(item.fecha).format('DD/MM/yyyy') }</Text>    
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={() => { return <Divider color='#B2B2B2' /> }}>
                </FlatList>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 80,
        marginLeft: 10,
        marginRight: 10
    },
    lote: {
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row",
        paddingRight: 2,
        paddingLeft: 2
    },
    loteDetail: {
        flexDirection: "column",
        justifyContent: "center"
    },
    loteName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    loteDate: {
        fontSize: 16
    },
    filtroBotonE: {
        backgroundColor: '#CC7D00',
        borderRadius: 5,
        paddingVertical: 4,
        width: 110
    },
    filtroTextoE: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    filtroBotonD: {
        borderRadius: 5,
        paddingVertical: 4,
        width: 110
    },
    filtroTextoD: {
        fontSize: 15,
        textAlign: 'center',
        color: '#827C7B'
    }
})