import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Animated, FlatList, Alert } from "react-native";
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
export default function EditarPlanta({ route, navigation }) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    }); 
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 5000,
                useNativeDriver: false
            }).start();
        });
    };
    const [planta, setPlanta] = useState({});
    const [image, setImage] = useState({});

    useEffect(() => {
        const { plantaId } = route.params;
        console.log(plantaId);
        (async () => {
            const plantaData = await greenPointsApi.get('/planta/' + plantaId);
            const planta = await plantaData.data;
            setPlanta(planta);
           
        })()
    }, [])

    useEffect(() => {
        reset({
            nombre: planta.nombre,
            direccion: planta.direccion,
            descripcion: planta.descripcion,
           
        })
    }, [planta]) 

     const onSubmit = async data => {
        //if (codigos.length === 0 || sponsor.nombre === '') return
       
        await greenPointsApi.put('/planta', {
            id: planta.id,
            nombre: data.nombre,    
            direccion: data.direccion,         
            descripcion: data.descripcion, 
            imagen: data.image           
           
        });
        navigation.navigate('Confirmacion', { nextScreen: 'AdministrarPlantas', message: 'Se actualizó exitosamente' })
    }

    const eliminarPlanta = () => {
        Alert.alert(
            'Desactivar planta',
            '¿Estás seguro que deseas desactivar esta planta?',
            [
                {
                    text: 'NO'
                },
                {
                    text: 'SI',
                    onPress: async () => {
                        await greenPointsApi.delete('/planta/' + planta.id)
                        navigation.navigate('Confirmacion', { nextScreen: 'AdministrarPlantas', message: 'Se desactivó exitosamente' })
                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView stickyHeaderIndices={[0]}>
                   <Header navigation={navigation} title="EDITAR PLANTA" />
                    <View style={{ flex: 1, paddingBottom: 100, marginTop: 30 }}>
                       
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
                            title="Direccion (*)"
                            placeholder="Direccion"
                            editable
                            maxLength={128}
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
                            maxLength={128}
                        />                                         
                        <TouchableOpacity
                            style={[styleButton.base, { alignSelf: 'center' }]}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styleText.button}>{ planta.activo ? 'ACTUALIZAR' : 'ACTIVAR' }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                planta.activo ?
                                    [styleButton.base, { alignSelf: 'center', backgroundColor: 'red', marginTop: 20 }] : 
                                    [styleButton.base, { alignSelf: 'center', backgroundColor: 'gray', marginTop: 20 }]}
                            disabled={ planta.activo ? false: true }
                            onPress={() => eliminarPlanta()}
                        >
                            <Text style={styleText.button}>DESACTIVAR</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
        </View>
    );
}