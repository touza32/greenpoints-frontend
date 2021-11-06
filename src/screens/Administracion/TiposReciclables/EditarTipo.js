import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image,StyleSheet,Alert} from "react-native";
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
import { Ionicons } from '@expo/vector-icons';


const schema = yup.object().shape({
    nombre: yup.
        mixed().
        required('Requerido'),
    points: yup.
        number().
        min(0, 'Debe ser mayor o igual a 0').
        required('Requerido')
});

export default function EditarTipo({ route, navigation }) {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [tipoReciclable, setTipoReciclable] = useState({});
    const [image, setImage] = useState({});
    const [ErrorImagen, setErrorImagen] = useState(false);
    

    useEffect(()=>{
        const {id} = route.params;

        (async () => {
            const tipoData = await greenPointsApi.get(`/tipo-reciclable/${ id }`);
            const tipoReciclable = await tipoData.data;
            setTipoReciclable({ 
                ...tipoReciclable,
                points: tipoReciclable.points.toString()
            });
        })();
    },[]);

    useEffect(() => {
        reset({
            nombre: tipoReciclable.nombre,
            points: tipoReciclable.points,
            activo: tipoReciclable.activo
        })
    }, [tipoReciclable])

    const onSubmit = async data => {
        const objData = {
            ...data,
               image: image
        }
        
        await greenPointsApi.put('/tipo-reciclable', {
            id: tipoReciclable.id,
            nombre: objData.nombre,
            points: objData.points,
            imageData: objData.image,
            activo: objData.activo

        });
        {tipoReciclable.activo ?
            navigation.navigate('Confirmacion', { nextScreen: 'AdministrarTipos', message: 'Se actualizó exitosamente' })
        :
            navigation.navigate('Confirmacion', { nextScreen: 'AdministrarTipos', message: 'Se activó exitosamente' })
        }
    }

    const desactivarTipoReciclable = () => {
        Alert.alert(
            'Desactivar Tipo de Reciclable',
            '¿Estas seguro que deseas desactivar este Tipo de Reciclable?',
            [
                {
                    text: 'NO'
                },
                {
                    text: 'SI',
                    onPress: async () => {
                        await greenPointsApi.delete('/tipo-reciclable/' + tipoReciclable.id)
                        navigation.navigate('Confirmacion', { nextScreen: 'AdministrarTipos', message: 'Se desactivó exitosamente' })
                    }
                }
            ]
        )
    }

    return (
        <KeyboardAwareScrollView
            stickyHeaderIndices={[0]}
        >
            <Header
            leftComponent={
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ marginLeft: -10 }}
                        onPress={() => { navigation.navigate('AdministrarTipos') }}>
                        <Ionicons name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text
                        style={[styleText.button, { width: '90%' }]}>EDITAR TIPO DE RECICLABLE</Text>
                </View>
            }
            navigation={navigation}
        /> 
            <View style={{ flex: 1, paddingBottom: 100 }}>
                <View>
                        <ImagePicker
                        handleImage={(image) => setImage(image)}
                        marginVertical={25}
                        defaultValue={tipoReciclable.imagen}
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
                            name="points"
                            title="Puntos para obtenerlo (*)"
                            placeholder="0"
                            style={[styleTextInput.small]}
                            containerStyle={{ marginRight: 116 }}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={[styleButton.base, { alignSelf: 'center' }]}
                            onPress={handleSubmit(onSubmit)}
                            onPressIn={() => {
                                if (image === undefined || image === null || Object.keys(image).length === 0) setImage(null)
                                }}
                            >
                            <Text style={styleText.button}>{ tipoReciclable.activo ? 'ACTUALIZAR' : 'ACTIVAR' }</Text>  
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                tipoReciclable.activo ?
                                    [styleButton.base, { alignSelf: 'center', backgroundColor: 'red', marginTop: 20 }] : 
                                    [styleButton.base, { alignSelf: 'center', backgroundColor: 'gray', marginTop: 20 }]}
                            disabled={ tipoReciclable.activo ? false: true }
                            onPress={() => desactivarTipoReciclable()} 
                        >
                            <Text style={styleText.button}>DESACTIVAR</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 260,
        height: 180,
        alignSelf: 'center',
        marginTop: 10
    },
    box: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 25
    },
    TextInput: {
        height:40,
        width: 300,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
    }
})
