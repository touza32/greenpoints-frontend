import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
//styles
import styleContainer from "../../styles/Container";
import styleButton from "../../styles/Button"
import styleText from "../../styles/Text";
import { Divider, CheckBox } from 'react-native-elements';
//api
import greenPointsApi from '../../api/greenPointsApi';
//context
import { AuthContext } from '../../context/AuthContext';
// components
import Header from '../../components/Header';

export default function MisPremios({ props, navigation }) {

    //const { id } = useContext(AuthContext);
    //const [newPremios, setnewPremios] = useState(null);
    //const [UnPremio,setPremio] = useState(null);

    const newPremios = [
        {   
            id: 1,
            nombre: 'Doble Deluxe',
            vigencia_hasta: '2021-12-01',
            fecha_obtencion: '2021-08-01' 
        },
        {   
            id: 2,
            nombre: 'Triple Deluxe',
            vigencia_hasta: '2022-01-18',
            fecha_obtencion: '2021-08-15' 
        },
        {
            id: 3,
            nombre: 'Deluxe',
            vigencia_hasta: '2021-12-15',
            fecha_obtencion: '2021-09-14' 
        }
    ];

    
   
    /*useEffect(() => {
        async function fetchData() {
            const data = await greenPointsApi.get('/intercambio?socioId=' + id);
            setnewIntercambios(data.data);

        }
        fetchData();

    }, []);*/


    return (
        <View>
            <Header navigation={navigation} title="MIS PREMIOS" />
            <View style={[styleContainer.main, { marginTop: 10, alignItems: 'stretch' }]}>
                <FlatList
                    data={newPremios}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {navigation.navigate('DetalleDeMiPremio',{id:item.id})}}>
                            <View style={styles.premio}>
                                <Image source={require('../../assets/PremioBigMac.png')}
                                       style={styles.image}>
                                </Image> 
                                <View>
                                    <Text style={[styleText.titleList, { textAlign: 'left' }]}>{item.nombre}</Text>
                                    <Text style={styles.fechaObtencion}>{item.fecha_obtencion}</Text>
                                    <Text style={styles.fechavig}>{'Vigente hasta ' + item.vigencia_hasta}</Text>

                                </View>
                                <View style={styles.icon}>
                                    <Ionicons name="chevron-forward" size={35} color='#B2B2B2' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => { return <Divider color= '#B2B2B2'/> }}
                    ListEmptyComponent={()=>
                    <View style={[styleContainer.main, { alignItems: 'center'}]}> 
                        <Text style={[{color:'#B2B2B2',alignSelf:'center'}]}>No tienes premios aún</Text>   
                    </View>
                    }
                />
                
            
                
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
    premio:{
        marginBottom: 10,
        marginTop:10,
        flexDirection: "row"
    },
    fechavig:{
        color: 'black',
        textAlign: 'center',
        fontSize: 18

    },
    icon:{
        marginLeft: 30
    },
    fechaObtencion:{
        color: '#B2B2B2',
        textAlign: 'left',
        fontWeight: 'bold'
    }

})