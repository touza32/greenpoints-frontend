import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useForm } from "react-hook-form";
import Header from '../../components/Header';
import { AuthContext } from '../../context/AuthContext';
import InputForm from '../../components/InputForm';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import greenPointsApi from '../../api/greenPointsApi';
import styleButton from '../../styles/Button';
import styleText from '../../styles/Text'

const schema = yup.object().shape({
    passwordOld: yup.
        string().
        required('Requerido'),
    password: yup.
        string().
        required('Requerido').
        matches(/^.{8,32}$/, 'Contraseña muy débil: debe ser mayor o igual a 8 caracteres').
        matches(/^(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ]).{8,32}$/, 'Contraseña débil: debe tener al menos una minúscula y una mayúscula').
        matches(/^(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ])(?=.*\d).{8,}$/, 'Contraseña moderada: debe tener al menos un número'),
    passwordConfirmation: yup.
        string().
        oneOf([yup.ref('password'), null], 'La contraseña debe coincidir').
        required('Requerido'),
});

export default function ActualizarPassword({ navigation }) {

    const { user } = useContext(AuthContext);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        const response = await greenPointsApi.put('/usuario', { ...data, username: user })
            .catch(function (error) {
                if (error.response.status === 400) {
                    Alert.alert('Error', 'Contraseña anterior incorrecta')
                }
            })
        response && navigation.navigate('Confirmacion', { nextScreen: 'MenuHamburguesa', message: 'Cambio de contraseña exitoso' })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header navigation={navigation} title="CAMBIAR CONTRASEÑA" />
            <View style={{ flex: 1, alignItems: 'center', marginTop: 20, width: '80%' }}>
                <InputForm
                    control={control}
                    errors={errors}
                    name="passwordOld"
                    title="Contraseña anterior (*)"
                    secureTextEntry={true}
                    placeholder="Contraseña123"
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="password"
                    title="Contraseña nueva (*)"
                    secureTextEntry={true}
                    placeholder="Contraseña123"
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="passwordConfirmation"
                    title="Repetir contraseña (*)"
                    secureTextEntry={true}
                    placeholder="Contraseña123"
                />
                <TouchableOpacity
                    style={[styleButton.base, { marginTop: 20 }]}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styleText.button}>ACTUALIZAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
