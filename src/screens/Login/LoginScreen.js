import React, { useContext, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Alert
} from 'react-native';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// styles
import styleContainer from '../../styles/Container';
import styleTextInput from '../../styles/TextInput';
import styleText from '../../styles/Text';
import styleButton from '../../styles/Button';

export default function LoginScreen({ navigation }) {

    const { signIn, logOut, errorMessage, removeError } = useContext(AuthContext);

    const { user, password, onChange } = useForm({
        user: '',
        password: ''
    });

    useEffect(() => {
        logOut();
    }, [])

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Error',
            errorMessage,
            [
                {
                    text: 'Ok',
                    onPress: removeError
                }
            ]);
    }, [errorMessage])

    const onLogin = () => {
        Keyboard.dismiss();
        signIn(user, password);
    };

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
                <View style={[styleContainer.main, { marginTop: 10, marginBottom: 20 }]}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={{
                            width: 170,
                            height: 170
                        }}>
                    </Image>
                    <Text style={styleText.title}>Green Points</Text>
                </View>
                <View style={styleContainer.main}>
                    <TextInput
                        style={[styleTextInput.large, { marginBottom: 10 }]}
                        placeholder='Usuario/correo electrónico'
                        onChangeText={(value) => onChange(value, 'user')}
                        value={user}
                    />
                    <TextInput
                        style={[styleTextInput.large, { marginBottom: 10 }]}
                        placeholder='Contraseña'
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styleButton.base}
                        onPress={onLogin}
                    >
                        <Text style={styleText.button}>INGRESAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SeleccionRol')}
                    >
                        <Text style={styleText.blueTextUnderlined}>Regístrate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPassword')}
                    >
                        <Text style={styleText.blueTextUnderlined}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                   
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
