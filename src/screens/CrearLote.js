import React from 'react';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import { Divider } from 'react-native-elements';
import Header from '../components/Header'; 
import styleContainer from '../styles/Container';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'; 

var { height } = Dimensions.get('window');
var box_count = 8;
var box_height = height / box_count;


export default function CrearLote({ navigation }) {
    
      return (
           
            <View style={[styleContainer.main], { flex: 1, backgroundColor: "#FFFF",  alignItems: 'center' }}>
     
            <Header navigation={navigation} title="CREAR LOTE" />   

                 <View style={[styles.container ,{ marginTop: 30}]}>
     
                       <View style={[styles.box, styles.box1],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <TouchableOpacity
                              style={styleButton.crearLote}
                              onPress={() => {}}
                        >
                              <Text style={styleText.blackText}>PLÁSTICO</Text>
                        </TouchableOpacity>
                       </View>
     
                       <View style={[styles.box, styles.box2],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <TouchableOpacity
                              style={styleButton.crearLote}
                              onPress={() => {}}
                        >
                              <Text style={styleText.blackText}>CARTÓN/PAPEL</Text>
                        </TouchableOpacity>
                       </View>
     
                       <View style={[styles.box, styles.box3],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <TouchableOpacity
                              style={styleButton.crearLote}
                              onPress={() => {}}
                        >
                              <Text style={styleText.blackText}>VIDRIO</Text>
                        </TouchableOpacity>            
                       </View>
     
                       <View style={[styles.box, styles.box4],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                       <TouchableOpacity
                              style={styleButton.crearLote}
                              onPress={() => {}}
                        >
                              <Text style={styleText.blackText}>METAL</Text>
                        </TouchableOpacity> 
                       </View>

                       <View style={[styles.box, styles.box5]}></View>
                    
                       <View style={[styles.box, styles.box6],{ marginTop: 25, marginBottom: 20, marginLeft: 8}}>
                       <TouchableOpacity
                              style={styleButton.base}
                              onPress={() => {}}
                        >
                              <Text style={styleText.whiteText}>Crear</Text>
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
