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
                contentContainerStyle={[styleContainer.main, { padding: 20, paddingTop: 5 }]}
        >
            <View style={[styleContainer.main, { marginTop: 10, marginBottom: 40 }]}>
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