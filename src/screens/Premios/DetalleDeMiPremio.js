import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import styleContainer from "../../styles/Container";
import styleButton from "../../styles/Button"
import styleText from "../../styles/Text";
import { Divider } from 'react-native-elements';
//api
import greenPointsApi from '../../api/greenPointsApi';
//context
import { AuthContext } from '../../context/AuthContext';
// components
import Header from '../../components/Header';

export default function DetalleDeMiPremio({ route, navigation }) {

    const {id} = route.params
    const [Premio, setPremio] = useState(null);

    const getMiPremio = async id => {
        try {
            const response = await greenPointsApi.
                get('/socio-reciclador/premio?socioPremioId=' +id)
                setPremio(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getMiPremio(id)
    }, [])

    
return (
    
    <View style={{ flex: 1 }}>
        <Header navigation={navigation} title="DETALLE" />
        {Premio && (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.35 ,justifyContent: 'center'}}>
                <Image
                    source={{ uri: Premio.imagen }}
                    style={styles.image}
                    resizeMode="contain"
                    >
                </Image>
            </View>
            <View style={{ flex: 0.65, width:'90%' }}>
                <View style={styles.item}>
                    <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Detalle</Text>
                    <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{Premio.descripcion}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>¿Dónde lo uso?</Text>
                    <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{Premio.observacion}</Text>             
                </View>
                <View style={styles.item}>    
                    <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Vigente hasta</Text>
                    <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{Premio.hasta.substring(0, 10)}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Mi Código</Text>
                    <View style={{ alignItems: 'center',marginTop:15}}>
                        <Text style={styles.codigo}>{Premio.codigo}</Text>
                    </View>
                </View>
            </View>   
        </View>
        )}

        
           
           
    </View>




    )







}

const styles = StyleSheet.create({
    image: {
        width: 260,
        height: 180,
        alignSelf: 'center'
    },
    item: {
        marginBottom:5
    },
    direccion:{
        color: 'black',
        marginLeft: 5,
        fontSize: 20

    },
    codigo:{
        color: '#69A03A',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: "bold",
        borderColor: '#69A03A',
        borderWidth: 2,
        paddingHorizontal: 30
        
        
        
        
    }
})