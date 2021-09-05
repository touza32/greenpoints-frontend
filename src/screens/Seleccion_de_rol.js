import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import styleContainer from '../styles/Container';
import styleTextInput from '../styles/TextInput';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';


export default function Seleccion_de_rol({ navigation }) {
    return (
      <View> 

      <View style={[styleContainer.main, { flex: 4 }]}>

             <View style={[styleContainer.main, {marginTop: 600 }]}>
              
              <Text style={styleText.subtitle}>Socio Reciclador</Text>

        </View>

        <View style={[styleContainer.main, {marginTop: 60 }]}>
              
              <Text style={styleText.blackText}>El socio reciclador gana puntos reciclando para
                intercambiarlos por premios</Text>

        </View>

        <TouchableOpacity
              style={[styleButton.base, {marginTop: 60},] }
              onPress={() => navigation.navigate('RegistroSocioReciclador')}
              >
              <Text style={styleText.button}>REGISTRARSE COMO SOCIO RECICLADOR</Text>
        </TouchableOpacity>


       <View style={[styleContainer.main, { flex: 4, marginTop: 60 }]}>
              
              <Text style={styleText.blackText}> -------------------------------- o --------------------------------</Text>

        </View>

       <View style={[styleContainer.main, { flex: 4, marginTop: 80 }]}>
              
              <Text style={styleText.subtitle}>Punto de Reciclaje</Text>

        </View>

       <View style={[styleContainer.main, { flex: 4, marginTop: 60 }]}>
              
              <Text style={styleText.blackText}>El punto de reciclaje es el lugar 
                donde se puede reciclar</Text>

        </View>

        <TouchableOpacity
              style={[styleButton.base, { marginTop: 60 }] }
              onPress={() => navigation.navigate('RegistroPuntoReciclaje')}
              >
              <Text style={styleText.button}>REGISTRARSE COMO PUNTO DE RECICLAJE</Text>
       </TouchableOpacity>


       </View>


      </View>
    );
  }