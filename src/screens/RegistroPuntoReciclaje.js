import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../components/InputForm";
import styleButton from "../styles/Button";
import styleText from "../styles/Text";
import styleContainer from "../styles/Container";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    userName: yup.string().required('Requerido'),
    password: yup.string().required('Requerido'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'La contraseña debe coincidir').required('Requerido'),
    customerName: yup.string().required('Requerido'),
    document: yup.number().required('Requerido'),
});

export default function RegistroPuntoReciclaje( {navigation} ) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = () => {navigation.navigate('ConfirmarDireccion')}

    return (
        <View style={[styleContainer.main, { margin: 20 }]}>
            <InputForm
                control={control}
                errors={errors}
                name="userName"
                title="Nombre de usuario"
            />
            <InputForm
                control={control}
                errors={errors}
                name="password"
                title="Contraseña"
                secureTextEntry={true}
            />
            <InputForm
                control={control}
                errors={errors}
                name="passwordConfirmation"
                title="Repetir contraseña"
                secureTextEntry={true}
            />
            <InputForm
                control={control}
                errors={errors}
                name="customerName"
                title="Nombre de la empresa"
            />
            <InputForm
                control={control}
                errors={errors}
                name="document"
                title="CUIT"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styleButton.base} onPress={handleSubmit(onSubmit)}>
                <Text style={styleText.button}>SIGUIENTE</Text>
            </TouchableOpacity>
        </View>
    );
}