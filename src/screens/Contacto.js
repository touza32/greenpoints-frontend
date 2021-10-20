import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import { Divider } from 'react-native-elements';
import Header from '../components/Header';
import FAIcon from 'react-native-vector-icons/FontAwesome';  


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
      return (
            <View style={{ flex: 1 }}>
                  <Header navigation={navigation} title="" />
                  
                  <View style={{ flex: 0.45, justifyContent: 'space-around', alignItems: 'center' }}>
                        
                        <View>
                              <Text style={styleText.blackText}>Contáctanos y con gusto nos comunicaremos 
                               de inmediato!! 
                              </Text>
                              <Text style={styleText.blackText}>Nos encontramos en las redes sociales. 
                              </Text>

                        </View>
                        
                  </View>

                   <View style={{flexDirection: "row",justifyContent: 'space-around', alignItems: 'center'}}>
                   
                   <Image style={styleImage.stretch} source={require('../assets/Whatsapp.png')}>
                   </Image> 
                   <Image style={styleImage.stretch} source={require('../assets/Twitter.png')}>
                   </Image> 
                   
                   </View> 

                   <View style={{flexDirection: "row",justifyContent: 'space-around', alignItems: 'center',  marginTop: '10%' }}>
                   
                   <Image style={styleImage.stretch} source={require('../assets/Instagram.png')}>
                   </Image> 
                   <Image style={styleImage.stretch} source={require('../assets/Facebook.png')}>
                   </Image> 
                   
                   </View> 

                  <View style={{ flex: 0.45, justifyContent: 'space-around', alignItems: 'center', marginBottom: '8%', margintop: '10%' }}>
                      
                        <View>
                              <Text style={styleText.blackText}>También puedes mandarnos un mail a: contacto@greenpoints.com.ar</Text>
                        </View>
                                            
                  </View>
            </View>
      );
}