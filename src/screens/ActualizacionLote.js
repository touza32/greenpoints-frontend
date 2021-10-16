import React from 'react';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import Header from '../components/Header'; 
import styleContainer from '../styles/Container';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'; 
import styleTextInput from '../styles/TextInput';


var { height } = Dimensions.get('window');
var box_count = 8;
var box_height = height / box_count;


export default function ActualizacionLote({ navigation }) {
    
      return (
           
            <View style={[styleContainer.main], { flex: 1, backgroundColor: "#FFFF",  alignItems: 'center' }}>
     
            <Header navigation={navigation} title="ACTUALIZAR LOTE" />   

                 <View style={[styles.container ,{ marginTop: 30}]}>
     
                       <View style={[styles.box, styles.box1],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                      
                       <Text style={styleText.blackTextleft}>Identificador</Text>                 
                       <TextInput
                        style={[styleTextInput.large, { marginBottom: 10 }]}
                        placeholder='Carton - 20210601'
                        />                       
                       </View>
     
                       <View style={[styles.box, styles.box2],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <Text style={styleText.blackTextleft}>Fecha Creación</Text>  
                       <TextInput
                        style={[styleTextInput.large, { marginBottom: 10 }]}
                        placeholder='01/06/2021'
                        />    
                       </View>
     
                       <View style={[styles.box, styles.box3],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <Text style={styleText.blackTextleft}>Planta Recicladora</Text>
                       <TextInput
                        style={[styleTextInput.large, { marginBottom: 10 }]}
                        placeholder='Av. Corrientes 2332'
                        />        
                       </View>
     
                       <View style={[styles.box, styles.box4]}></View>
                                      
                       <View style={[styles.box, styles.box5],{ marginTop: 25, marginBottom: 20, marginLeft: 8}}>
                       <TouchableOpacity
                              style={styleButton.base}
                              onPress={() => navigation.navigate("Confirmacion", { nextScreen: 'PuntoMenuScreen', message: 'Lote cerrado exitosamente' })   }
                        >
                              <Text style={styleText.whiteText}>Cerrar Lote</Text>
                        </TouchableOpacity> 
                        </View>

                        <View style={[styles.box, styles.box6]}></View>                  
                       
                       
                 </View>
            
           </View>
     
         );
       }

       const styles = StyleSheet.create({
            container: { flex: 1, flexDirection: 'column' },
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
