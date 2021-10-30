import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Animated } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../../components/InputForm";
import InputFormDate from "../../../components/InputFormDate";
import styleButton from "../../../styles/Button";
import styleText from "../../../styles/Text";
import styleTextInput from "../../../styles/TextInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../../api/greenPointsApi';
import Header from '../../../components/Header';
import ImagePicker from '../../../components/ImagePicker';
import Moment from 'moment';
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
    observacion: yup.
        mixed(),
    puntos: yup.
        number().
        min(0, 'Debe ser mayor o igual a 0').
        required('Requerido'),
    fechaInicio: yup.
        mixed().transform(e => e.toISOString().slice(8, 10) + e.toISOString().slice(4, 8) + e.toISOString().slice(0, 4)).
        required('Requerido'),
    fechaVto: yup.
        mixed().transform(e => e.toISOString().slice(8, 10) + e.toISOString().slice(4, 8) + e.toISOString().slice(0, 4))
});

export default function AgregarPremio({ route, navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => route.params?.codigos && setCodigos(route.params?.codigos), [route.params?.codigos])

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

    const [image, setImage] = useState({});
    const [codigo, setCodigo] = useState('');
    const [codigos, setCodigos] = useState([]);
    const [errorCodigo, setErrorCodigo] = useState(false);

    const onSubmit = async data => {
        if (codigos.length === 0) return setErrorCodigo(true)
        const objData = {
            ...data,
            codigos: codigos,
            image: image
        }
        
        await greenPointsApi.post('/premio', {
            nombre: objData.nombre,
            sponsor: objData.sponsor,
            puntos: objData.puntos,
            descripcion: objData.descripcion,
            observacion: objData.observacion,
            fechaInicio: objData.fechaInicio,
            fechaVto: objData.fechaVto,
            image: objData.image,
            codigos: objData.codigos
        });
        navigation.navigate('Confirmacion', { nextScreen: 'AgregarPremio', message: 'Su registro ha sido exitoso' })
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
                    title="Nombre (*)"
                    placeholder="Nombre"
                />
                <InputForm
                    control={control}
                    errors={errors}
                    name="sponsor"
                    title="Sponsor (*)"
                    placeholder="Sponsor"
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
                <InputForm
                    control={control}
                    errors={errors}
                    name="observacion"
                    title="Observación"
                    placeholder="Disponible en todos los locales"
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
                    title="Puntos para obtenerlo (*)"
                    placeholder="0"
                    style={[styleTextInput.small]}
                    containerStyle={{ marginRight: 116 }}
                    keyboardType="numeric"
                />
                <InputFormDate
                    control={control}
                    errors={errors}
                    name="fechaInicio"
                    title="Fecha de inicio (*)"
                />
                <InputFormDate
                    control={control}
                    errors={errors}
                    name="fechaVto"
                    title="Fecha de caducidad"
                    minDate={Moment().format('yyyy-MM-DD')}
                />
                <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <View>
                        <Text style={styleTextInput.title}>Código (*)</Text>
                        <TextInput
                            placeholder="Código"
                            style={[styleTextInput.medium, { width: 200 }]}
                            value={codigo}
                            onChangeText={setCodigo}
                        />
                        <Animated.Text style={{ opacity: fadeAnim, color: 'orange', fontWeight: 'bold' }}>Código añadido</Animated.Text>
                        <Text>Códigos activos: {codigos.length}</Text>
                    </View>
                    {codigo !== ''
                        ?
                        <TouchableOpacity
                            style={[styleButton.base, styleButton.plus, { marginTop: 32, marginLeft: 60 }]}
                            onPress={() => {
                                fadeOut()
                                setCodigos([...codigos, codigo])
                                errorCodigo && setErrorCodigo(false)
                                setCodigo('')
                            }
                            }
                        >
                            <Text style={[styleText.button, { fontSize: 30 }]}>+</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={[styleButton.base, styleButton.plus, { marginTop: 32, marginLeft: 60, backgroundColor: 'gray' }]}
                        >
                            <Text style={[styleText.button, { fontSize: 30 }]}>+</Text>
                        </TouchableOpacity>
                    }
                </View>
                {errorCodigo && <Text style={{ textAlign: 'center', marginRight: 55, color: 'red' }}>Debe poseer al menos un código activo</Text>}
                <TouchableOpacity
                    style={{ marginVertical: 20 }}
                    onPress={() => navigation.navigate('VerCodigos', { codigos })}
                >
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'blue', textDecorationLine: 'underline' }}>
                        VER CÓDIGOS
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styleButton.base, { alignSelf: 'center' }]} onPress={handleSubmit(onSubmit)}>
                    <Text style={styleText.button}>AGREGAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}