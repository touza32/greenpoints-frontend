import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import styleContainer from "../styles/Container";
import styleButton from "../styles/Button"
import styleText from "../styles/Text";
import { Divider, CheckBox } from 'react-native-elements';
import greenPointsApi from '../api/greenPointsApi';
import { AuthContext } from '../context/AuthContext';
import ModalIntercambio from "../components/ModalIntercambio";
import Header from '../components/Header';

export default function MisIntercambios({ props, navigation }) {
    const { id } = useContext(AuthContext);
    console.log(id);
    const [newIntercambios, setnewIntercambios] = useState(null);
    console.log(newIntercambios);
    const [modalVisible, setModalVisible] = useState(false);
    /*const text = navigation.getParams('text','nothing sent');*/
    /*const {modalVisible} = true;*/
    console.log(modalVisible);
    const [UnIntercambio,setIntercambio] = useState(null);
    
   
    useEffect(() => {
        async function fetchData() {
            const data = await greenPointsApi.get('/intercambio?socioId=' + id);
            setnewIntercambios(data.data);

        }
        fetchData();

    }, []);


    return (
        <View>
            <Header navigation={navigation} title="MIS INTERCAMBIOS" />
            <View style={[styleContainer.main, { marginTop: 10, alignItems: 'stretch' }]}>
                <FlatList
                    data={newIntercambios}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {navigation.navigate('DetalleDeIntercambio',{id:item.id})}}>
                            <View style={{marginBottom:10,marginTop:10, flexDirection: "row"}}>
                                <Image source={require('../assets/MisIntercambiosList.png')}
                                        style={{
                                            width: 87,
                                            height: 69,
                                            marginLeft:10,
                                            marginRight:10
                                        }}>
                                </Image> 
                                <View>
                                    <Text style={[styleText.titleList, { textAlign: 'left' }]}>{item.name}</Text>
                                    <Text style={{ color: '#B2B2B2', textAlign: 'left' }}>{item.date.substring(0, 10)}</Text>
                                    <Text style={[styleText.blackText, { textAlign: 'left' }]}>{item.points + ' Green Points'}</Text>

                                </View>
                                <TouchableOpacity style={[styleButton.lista, {marginLeft:5, alignSelf: 'center' }]} onPress={() => {setModalVisible(true)
                                                                                                                       setIntercambio(item.id)
                                                                                                                       }/*Alert.alert(item.name,'tus reciclables se encuentran en PLANTA RECICLADORA: XXX')*/   
                    
                            }>
                                    <Text style={styleText.button}>Ver Ubicación</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => { return <Divider color= '#B2B2B2'/> }}
                    ListEmptyComponent={()=>
                    <View style={[styleContainer.main, { alignItems: 'center'}]}> 
                        <Text style={[{color:'#B2B2B2',alignSelf:'center'}]}>No tenes intercambios aún</Text>   
                    </View>
                    }
                />
                
            
                
            </View>
            {modalVisible && (        
                <View>
                    <ModalIntercambio data={UnIntercambio} visible={modalVisible} hideModal={()=>setModalVisible(false)}/>
    
                </View>
             )}
        </View>
        
    )


}