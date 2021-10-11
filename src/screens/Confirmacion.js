import React, { useEffect } from 'react';
import * as styles from '../styles';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//NOTA:
//Se modifica para que sea un componente reutilizable
//Cuando se invoque esta pantalla con "navigate" hay que pasar un 
//objeto con 2 props:   nextScreen (indica la próxima pantalla)
//                      message (mensaje para mostrar)
//EJ: navigation.navigate('Confirmacion', {nextScreen: 'pantalla', message: 'Resultado exitoso'})

export default function Confirma_registro({ route, navigation }) {

  useEffect(() => {
    const delay = setInterval(() => {
      navigation.navigate(nextScreen)
    }, 3000)
    return () => clearInterval(delay)
  }, [])

  const { nextScreen, message } = route.params

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <View style={[styles.Container.main, { flex: 1, marginBottom: 50 }]}>
        <Ionicons name='checkmark-circle-outline' size={175} color="#69A03A" style={{ marginLeft: 15 }} />
        <Text style={[styles.Text.titleList, { fontSize: 20, fontWeight: 'normal' }]}>{message}</Text>
      </View>
    </View>
  );
}