import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Animated } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../../components/InputForm";
import styleButton from "../../../styles/Button";
import styleText from "../../../styles/Text";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../../api/greenPointsApi';
import Header from '../../../components/Header';
import ImagePicker from '../../../components/ImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const schema = yup.object().shape({
    nombre: yup.
        mixed().
        required('Requerido')
});

export default function AgregarSponsor({ route, navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [image, setImage] = useState({});
    
    const onSubmit = async data => {
        if (image === null || image.cancelled) return;
        
        const objData = {
            ...data,
               image: image
        }
        console.log(objData)
        await greenPointsApi.post('/sponsor', {
            nombre: objData.nombre,
            image: objData.image
    });
    navigation.navigate('Confirmacion', { nextScreen: 'AdministrarSponsors', message: 'Se agregó exitosamente' })
}

    return (
        <KeyboardAwareScrollView
            stickyHeaderIndices={[0]}
        >
            <Header navigation={navigation} title="NUEVO SPONSOR" />
            <View style={{ flex: 1, paddingBottom: 100 }}>
                <ImagePicker
                    handleImage={(image) => setImage(image)}
                    marginVertical={25}
                />
                <View style={{ width: '80%', marginTop:-20,marginBottom:25,alignItems:'center' }}>
                    {image===null ? <Text style={{ color: 'red' }}>Imagen Requerida</Text> : <Text></Text>}
                </View>
                <InputForm
                    control={control}
                    errors={errors}
                    name="nombre"
                    title="Nombre (*)"
                    placeholder="Nombre"
                />
                
                <TouchableOpacity style={[styleButton.base, {marginTop:150, alignSelf: 'center' }]} 
                                  onPress={handleSubmit(onSubmit)}
                                  onPressIn={() => {
                                      if (image === undefined || image === null || Object.keys(image).length === 0) setImage(null)
                                  }}
                >
                    <Text style={styleText.button}>AGREGAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}
