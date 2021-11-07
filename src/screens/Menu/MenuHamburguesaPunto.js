import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

export default function MenuHamburguesaPunto({ navigation }) {

  const { logOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: '#69A03A' }}>
      <Header
        leftContainerStyle={{ flex: 1, justifyContent: 'center', marginTop: -10 }}
        centerContainerStyle={{ flex: 2, justifyContent: 'center', marginTop: -10 }}
        rightContainerStyle={{ flex: 1 }}
        backgroundColor="#69A03A"
        leftComponent={
          <TouchableOpacity onPress={() => { navigation.navigate('PuntoMenuScreen'); }}>
            <Ionicons name='chevron-back' size={35} style={{ color: 'white' }} />
          </TouchableOpacity>
        }
        centerComponent={{ text: 'GREEN POINTS', style: { color: 'white', fontWeight: "bold", fontSize: 22 } }}
      />
      <View style={{ flex: 0.4, justifyContent: 'space-evenly', backgroundColor: '#69A03A', marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() => { navigation.navigate('PuntoActualizar')}}
        >
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <View style={styles.iconContainer}>
              <Ionicons name='person-circle' size={50} style={{ color: 'white', marginLeft: 4 }} />
            </View>
            <Text style={styles.textOption}>Actualizar Datos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contacto')} >
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <View style={styles.iconContainer}>
              <Ionicons name='help-circle' size={55} style={{ color: 'white' }} />
            </View>
            <Text style={styles.textOption}>Contáctanos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut} >
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <View style={styles.iconContainer}>
              <Ionicons name='exit' size={50} style={{ color: 'white', marginLeft: 9 }} />
            </View>
            <Text style={styles.textOption}>Salir</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.6, backgroundColor: 'white' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 70,
    height: 70
  },
  textOption: {
    textAlign: 'left',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  }
})