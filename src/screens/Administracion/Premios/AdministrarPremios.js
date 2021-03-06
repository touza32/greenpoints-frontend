import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Divider, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
//styles
import styleText from "../../../styles/Text";
import styleButton from '../../../styles/Button';
//api
import greenPointsApi from '../../../api/greenPointsApi';
// components
import Header from '../../../components/Header';

export default function AdministrarPremios({ navigation }) {

    const [premios, setPremios] = useState([]);
    const [query, setQuery] = useState('');
    const [resultado, setResultado] = useState([]);
    const [filtro, setFiltro] = useState({ id: 0, type: 'nombre' });

    useEffect(() => {
        navigation.addListener('focus', () => {
            (async () => {
                const premiosData = await greenPointsApi.get('/premio?admin=true');
                const premios = await premiosData.data;
                setPremios(premios);
                setResultado(premios);
            })();
        })
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title="PREMIOS" />
            <View style={{ flex: 0.2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 }}>
                    <TouchableOpacity
                        onPress={() => {
                            setFiltro({ id: 0, type: 'nombre' })
                            setResultado(premios)
                            setQuery('')
                        }}
                        style={filtro.id === 0 ? styles.filtroBotonE : styles.filtroBotonD}>
                        <Text style={filtro.id === 0 ? styles.filtroTextoE : styles.filtroTextoD}>Producto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setFiltro({ id: 1, type: 'sponsorName' })
                            setResultado(premios)
                            setQuery('')
                        }}
                        style={filtro.id === 1 ? styles.filtroBotonE : styles.filtroBotonD}>
                        <Text style={filtro.id === 1 ? styles.filtroTextoE : styles.filtroTextoD}>Sponsor</Text>
                    </TouchableOpacity>
                </View>
                <Input
                    inputContainerStyle={{ marginHorizontal: 10, borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 10, height: 40 }}
                    style={{ fontSize: 15 }}
                    placeholder="Buscar"
                    leftIcon={
                        <TouchableOpacity
                            style={{ marginLeft: 5 }}
                            onPress={() => setSocioFocus(false)}>
                            <Ionicons name='search' size={20} color='gray' />
                        </TouchableOpacity>
                    }
                    onChangeText={value => {
                        setQuery(value)
                        setResultado(premios.filter(item => item[filtro.type].toUpperCase().indexOf(value.toUpperCase()) > -1))
                    }}
                    value={query}
                />
                <Divider orientation='horizontal' width={1} color='#DDDDDD' style={{ marginTop: -10 }} />
            </View>
            <View style={{ flex: 0.7 }}>
                <FlatList
                    data={resultado}
                    keyExtractor={(premio) => premio.id.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => { navigation.navigate('EditarPremio', { premioId: item.id }) }}>
                            <View style={styles.premio}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={{ uri: item.imagen }}
                                        style={styles.image}>
                                    </Image>
                                    <View style={styles.premioDetail}>
                                        <Text style={[styleText.titleList, { textAlign: 'left' }]}>{item.nombre}</Text>
                                        <Text style={styles.sponsor}>{item.sponsorName}</Text>
                                        <Text style={styles.sponsor}>{item.points} puntos</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={() => { return <Divider color='#B2B2B2' /> }}>
                </FlatList>
                <View style={{ flex: 0.1, alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={[styleButton.base]}
                        onPress={() => navigation.navigate('AgregarPremio')}
                    >
                        <Text style={styleText.button}>AGREGAR</Text>
                    </TouchableOpacity>
                </View>
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
    sponsor: {
        color: '#827C7B',
        textAlign: 'left',
        fontSize: 15
    },
    premio: {
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row",
        paddingRight: 2,
        paddingLeft: 2
    },
    premioDetail: {
        flexDirection: "column",
        width: 170
    },
    points: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    pointsHeader: {
        fontWeight: "bold",
        fontSize: 35
    },
    pointsBody: {
        fontWeight: "bold",
        fontSize: 10
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
