import React, { useState, useEffect, useContext } from 'react';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import Header from '../components/Header'; 
import styleContainer from '../styles/Container';
import { Divider } from 'react-native-elements';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native'; 
import { AuthContext } from '../context/AuthContext';

//api
import greenPointsApi from '../api/greenPointsApi';

var { height } = Dimensions.get('window');
var box_count = 6;
var box_height = height / box_count;

const styleImage = StyleSheet.create({
      container: {
        paddingTop: 50,
      },
      stretch: {
        width: 75,
        height: 75,
        resizeMode: 'stretch',
        borderRadius: 150 / 2,
        overflow: "hidden"
      },
    });

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

      return (
           
            <View style={[styleContainer.main], { flex: 1, backgroundColor: "#FFFF" }}>
     
            <Header navigation={navigation} title="CREAR LOTE" />   

                 <View style={[styles.container ,{ marginTop: 30}]}>
                        
                       <View style={[styles.box, styles.box1],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                             
                              <TouchableOpacity
                                    onPress={() => createLote(1) }>
                                    <View
                                          style={[styleContainer.main, { flexDirection: "row" }]}>
                                          <Image
                                          style={styleImage.stretch}
                                          source={require('../assets/Plastico.png')}
                                          >
                                          </Image>
                                          < Text style={[styles.textBody, { marginLeft: 20 }]}>PLÁSTICO</Text>

                                    </View>
                                    
                              </TouchableOpacity>
                             
                       </View>

                       <View style={{ flex: 0.1, justifyContent: 'center', marginHorizontal: '5%' }}>
                        <Divider orientation="horizontal" width={2} />
                       </View>
     
                       <View style={[styles.box, styles.box2],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <TouchableOpacity
                                    onPress={() => createLote(3) }>
                                    <View
                                          style={[styleContainer.main, { flexDirection: "row" }]}>
                                          <Image
                                          style={styleImage.stretch}
                                          source={require('../assets/Carton.png')}
                                          >
                                          </Image>
                                          < Text style={[styles.textBody, { marginLeft: 20 }]}>CARTÓN/PAPEL</Text>
                                    </View>
                        </TouchableOpacity>
                       </View>

                       <View style={{ flex: 0.1, justifyContent: 'center', marginHorizontal: '5%' }}>
                        <Divider orientation="horizontal" width={2} />
                       </View>
     
                       <View style={[styles.box, styles.box3],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <TouchableOpacity
                                    onPress={() => createLote(2) }>
                                    <View
                                          style={[styleContainer.main, { flexDirection: "row" }]}>
                                          <Image
                                          style={styleImage.stretch}
                                          source={require('../assets/Vidrio.png')}
                                          >
                                          </Image>
                                          < Text style={[styles.textBody, { marginLeft: 20 }]}>VIDRIO</Text>
                                    </View>
                        </TouchableOpacity>          
                       </View>

                       <View style={{ flex: 0.1, justifyContent: 'center', marginHorizontal: '5%' }}>
                        <Divider orientation="horizontal" width={2} />
                       </View>

                       <View style={[styles.box, styles.box5]}></View>
                 </View>
            
           </View>
     
         );
       }

       const styles = StyleSheet.create({
            container: { flex: 1, flexDirection: 'column' },
            textBody: {
              color: 'black',
              textAlign: 'center',
              fontSize: 20
            },
            box: { height: box_height },
            box0: { backgroundColor: '#FFFF' },
            box1: { backgroundColor: '#FFFF' },
            box2: { backgroundColor: '#FFFF' },
            box3: { backgroundColor: '#FFFF' },
            box4: { backgroundColor: '#FFFF' },
            box5: { backgroundColor: '#FFFF' },
            box6: { backgroundColor: '#FFFF' },
            box7: { backgroundColor: '#FFFF' },
            box8: { backgroundColor: '#FFFF' }
          }); 
