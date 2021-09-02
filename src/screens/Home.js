import React from 'react';
import styleContainer from '../styles/Container';
import styleTextInput from '../styles/TextInput';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import { View, Image, Text, TextInput, TouchableOpacity} from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <View style={[styleContainer.main, { flex: 4, marginTop: 50 }]}>
                <Image
                    source={require('../assets/icon.png')}
                    style={{
                        width: 170,
                        height: 170
                    }}>
                </Image>
                <Text style={styleText.title}>Green Points</Text>
            </View>
            <View style={[styleContainer.main, { flex: 6 }]}>
                <TextInput
                    style={[styleTextInput.large, { marginBottom: 10 }]}
                    placeholder='Usuario'
                />
                <TextInput
                    style={[styleTextInput.large, { marginBottom: 10 }]}
                    placeholder='Contraseña'
                />
                <TouchableOpacity
                    style={styleButton.base}
                    onPress={() => navigation.navigate('Premios')}
                >
                    <Text style={styleText.button}>INGRESAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Premios')}
                >
                    <Text style={styleText.blueTextUnderlined
                    }>Olvide mi contraseña</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}