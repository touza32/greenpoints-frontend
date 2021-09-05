import React, { useContext } from 'react';
import { 
    View, 
    Image, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import styleContainer from '../styles/Container';
import styleTextInput from '../styles/TextInput';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

export default function Home({ navigation }) {

    const { signIn } = useContext( AuthContext );

    const { user, password, onChange } = useForm({
        user: '',
        password: ''
    });

    const onLogin = () => {
        Keyboard.dismiss();
        signIn( user, password );
    };

    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <KeyboardAvoidingView 
                behavior='padding'
            >
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
                        onChangeText={ (value) => onChange(value, 'user') }
                        value = { user }
                    />
                    <TextInput
                        style={[styleTextInput.large, { marginBottom: 10 }]}
                        placeholder='Contraseña'
                        onChangeText={ (value) => onChange(value, 'password') }
                        value = { password }
                    />
                    <TouchableOpacity
                        style={styleButton.base}
                        onPress={ onLogin }
                    >
                        <Text style={styleText.button}>INGRESAR</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Premios')}
                    >
                        <Text style={styleText.blueTextUnderlined
                        }>Olvide mi contraseña</Text>
                    </TouchableOpacity>

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
            </KeyboardAvoidingView>
           
        </View>
    );
}