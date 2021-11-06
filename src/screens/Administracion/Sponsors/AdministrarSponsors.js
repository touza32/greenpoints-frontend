import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
//styles
import styleContainer from "../../../styles/Container";
import styleText from "../../../styles/Text";
import styleButton from '../../../styles/Button';
import { Divider, Input } from 'react-native-elements';
//api
import greenPointsApi from '../../../api/greenPointsApi';
//context
//import { AuthContext } from '../../context/AuthContext';
// components
import Header from '../../../components/Header';

export default function AdministrarSponsors({ navigation }) {

    const [sponsors, setSponsors] = useState([]);
    const [query, setQuery] = useState('');
    const [resultado, setResultado] = useState([]);

    useEffect(() => {
        navigation.addListener('focus', () => {
        (async () => {
            const sponsorsData = await greenPointsApi.get('/sponsor');
            const sponsors = await sponsorsData.data;
            setSponsors(sponsors);
            setResultado(sponsors);
        })();
    })
    }, [navigation]);

    
    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title="SPONSORS" />
            <View style={{ flex: 0.1 }}>
                <Input
                    inputContainerStyle={{ marginHorizontal: 10, marginTop: 10, borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 10, height: 40 }}
                    style={{ fontSize: 15 }}
                    placeholder="Buscar"
                    leftIcon={
                        <TouchableOpacity
                            style={{ marginLeft: 5 }}
                        >
                            <Ionicons name='search' size={20} color='gray' />
                        </TouchableOpacity>
                    }
                    onChangeText={value => {
                        setQuery(value)
                        setResultado(sponsors.filter(item => item.nombre.toUpperCase().indexOf(value.toUpperCase()) > -1))
                    }}
                    value={query}
                />
                <Divider orientation='horizontal' width={1} color='#DDDDDD' style={{ marginTop: -15 }} />
            </View>
            <View style={[styleContainer.main,{ marginTop: -5,alignItems: 'stretch' ,flex:0.8}]}>
                <FlatList
                    data={resultado}
                    keyExtractor={(sponsor) => sponsor.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {navigation.navigate('ActualizarSponsor',{id:item.id})}}>
                            <View style={item.activo ? styles.sponsor : styles.sponsorDisabled}>
                                <Image source={{uri: item.imagen}}
                                       style={styles.image}>
                                </Image> 
                                <View>
                                    <Text style={styles.name}>{item.nombre}</Text>
                                    {/*<Text style={styles.premios}>{item.premios}</Text>*/}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => { return <Divider color= '#B2B2B2'/> }}
        
                />
                <View style={{ flex: 0.1, alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={[styleButton.base]}
                        onPress={() => {navigation.navigate('AgregarSponsor')}}
                    >
                        <Text style={styleText.button}>AGREGAR NUEVO</Text>
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
    sponsor:{
        width:"95%",
        alignSelf:"center",
        marginBottom: 5,
        marginTop:5,
        flexDirection: "row",
        paddingRight: 2,
        paddingLeft: 2
    },
    sponsorDisabled:{
        width:"95%",
        alignSelf:"center",
        backgroundColor: "gray",
        marginBottom: 5,
        marginTop:5,
        flexDirection: "row",
        paddingRight: 2,
        paddingLeft: 2
    },
    fechavig:{
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        //marginTop: -5

    },
    icon:{
        marginLeft: 30
    },
    premios:{
        color: '#B2B2B2',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18
        //marginTop: -3
    },
    name: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
    },


})