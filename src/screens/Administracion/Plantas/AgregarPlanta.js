import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Animated, FlatList } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../../components/InputForm";
import styleButton from "../../../styles/Button";
import styleText from "../../../styles/Text";
import styleTextInput from "../../../styles/TextInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../../api/greenPointsApi';
import Header from '../../../components/Header';
import ImagePicker from '../../../components/ImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const schema = yup.object().shape({
    nombre: yup.
        mixed().
        required('Requerido'),
    direccion: yup.
        mixed().
        required('Requerido'),
    descripcion: yup.
        mixed().
        required('Requerido'),
});  

export default function AgregarPlanta({ route, navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    }); 

    const onSubmit = async data => {  
        
        await greenPointsApi.post('/planta', {
            nombre: data.nombre,
            descripcion: data.descripcion,
            direccion: data.direccion,
            image: data.image,            
        });

        navigation.navigate('Confirmacion', { nextScreen: 'AdministrarPlantas', message: 'Se agregó exitosamente' })
    }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView stickyHeaderIndices={[0]}
            >
                    <Header navigation={navigation} title="NUEVA PLANTA" />
                    <View style={{ flex: 1, paddingBottom: 100 }}>
                        <ImagePicker
                            handleImage={(image) => setImage(image)}
                            marginVertical={25}
                        //defaultValue={image.uri}
                        />
                        <InputForm
                            control={control}
                            errors={errors}
                            name="nombre"
                            title="Nombre (*)"
                            placeholder="Nombre"
                        />

                        <InputForm
                            control={control}
                            errors={errors}
                            name="direccion"
                            title="Dirección (*)"
                            placeholder="Dirección"
                            style={[styleTextInput.large, { height: 110, textAlignVertical: 'top', padding: 10 }]}
                            multiline
                            editable
                            numberOfLines={5}
                            maxLength={180}
                        />
                        <InputForm
                            control={control}
                            errors={errors}
                            name="descripcion"
                            title="Descripción (*)"
                            placeholder="Descripción"
                            style={[styleTextInput.large, { height: 110, textAlignVertical: 'top', padding: 10 }]}
                            multiline
                            editable
                            numberOfLines={5}
                            maxLength={180}
                        />
                     
                        <TouchableOpacity
                            style={[styleButton.base, { alignSelf: 'center' }]}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styleText.button}>AGREGAR</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
        </View>
    );
}