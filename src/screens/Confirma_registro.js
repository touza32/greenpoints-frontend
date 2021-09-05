import React from 'react';
import styleContainer from '../styles/Container';
import styleText from '../styles/Text';
import { View, Image, Text} from 'react-native';

export default function Confirma_registro() {
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
            <Text style={styleText.blackText}>Su registro ha sido exitoso</Text>
            
        </View>
      
      </View>

    );
  }