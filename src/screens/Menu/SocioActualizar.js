import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm } from "react-hook-form";
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import InputForm from '../../components/InputForm';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styleTextInput from '../../styles/TextInput';
import styleButton from '../../styles/Button';
import styleText from '../../styles/Text'

const schema = yup.object().shape({
    nombre: yup.
        string().
        matches(/^[^!$%^&@*()_+|~=`{}\[\]:";'<>?,.\/0-9]+$/, 'Nombre inválido').
        required('Requerido'),
    apellido: yup.
        string().
        matches(/^[^!$%^&@*()_+|~=`{}\[\]:";'<>?,.\/0-9]+$/, 'Nombre inválido').
        required('Requerido'),
});

export default function SocioActualizar({ navigation }) {

    const { logOut, id } = useContext(AuthContext);

    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const data = {
        nombre: 'Carlos',
        apellido: 'Darwin',
        correo: 'elcharlesdeadrogue@gmail.com',
        fechaNac: '01/01/1500'
    }

    useEffect(() => {
        reset({
            nombre: data.nombre,
            apellido: data.apellido
        })
    }, [])

    const onSubmit = () => { console.log({ ...data, id }) }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header navigation={navigation} title="ACTUALIZAR DATOS" />
            <View style={{ flex: 0.8 }}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={styleTextInput.title}>Correo electrónico</Text>
                    <TextInput style={styleTextInput.large}
                        value={data.correo}
                        editable={false}
                    />
                </View>
                <InputForm
                    control={control}
                    errors={errors}
                    name="nombre"
                    title="Nombre (*)"
                    defaultValue={data.nombre}
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="apellido"
                    title="Apellido (*)"
                    defaultValue={data.apellido}
                />
                <View style={{ marginBottom: 40 }}>
                    <Text style={styleTextInput.title}>Fecha de nacimiento</Text>
                    <TextInput style={styleTextInput.large}
                        value={data.fechaNac}
                        editable={false}
                    />
                </View>
                <TouchableOpacity
                    style={[styleButton.base]}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styleText.button}>ACTUALIZAR</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{ flex: 0.2, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}
                onPress={() =>
                    Alert.alert(
                        'Confirmar',
                        '¿Estás seguro que quieres darte de baja?',
                        [
                            {
                                text: 'NO'
                            },
                            {
                                text: 'SI',
                                onPress: () => {
                                    Alert.alert('Confirmación', 'La baja fue procesada correctamente')
                                    logOut()
                                }
                            }
                        ]
                    )}
            >
                <Ionicons name='close-circle' size={30} color="red" />
                <Text style={{ color: 'gray', textDecorationLine: 'underline', fontWeight: 'bold' }}>Quiero darme de baja</Text>
            </TouchableOpacity>
        </View>
    )
}