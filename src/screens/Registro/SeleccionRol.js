import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styleText from '../../styles/Text';
import styleButton from '../../styles/Button';
import { Divider } from 'react-native-elements';
import Header from '../../components/Header';  
import { Ionicons } from '@expo/vector-icons';

export default function SeleccionRol({ navigation }) {
      return (
            <View style={{ flex: 1 }}>
                     <Header
                        leftComponent={
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ marginLeft: -10 }}
                                    onPress={() => { navigation.navigate('LoginScreen') }}>
                                    <Ionicons name="chevron-back" size={35} color="white" />
                                </TouchableOpacity>
                                <Text
                                    style={[styleText.button, { width: '90%' }]}>SELECCIÓN DE ROL</Text>
                            </View>
                        }
                        navigation={navigation}
                    />
            
                  
                  <View style={{ flex: 0.45, justifyContent: 'space-around', alignItems: 'center', marginTop: '5%' }}>
                        <View>
                              <Text style={styleText.subtitle}>Socio Reciclador</Text>
                        </View>
                        <View>
                              <Text style={styleText.blackText}>El socio reciclador gana puntos reciclando para
                                    intercambiarlos por premios</Text>
                        </View>
                        <TouchableOpacity
                              style={styleButton.base}
                              onPress={() => navigation.navigate('RegistroSocioReciclador')}
                        >
                              <Text style={styleText.button}>REGISTRARSE</Text>
                        </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.1, justifyContent: 'center', marginHorizontal: '5%' }}>
                        <Divider orientation="horizontal" width={2} />
                  </View>
                  <View style={{ flex: 0.45, justifyContent: 'space-around', alignItems: 'center', marginBottom: '8%' }}>
                        <View>
                              <Text style={styleText.subtitle}>Punto de Reciclaje</Text>
                        </View>
                        <View>
                              <Text style={styleText.blackText}>El punto de reciclaje es el lugar
                                    donde se puede reciclar</Text>
                        </View>
                        <TouchableOpacity
                              style={[styleButton.base]}
                              onPress={() => navigation.navigate('RegistroPuntoReciclaje')}
                        >
                              <Text style={styleText.button}>REGISTRARSE</Text>
                        </TouchableOpacity>
                  </View>
            </View>
      );
}