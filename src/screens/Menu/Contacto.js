import React ,{ useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styleText from '../../styles/Text';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';


const styleImage = StyleSheet.create({
      container: {
        paddingTop: 50,
      },
      stretch: {
        width: 65,
        height: 65,
        resizeMode: 'stretch',
      },
    
    });


export default function Contacto({ navigation }) {

      const {rol}  = useContext(AuthContext);

      return (
            <View style={{ flex: 1 }}>
                  <Header navigation={navigation} title="" />
                  
                  <View style={{ flex: 0.45, justifyContent: 'center', alignItems: 'center',marginTop:-40 }}>
                        
                        <View>
                              <Text style={styles.title}>Contáctanos y con gusto nos comunicaremos 
                               de inmediato!! 
                              </Text>
                              <Text style={styles.title}>Nos encontramos en las redes sociales. 
                              </Text>

                        </View>
                        
                  </View>

                   <View style={{flexDirection: "row",justifyContent: 'space-around', alignItems: 'center',marginTop: -20}}>
                   
                   <Image style={styleImage.stretch} source={require('../../assets/Whatsapp.png')}>
                   </Image> 
                   <Image style={styleImage.stretch} source={require('../../assets/Twitter.png')}>
                   </Image> 
                   
                   </View> 

                   <View style={{flexDirection: "row",justifyContent: 'space-around', alignItems: 'center',  marginTop: '15%' }}>
                   
                   <Image style={styleImage.stretch} source={require('../../assets/Instagram.png')}>
                   </Image> 
                   <Image style={styleImage.stretch} source={require('../../assets/Facebook.png')}>
                   </Image> 
                   
                   </View> 

                  <View style={{ flex: 0.45, justifyContent: 'center', alignItems: 'center', marginTop:-50}}>
                      
                        <View>
                              <Text style={styles.title}>También puedes mandarnos un mail a: green.points.argentina@gmail.com</Text>
                        </View>
                                            
                  </View>

                  {(rol === 1) ? (
                  
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:-40,borderColor:'#69A03A',borderWidth: 3,width:'55%',padding:10,borderRadius:30}}>
                              <Ionicons name='gift-outline' size={50} color='#69A03A'/>  
                              <Text style={styles.title}>Recomienda la app a un amigo y obtendrás puntos extras</Text>                      
                        </View>
                  </View>
                  ) : (
                  <View></View>

                  )}

            </View>
      );
}

const styles = StyleSheet.create({
      title: {
            color: 'black',
            fontSize: 20,
            //fontWeight:'bold',
            marginHorizontal: 20,
            textAlign:'center',
            //marginBottom: 5
    
      }



})