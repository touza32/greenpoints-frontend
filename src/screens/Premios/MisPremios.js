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

    const { token, id } = useContext(AuthContext);
    const [Premios,setPremios] = useState(null);
  
    const getMisPremios = async id => {
        try {
            const response = await greenPointsApi.
                get('/socio-reciclador/premios?socioId='+id, { headers: { Authorization: token } })
                setPremios(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getMisPremios(id)
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title="MIS PREMIOS" />
            <View style={[styleContainer.main,{ marginTop: 10,alignItems: 'stretch' ,flex:1}]}>
                <FlatList
                    data={Premios}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {navigation.navigate('DetalleDeMiPremio',{id:item.id})}}>
                            <View style={styles.premio}>
                                <Image source={{ uri: item.imagen }}
                                       style={styles.image}>
                                </Image> 
                                <View>
                                    <Text style={styles.name}>{item.nombre}</Text>
                                    <Text style={styles.fechaObtencion}>{item.obtencion.substring(0, 10)}</Text>
                                    <Text style={styles.fechavig}>{'Vigente hasta ' + item.hasta.substring(0, 10)}</Text>

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
    fechaObtencion:{
        color: '#B2B2B2',
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: -3
    },
    name: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },


})