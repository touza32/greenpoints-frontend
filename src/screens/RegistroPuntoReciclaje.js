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

const schema = yup.object().shape({
    userName: yup.string().required('Requerido'),
    password: yup.string().required('Requerido').matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,32}$/, 'La contraseña debe ser mayor o igual a 8 caracteres y debe contener al menos 1 mayúscula, 1 minúscula y un número'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'La contraseña debe coincidir').required('Requerido'),
    customerName: yup.string().required('Requerido'),
    document: yup.string().required('Requerido').transform(value => value.replace(/-/g, '')).min(11, 'El CUIT no es válido'),
});

export default function RegistroPuntoReciclaje( {navigation} ) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = () => {navigation.navigate('ConfirmarDireccion')}

    return (
        <View style={[styleContainer.main, { margin: 20 }]}>
            <InputForm
                control={control}
                errors={errors}
                name="userName"
                title="Nombre de usuario"
                placeholder="usuario"
            />
            <InputForm
                control={control}
                errors={errors}
                name="password"
                title="Contraseña"
                placeholder="Contraseña123"
                secureTextEntry={true}
            />
            <InputForm
                control={control}
                errors={errors}
                name="passwordConfirmation"
                title="Repetir contraseña"
                placeholder="Contraseña123"
                secureTextEntry={true}
            />
            <InputForm
                control={control}
                errors={errors}
                name="customerName"
                title="Nombre de la empresa"
                placeholder="Empresa"
            />
            <InputFormMask
                control={control}
                errors={errors}
                name="document"
                title="CUIT"
                type="datetime"
                maskOptions={{format: "99-99999999-9"}}
                placeholder="20-12345678-0"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styleButton.base} onPress={handleSubmit(onSubmit)}>
                <Text style={styleText.button}>SIGUIENTE</Text>
            </TouchableOpacity>
        </View>
    );
}