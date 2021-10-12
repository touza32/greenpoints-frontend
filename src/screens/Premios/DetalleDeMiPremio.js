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

    //const [UnPremio, setPremio] = useState(null);
    //const [Direcciones, setDirecciones] = useState(null);
    const {id} = route.params

    const UnPremio = {
        detalle: 'Aqui va a ir el texto con el detalle del premio. Por ejemplo: una rica hamburguesa con queso',
        direcciones: [
            'Av. 9 de Julio 145, CABA',
            'Córdoba 25, CABA',
            'Av. San Martín 1200, CABA',
        ],
        codigo: 'ABCD1234',
        vigencia: '31/12/2021'
    }
   

   /* useEffect(() => {
        async function fetchData(){
        const data = await greenPointsApi.get('/intercambio/' + id);
        setPremio(data.data);
        setDirecciones(data.data.detail);
       
    }
    fetchData();
    
},[]); */

return (
    
    <View style={[{ flex: 1 }]}>
        <Header navigation={navigation} title="DETALLE" />
        {UnPremio && (
        <View>
            <Image
                source={require('../../assets/PremioBigMac.png')}
                style={styles.image}>
            </Image>
            <View style={styles.item}>
            <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Detalle</Text>
            <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{UnPremio.detalle}</Text>
            </View>

            <View style={styles.item}>
                <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>¿Dónde lo uso?</Text>
                <FlatList
                    data={UnPremio.direcciones}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item  => (
                        <View style={{marginLeft:25, flexDirection: "row"}}>
                            <Icon name="location" size={25}  color= "#CC7D00"/>
                            <Text style={styles.direccion}>{item.item}</Text>
                        </View>

                    )}

                /*ItemSeparatorComponent={() => { return <Divider orientation="horizontal" /> }}*/
                />                  
            </View>
            
            <View style={styles.item}>
                        
                <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Vigente hasta</Text>
                <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{UnPremio.vigencia}</Text>
            
            </View>
            <View style={styles.item}>
                <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Mi Código</Text>
                <View style={{ alignItems: 'center'}}>
                    <Text style={styles.codigo}>{UnPremio.codigo}</Text>
                </View>
            </View>

        </View>
         

        )}

        
           
           
    </View>




    )







}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
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