import React, {useState,useEffect,useContext} from "react";
import { Text, View, Image,TouchableOpacity, FlatList, Alert } from "react-native";
import styleContainer from "../styles/Container";
import styleButton from "../styles/Button"
import styleText from "../styles/Text";
import greenPointsApi from '../api/greenPointsApi';
import { AuthContext } from '../context/AuthContext';
import { Divider} from 'react-native-elements';
import ModalIntercambio from "../components/ModalIntercambio";

export default function({ route, navigation }){
    const [UnIntercambio,setIntercambio] = useState(null);
    /*console.log(UnIntercambio);*/
    const [Detalle,setDetalle] = useState(null);
    /*console.log(Detalle);*/
    const [ModalId,setModalId] = useState(null);
    const {id} = route.params
    console.log(id)
    const [modalVisible, setModalVisible] = useState(false);

  
    useEffect(() => {
        async function fetchData(){
        const data = await greenPointsApi.get('/intercambio/' + id);
        setIntercambio(data.data);
        setDetalle(data.data.detail);
       
    }
    fetchData();
    
},[]);

return (
    
    <View style={[{ flex: 1 }]}>
        {UnIntercambio && (

        <View>
            <Image
                source={require('../assets/icon.png')}
                style={{
                    width: 184,
                    height: 184,
                    alignSelf: 'center'
                    }}>
            </Image>
            <View>
                <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Detalle</Text>
                <FlatList
                    data={Detalle}
                    keyExtractor={item =>item.tipoReciclableName}
                    renderItem={({ item }) => (
                        <View style={{marginBottom:5, flexDirection: "row"}}>
                            <Image source={require('../assets/CheckOrange.png')}
                                        style={{
                                            width: 25,
                                            height: 31,
                                            marginLeft:30
                                        }}>
                            </Image>
                            <Text style={[styleText.blackText, { textAlign: 'left'}]}>{item.weight + ' Kg ' +   item.tipoReciclableName}</Text>

                        </View>

                    )}

                /*ItemSeparatorComponent={() => { return <Divider orientation="horizontal" /> }}*/
                />                  
            </View>
            
            <View style={{marginBottom:5}}>
                        
                <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Punto de Reciclaje</Text>
                <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{UnIntercambio.puntoReciclajeName}</Text>
                <Text style={{marginLeft: 30, textAlign: 'left'}}>{UnIntercambio.puntoReciclajeAddress}</Text>
            </View>
            <View style={{marginBottom:5}}>
                <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Fecha</Text>
                <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{UnIntercambio.date.substring(0,10)}</Text>
            </View>
            <View style={{marginBottom:5}}>
                <Text style={[styleText.titleLayout, { textAlign: 'left'}]}>Mis Puntos</Text>
                <Text style={[styleText.blackText, {marginLeft: 30, textAlign: 'left'}]}>{UnIntercambio.points + ' Green Points'}</Text>
            </View>

            

            <TouchableOpacity style={[styleButton.base, {marginTop:20, alignSelf: 'center' }]} onPress={() => {setModalVisible(true)
                                                                                                               setModalId(UnIntercambio.id)}}>
                <Text style={styleText.button}>Ver Ubicación</Text>
            </TouchableOpacity>

            {modalVisible && (        
            <View>
                <ModalIntercambio data={ModalId}/>
            </View>
         )}

        </View>
         

        )}

        
           
           
    </View>

   



            )







}