import React, { useEffect } from 'react';
import styleContainer from '../styles/Container';
import styleText from '../styles/Text';
import { View, Image, Text } from 'react-native';

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

    <View style={[styleContainer.main, { flex: 4, marginBottom: 50 }]}>

      <View style={[styleContainer.main]}>
        <Image
          source={require('../assets/tilde.png')}
          style={{
            width: 170,
            height: 170
          }}>
        </Image>
        <Text style={styleText.blackText}>{message}</Text>

      </View>

    </View>

  );
}