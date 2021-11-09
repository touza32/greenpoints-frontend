import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Animated, FlatList, Alert } from "react-native";
import { Input } from 'react-native-elements';
import { useForm } from "react-hook-form";
import InputForm from "../../../components/InputForm";
import InputFormDate from "../../../components/InputFormDate";
import styleButton from "../../../styles/Button";
import styleText from "../../../styles/Text";
import styleTextInput from "../../../styles/TextInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Ionicons } from '@expo/vector-icons';
import greenPointsApi from '../../../api/greenPointsApi';
import Header from '../../../components/Header';
import ImagePicker from '../../../components/ImagePicker';
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const schema = yup.object().shape({
    nombre: yup.
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
        mixed().transform(value => Moment(value).format('DD-MM-yyyy')).
        required('Requerido'),
    fechaVto: yup.
        mixed().transform(value => Moment(value).format('DD-MM-yyyy'))
});

export default function AgregarPremio({ route, navigation }) {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
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

    const [premio, setPremio] = useState({});

    const [image, setImage] = useState({});
    const [codigo, setCodigo] = useState('');
    const [codigos, setCodigos] = useState([]);
    const [errorCodigo, setErrorCodigo] = useState(false);

    const [sponsorFocus, setSponsorFocus] = useState(false);
    const [sponsorsAll, setSponsorsAll] = useState([]);
    const [sponsor, setSponsor] = useState({});
    const [sponsors, setSponsors] = useState([]);
    const [query, setQuery] = useState('');
    const [errorSponsor, setErrorSponsor] = useState(false);

    useEffect(() => {

        (async () => {
            const sponsorsData = await greenPointsApi.get('/sponsor');
            const sponsors = await sponsorsData.data;
            setSponsorsAll(sponsors);
        })()

        const { premioId } = route.params;

        (async () => {
            const premioData = await greenPointsApi.get(`/premio/${premioId}?admin=true`);
            const premio = await premioData.data;
            setPremio({
                ...premio,
                puntos: premio.puntos.toString(),
                desde: new Date(premio.desde),
                hasta: new Date(premio.hasta),
            })
            setCodigos(premio.codigos)
        })()
    }, [])

    useEffect(() => {
        const sponsor = sponsorsAll.filter(item => item.id === premio.sponsorId)
        if (sponsor[0] !== undefined) {
            setSponsor(sponsor[0])
        }
    }, [sponsorsAll, premio])

    useEffect(() => {
        reset({
            nombre: premio.name,
            descripcion: premio.description,
            observacion: premio.observacion,
            puntos: premio.puntos,
            fechaInicio: premio.desde
        }, premio.hasta !== null && { fechaVto: premio.hasta })
    }, [premio])

    useEffect(() => { if (codigos.length > 0) setErrorCodigo(false) }, [codigos])

    const onSubmit = async data => {
        if (codigos.length === 0 || sponsor.nombre === '') return
        const objData = {
            ...data,
            codigos: codigos,
            image: image,
            sponsor: sponsor.id
        }

        await greenPointsApi.put('/premio', {
            id: premio.id,
            name: objData.nombre,
            sponsorId: objData.sponsor,
            puntos: objData.puntos,
            description: objData.descripcion,
            observacion: objData.observacion,
            desde: objData.fechaInicio ? Moment(objData.fechaInicio, 'DD-MM-YYYY') : null,
            hasta: objData.fechaVto ? Moment(objData.fechaVto, 'DD-MM-YYYY') : null,
            imageData: objData.image,
            codigos: objData.codigos
        });
        navigation.navigate('Confirmacion', { nextScreen: 'AdministrarPremios', message: 'Se actualizó exitosamente' })
    }

    const eliminarPremio = () => {
        Alert.alert(
            'Eliminar premio',
            '¿Estas seguro que deseas eliminar este premio?',
            [
                {
                    text: 'NO'
                },
                {
                    text: 'SI',
                    onPress: async () => {
                        await greenPointsApi.delete('/premio/' + premio.id)
                        navigation.navigate('Confirmacion', { nextScreen: 'AdministrarPremios', message: 'Se eliminó exitosamente' })
                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {sponsorFocus ? (
                <View style={{ flex: 1 }}>
                    <Header navigation={navigation} title="NUEVO PREMIO" />
                    <View style={{ flex: 1 }}>
                        <Text style={[styleTextInput.title, { marginLeft: 10 }]}>Sponsor (*)</Text>
                        <Input
                            inputContainerStyle={styleTextInput.large}
                            style={{ fontSize: 15 }}
                            placeholder="Sponsor"
                            leftIcon={
                                <TouchableOpacity onPress={() => setSponsorFocus(false)}>
                                    <Ionicons name='chevron-back' size={20} style={{ marginLeft: -10 }} />
                                </TouchableOpacity>
                            }
                            onChangeText={value => {
                                setQuery(value)
                                setSponsors(sponsorsAll.filter(item => item.nombre.toUpperCase().indexOf(value.toUpperCase()) > -1))
                            }}
                            value={query}
                            autoFocus={true}
                        >
                        </Input>
                        <View>
                            <FlatList
                                style={{ marginLeft: 20, marginTop: -10 }}
                                data={sponsors}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) =>
                                    <View>
                                        <Text onPress={() => {
                                            setSponsor(item)
                                            setQuery(item.nombre)
                                            setSponsorFocus(false)
                                            setErrorSponsor(false)
                                        }}
                                        >{item.nombre}
                                        </Text>
                                    </View>
                                }
                            />
                        </View>
                    </View>
                </View>
            ) : (
                <KeyboardAwareScrollView
                    stickyHeaderIndices={[0]}
                >
                    <Header
                        leftComponent={
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ marginLeft: -10 }}
                                    onPress={() => { navigation.navigate('AdministrarPremios') }}>
                                    <Ionicons name="chevron-back" size={35} color="white" />
                                </TouchableOpacity>
                                <Text
                                    style={[styleText.button, { width: '90%' }]}>EDITAR PREMIO</Text>
                            </View>
                        }
                        navigation={navigation}
                    />
                    <View style={{ flex: 1, paddingBottom: 100 }}>
                        <ImagePicker
                            handleImage={(image) => setImage(image)}
                            marginVertical={25}
                            defaultValue={premio.imagen}
                        />
                        <InputForm
                            control={control}
                            errors={errors}
                            name="nombre"
                            title="Nombre (*)"
                            placeholder="Nombre"
                        />
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styleTextInput.title}>Sponsor (*)</Text>
                            <TextInput style={styleTextInput.large}
                                onChangeText={setSponsor}
                                value={sponsor.nombre}
                                placeholder="Sponsor"
                                onFocus={() => setSponsorFocus(true)}
                                defaultValue={sponsor.nombre}
                            />
                            <View style={{ width: '80%' }}>
                                {errorSponsor ? <Text style={{ color: 'red' }}>Requerido</Text> : <Text></Text>}
                            </View>
                        </View>
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
                                        if (!codigos.every(item => item !== codigo)) return Alert.alert("Error", "El código ya ha sido ingresado")
                                        fadeOut()
                                        setCodigos([...codigos, codigo])
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
                            onPress={() => navigation.navigate('VerCodigos', { codigos, backToAgregar: false })}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'blue', textDecorationLine: 'underline' }}>
                                VER CÓDIGOS
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styleButton.base, { alignSelf: 'center' }]}
                            onPress={handleSubmit(onSubmit)}
                            onPressIn={() => {
                                if (codigos.length === 0) setErrorCodigo(true)
                                if (sponsor.nombre === undefined) setErrorSponsor(true)
                                if (image === undefined || image === null || Object.keys(image).length === 0) setImage(null)
                            }}
                        >
                            <Text style={styleText.button}>ACTUALIZAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styleButton.base, { alignSelf: 'center', backgroundColor: 'red', marginTop: 20 }]}
                            onPress={() => eliminarPremio()}
                        >
                            <Text style={styleText.button}>ELIMINAR</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>)}
        </View>
    );
}