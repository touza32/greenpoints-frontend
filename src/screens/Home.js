import React from 'react';
import styleContainer from '../styles/Container';
import styleTextInput from '../styles/TextInput';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import { View, Image, Text, TextInput, TouchableOpacity} from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={[styleContainer.main, { flex: 6 }]}>
            <View style={[styleContainer.main, { flex: 4, marginTop: 70 }]}>
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
                    style={[styleTextInput.large, { marginBottom: 15 }]}
                    placeholder='Usuario'
                />
                <TextInput
                    style={[styleTextInput.large, { marginBottom: 15 }]}
                    placeholder='Contraseña'
                />
                <TouchableOpacity
                    style={styleButton.base}
                    onPress={() => navigation.navigate('Premios')}
                >
                    <Text style={styleText.button}>INGRESAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    >
                    <Text style={styleText.blueTextUnderlined
                    }>Olvide mi contraseña</Text>
                </TouchableOpacity>

                <Text style={styleText.blackText}> -------------------------------- o --------------------------------</Text>


                <TouchableOpacity
                    style={styleButton.google}
                    onPress={() => navigation.navigate('Premios')}
                >
                    <Text style={styleText.buttongoogle}>Ingresar con Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Seleccion_de_rol')}
                >
                    <Text style={styleText.blueTextUnderlined
                    }>Registrate</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}