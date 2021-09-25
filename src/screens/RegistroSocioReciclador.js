import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../components/InputForm";
import InputFormMask from "../components/InputFormMask";
import styleButton from "../styles/Button";
import styleText from "../styles/Text";
import styleContainer from "../styles/Container";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../api/greenPointsApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const schema = yup.object().shape({
    email: yup.
        string().
        email('Correo electrónico inválido').
        required('Requerido'),
    password: yup.
        string().
        required('Requerido').
        matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,32}$/, 'La contraseña debe ser mayor o igual a 8 caracteres y debe contener al menos 1 mayúscula, 1 minúscula y 1 número'),
    passwordConfirmation: yup.
        string().
        oneOf([yup.ref('password'), null], 'La contraseña debe coincidir').
        required('Requerido'),
    firstName: yup.
        string().
        required('Requerido'),
    lastName: yup.
        string().
        required('Requerido'),
    birthDate: yup.
        string().
        required('Requerido')
});

export default function RegistroSocioReciclador({ navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        await greenPointsApi.post('/usuario/socio-reciclador', {
            birthDate: data.birthDate,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        })
        navigation.navigate('Confirmacion', { nextScreen: 'LoginScreen', message: 'Su registro ha sido exitoso' })
    }


    return (
        <KeyboardAwareScrollView
        contentContainerStyle={[styleContainer.main, {padding:20, paddingTop:5}]}
        >
            <InputForm
                control={control}
                errors={errors}
                name="email"
                title="Correo electrónico"
                placeholder="ejemplo@dominio.com"
            />
            <InputForm
                control={control}
                errors={errors}
                name="password"
                title="Contraseña"
                secureTextEntry={true}
                placeholder="Contraseña123"
            />
            <InputForm
                control={control}
                errors={errors}
                name="passwordConfirmation"
                title="Repetir contraseña"
                secureTextEntry={true}
                placeholder="Contraseña123"
            />
            <InputForm
                control={control}
                errors={errors}
                name="firstName"
                title="Nombre"
                placeholder="Nombre"
            />
            <InputForm
                control={control}
                errors={errors}
                name="lastName"
                title="Apellido"
                placeholder="Apellido"
            />
            <InputFormMask
                control={control}
                errors={errors}
                name="birthDate"
                title="Fecha de nacimiento"
                type="datetime"
                maskOptions={{ format: "DD-MM-YYYY" }}
                placeholder="31-12-1999"
                keyboardType="numeric"
            />
            <TouchableOpacity style={[styleButton.base,{alignSelf:'center'}]} onPress={handleSubmit(onSubmit)}>
                <Text style={styleText.button}>FINALIZAR</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}