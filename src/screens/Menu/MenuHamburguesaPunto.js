import React, { useContext } from 'react';
import styleContainer from '../../styles/Container';
import styleText from '../../styles/Text';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Header } from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';

var { height } = Dimensions.get('window');
var box_count = 8;
var box_height = height / box_count;


export default function MenuHamburguesaPunto({navigation}) {
  
  const { logOut } = useContext( AuthContext );

    return (
           
       <View style={[styleContainer.main], { flex: 1, backgroundColor: "#69A03A" }}>

        <Header   
                              
             backgroundColor="#69A03A"
             leftComponent={
             <TouchableHighlight onPress={() =>{ navigation.navigate('PuntoMenuScreen');}}>
             <FAIcon name='chevron-left' size={25} style={{ color: "#FFFF" }} />
             </TouchableHighlight>           
             }
            
             centerComponent={{ text: 'GREEN POINTS', style: { color: '#fff', fontWeight: "bold", fontSize: 18} }}
            
          />  
                                       
            <View style={[styles.container ,{ marginTop: 30}]}>

                  <View style={[styles.box, styles.box0], { marginLeft: 20}}>

                      <Image source={require('../../assets/User.png')}
                              style={{
                                width: 80,
                                height: 80
                              }}>
                            </Image>

                  </View>

                  <View style={[styles.box, styles.box1],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                  <TouchableOpacity  onPress={() => {}} >
                              <View
                                  style={[{flexDirection: "row"}]}>
                                  <FAIcon name='user-circle' size={45} style={{ color: "#FFFF" }} />  
                                  < Text style={[styleText.buttonH,{marginLeft: 30 }]}>Actualizar Datos</Text>
                              </View>
                  </TouchableOpacity>
                  </View>

                  <View style={[styles.box, styles.box2],{ marginTop: 25, marginBottom: 10, marginLeft: 8}}>
                  <TouchableOpacity  onPress={() => navigation.navigate('Contacto')} >
                              <View
                                  style={[{flexDirection: "row"}]}>
                                  <FAIcon name='question-circle' size={45} style={{ color: "#FFFF" }} />  
                                  < Text style={[styleText.buttonH,{marginLeft: 30 }]}>Contáctanos</Text>
                              </View>
                  </TouchableOpacity>
                  </View>

                  <View style={[styles.box, styles.box3],{ marginTop: 25, marginBottom: 20, marginLeft: 8}}>
                  <TouchableOpacity  onPress={logOut} >
                              <View
                                  style={[{flexDirection: "row"}]}>
                                  <FAIcon name='arrow-right' size={45} style={{ color: "#FFFF" }} />  
                                  < Text style={[styleText.buttonH,{marginLeft: 30 }]}>Salir</Text>
                              </View>
                  </TouchableOpacity>                    
                  </View>

                  <View style={[styles.box, styles.box4]}></View>
                  <View style={[styles.box, styles.box5]}></View>
                  <View style={[styles.box, styles.box6]}></View>
                  <View style={[styles.box, styles.box7]}></View>
                  <View style={[styles.box, styles.box8]}></View>
            </View>
       
      </View>

    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column' },
    box: { height: box_height },
    box0: { backgroundColor: '#69A03A' },
    box1: { backgroundColor: '#69A03A' },
    box2: { backgroundColor: '#69A03A' },
    box3: { backgroundColor: '#69A03A' },
    box4: { backgroundColor: '#FFFF' },
    box5: { backgroundColor: '#FFFF' },
    box6: { backgroundColor: '#FFFF' },
    box7: { backgroundColor: '#FFFF' },
    box8: { backgroundColor: '#FFFF' }
  });   