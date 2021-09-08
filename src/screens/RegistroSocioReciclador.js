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
    email: yup.string().email('Correo electrónico inválido').required('Requerido'),
    password: yup.string().required('Requerido').matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,32}$/, 'La contraseña debe ser mayor o igual a 8 caracteres y debe contener al menos 1 mayúscula, 1 minúscula y un número'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'La contraseña debe coincidir').required('Requerido'),
    firstName: yup.string().required('Requerido'),
    lastName: yup.string().required('Requerido'),
    birthDate: yup.string('Fecha inválida').required('Requerido')
});

export default function RegistroSocioReciclador() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => console.log(data);

    return (
        <View style={[styleContainer.main, { margin: 20 }]}>
            <InputForm
                control={control}
                errors={errors}
                name="email"
                title="Correo electrónico"
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
                name="firstName"
                title="Nombre"
            />
            <InputForm
                control={control}
                errors={errors}
                name="lastName"
                title="Apellido"
            />
            <InputFormMask
                control={control}
                errors={errors}
                name="birthDate"
                title="Fecha de nacimiento"
                mask="99-99-9999"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styleButton.base} onPress={handleSubmit(onSubmit)}>
                <Text style={styleText.button}>FINALIZAR</Text>
            </TouchableOpacity>
        </View>
    );
}