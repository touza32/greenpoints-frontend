import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import InputForm from "../../components/InputForm";
import { useForm } from "react-hook-form";
import styleButton from "../../styles/Button";
import styleText from "../../styles/Text";
import styleContainer from "../../styles/Container";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../api/greenPointsApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

const schema = yup.object().shape({
    email: yup.
        string().
        email('Correo electrónico inválido').
        required('Requerido')
});

export default function ResetPassword({ navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        console.log(data);
        await greenPointsApi.post('/usuario/reset', { email: data.email });
        navigation.navigate('Confirmacion', { nextScreen: 'LoginScreen', message: 'Ya te enviamos tu nueva contraseña' })
    }


    return (
        <KeyboardAwareScrollView
                contentContainerStyle={[styleContainer.main, {  paddingTop: 10 }]}
        >
              <Header
                        leftComponent={
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ marginLeft: -10 }}
                                    onPress={() => { navigation.navigate('LoginScreen') }}>
                                    <Ionicons name="chevron-back" size={35} color="white" />
                                </TouchableOpacity>
                                <Text
                                    style={[styleText.button, { width: '90%' }]}>REESTABLECER CONTRASEÑA</Text>
                            </View>
                        }
                        navigation={navigation}
                    />
            
            <View style={[styleContainer.main, { marginTop: 40, marginBottom: 40 }]}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={{
                        width: 170,
                        height: 170
                    }}>
                </Image>
            </View>
            <InputForm
                control={control}
                errors={errors}
                name="email"
                title="Correo electrónico"
                placeholder="ejemplo@dominio.com"
                keyboardType="email-address"
            />
            <TouchableOpacity style={[styleButton.base, { alignSelf: 'center', marginTop: 20 }]} onPress={handleSubmit(onSubmit)}>
                <Text style={styleText.button}>RESTABLECER CONTRASEÑA</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}