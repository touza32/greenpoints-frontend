import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import InputFormDate from "../../components/InputFormDate";
import styleButton from "../../styles/Button";
import styleText from "../../styles/Text";
import styleTextInput from "../../styles/TextInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../api/greenPointsApi';
import Header from '../../components/Header';
import ImagePicker from '../../components/ImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const schema = yup.object().shape({
    nombre: yup.
        mixed().
        required('Requerido'),
    sponsor: yup.
        mixed().
        required('Requerido'),
    descripcion: yup.
        mixed().
        required('Requerido'),
    puntos: yup.
        number().
        required('Requerido'),
    fechaInicio: yup.
        mixed().transform(e => e.toISOString().slice(8, 10) + e.toISOString().slice(4, 8) + e.toISOString().slice(0, 4)).
        required('Requerido'),
    fechaVto: yup.
        mixed().transform(e => e.toISOString().slice(8, 10) + e.toISOString().slice(4, 8) + e.toISOString().slice(0, 4)).
        required('Requerido')
});

export default function AgregarPremio({ navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [image, setImage] = useState({})

    const onSubmit = async data => {
        console.log(data)
        // await greenPointsApi.post('/alta-premio', {
        //     nombre: data.nombre,
        // })
        //navigation.navigate('Confirmacion', { nextScreen: 'AgregarPremio', message: 'Su registro ha sido exitoso' })
    }

    return (
        <KeyboardAwareScrollView
            stickyHeaderIndices={[0]}
        >
            <Header navigation={navigation} title="NUEVO PREMIO" />
            <View style={{ flex: 1, paddingBottom: 100 }}>
                <ImagePicker
                    handleImage={(image) => setImage(image)}
                    marginVertical={25}
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="nombre"
                    title="Nombre"
                    placeholder="Nombre"
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="sponsor"
                    title="Sponsor"
                    placeholder="Sponsor"
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="descripcion"
                    title="Descripción"
                    placeholder="Descripción"
                    style={[styleTextInput.large, { height: 110, textAlignVertical: 'top', padding: 10 }]}
                    multiline
                    editable
                    numberOfLines={5}
                    maxLength={180}
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="puntos"
                    title="Puntos para obtenerlo"
                    placeholder="0"
                    keyboardType="numeric"
                />
                <InputFormDate
                    control={control}
                    errors={errors}
                    name="fechaInicio"
                    title="Fecha de inicio"
                />
                <InputFormDate
                    control={control}
                    errors={errors}
                    name="fechaVto"
                    title="Fecha de caducidad"
                />
                <TouchableOpacity style={[styleButton.base, { alignSelf: 'center' }]} onPress={() => console.log(image)}>
                    <Text style={styleText.button}>AGREGAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}