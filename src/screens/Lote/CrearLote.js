import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header'; 
import styleContainer from '../../styles/Container';
import { Divider } from 'react-native-elements';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native'; 
import { AuthContext } from '../../context/AuthContext';

// api
import greenPointsApi from '../../api/greenPointsApi';

export default function CrearLote({ navigation }) {
    
      const { id } = useContext(AuthContext);
      const [ tipoReciclables, setTipoReciclables] = useState([]);

      const createLote = async (tipoReciclableId) => {
            try {
                const lote = await greenPointsApi.post('/lote', {
                    puntoId: id,
                    tipoReciclableId: tipoReciclableId
                });
                lote &&
                  navigation.navigate("Confirmacion", { nextScreen: 'PuntoMenuScreen', message: 'Lote creado exitosamente' }) 
    
            } catch (e) {
                if(e.request.status === 400) {
                  Alert.alert('Error',
                  'Ya éxiste un lote activo para el tipo de material seleccionado',
                  [
                      {
                          text: 'Ok'
                      }
                  ]);
                }

             
            }
        };

      useEffect(() => {
          (async () => {
            const tipoReciclableData = await greenPointsApi.get(`/punto-reciclaje/tipo-reciclables?puntoId=${ id }&onlyOpenedLote=false`);
            const tipoReciclables = await tipoReciclableData.data;
            setTipoReciclables(tipoReciclables);
          })();
      }, []);

      return (
           <View style={{ flex: 1 }}>
                 <Header navigation={navigation} title="CREAR LOTE" />   
                  <View style={{ flex: 0.8 }}>
                        <FlatList
                              data={tipoReciclables}
                              keyExtractor={(tipoReciclable) => tipoReciclable.id.toString()}
                              renderItem={({ item }) =>
                                  <TouchableOpacity onPress={() => createLote(item.id)} 
                                    style={ item.hasActiveLote ? thisStyle.disabledButton : thisStyle.containerButton } disabled={ item.hasActiveLote }>
                                          <Image source={{ uri: item.imagen }}
                                              style={ thisStyle.image} >
                                          </Image>
                                          <Text style={ thisStyle.buttonText }>{ item.nombre }</Text>
                                  </TouchableOpacity>
                              }
                              ItemSeparatorComponent={() => { return <Divider color='#B2B2B2' /> }}>
                        </FlatList>
                  </View>
           </View>
            
         );
       }

const thisStyle = StyleSheet.create({
      image: {
            width: 110,
            height: 80,
            marginLeft: 25,
            marginRight: 10,
            borderRadius: 10,
            overflow: "hidden"
      },
      containerButton: {
            backgroundColor: "#69A03A",
            borderRadius: 10,
            margin: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center'
      },
      disabledButton: {
        backgroundColor: 'gray',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
      },
      buttonText: {
            fontSize: 30,
            color: "#FFFFFF",
            fontWeight: "bold",
            alignSelf: 'center'
      },
      containerText: {
            alignSelf: 'center'
      }
}); 
