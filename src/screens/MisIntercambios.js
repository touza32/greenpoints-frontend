import React, {useState,useEffect} from "react";
import { Text, View, Image,TouchableOpacity, FlatList, Alert } from "react-native";
import styleContainer from "../styles/Container";
import styleButton from "../styles/Button"
import styleText from "../styles/Text";
import { Divider, CheckBox } from 'react-native-elements';
import greenPointsApi from '../api/greenPointsApi';

export default function MisIntercambios({ route, navigation }) {
    const [newIntercambios,setnewIntercambios] = useState(null);
    console.log(newIntercambios);
   
    useEffect(() => {
        async function fetchData(){
        const data = await greenPointsApi.get('/intercambio?socioId=1');
        setnewIntercambios(data.data);
        
    }
    fetchData();
    
},[]);
    
    
    return (
        <View>
            <View style={[styleContainer.main, { marginTop: 30, alignItems: 'stretch' }]}>
                <FlatList
                    data={newIntercambios}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View style={{marginBottom:10, flexDirection: "row"}}>
                                <Image source={require('../assets/MisIntercambios.png')}
                                        style={{
                                            width: 136,
                                            height: 96
                                        }}>
                                </Image> 
                                <View>
                                    <Text style={[styleText.titleList, { textAlign: 'left'}]}>{item.name}</Text>
                                    <Text style={{color:'#B2B2B2', textAlign: 'left'}}>{item.date}</Text>
                                    <Text style={[styleText.blackText, { textAlign: 'left'}]}>{item.points}</Text>   
                                </View>
                                <TouchableOpacity style={[styleButton.lista, { alignSelf: 'center' }]} onPress={() => Alert.alert(item.name,'tus reciclables se encuentran en PLANTA RECICLADORA: XXX')}>
                                    <Text style={styleText.button}>Ver Ubicación</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => { return <Divider orientation="horizontal" /> }}
                />
            
                
            </View>
            
        </View>
    )
}