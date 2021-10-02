import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import greenPointsApi from '../api/greenPointsApi';
import styleContainer from '../styles/Container';
import styleTextInput from '../styles/TextInput';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import Accordion from '../components/Accordion';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default function RegistrarIntercambio({ route, navigation }) {

    const [socio, setSocio] = useState({ socioId: 0, email: '' });
    const [query, setQuery] = useState('');
    const [socios, setSocios] = useState([]);
    const [sociosAll, setSociosAll] = useState([]);
    const [socioFocus, setSocioFocus] = useState(false);
    const [intercambio, setIntercambio] = useState([{ id: 0, tipoId: 0, peso: '', puntos: 0 }]);
    const [enabled, setEnabled] = useState(false)
    const { token, id } = useContext(AuthContext);
    const [tipoValor, setTipoValor] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [puntos, setPuntos] = useState(0);
    const [loading, setLoading] = useState(true);

    const getValores = async () => {
        setLoading(true)
        try {
            const response = await greenPointsApi.
                get('/tipo-reciclable', { headers: { Authorization: token } })
            setLoading(false)
            setTipoValor(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getMateriales = async id => {
        setLoading(true)
        try {
            const response = await greenPointsApi.
                get('/tipo-reciclable/' + id, { headers: { Authorization: token } })
            setLoading(false)
            setMaterials(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getSocios = async () => {
        setLoading(true)
        try {
            const response = await greenPointsApi.
                get('/usuario/socio-reciclador', { headers: { Authorization: token } })
            setLoading(false)
            setSociosAll(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const postIntercambio = async () => {
        try {
            await greenPointsApi.post('/intercambio', {
                puntoId: id,
                socioId: socio.socioId,
                tipoReciclaje: intercambio
            })
            console.log({ puntoId: id, socioId: socio.socioId, tipoReciclaje: intercambio })
            navigation.navigate("Confirmacion", { nextScreen: 'PuntoMenuScreen', message: 'Su registro ha sido exitoso' })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getValores()
        getMateriales(id)
        getSocios()
    }, [])

    useEffect(() => {
        setEnabled(intercambio.
            every(item => item.peso > 0 && item.tipoId > 0 && socio.socioId !== 0))
    })

    useEffect(() => {
        if (!loading) {
            setPuntos(intercambio.
                reduce((acc, item) =>
                    item.tipoId !== 0 ? acc + item.peso * tipoValor.
                        find(i => i.id === item.tipoId).points : null, 0))
        }
    }, [intercambio])

    return (
        socioFocus ? (
            <View style={{ flex: 1 }}>
                <Header navigation={navigation} title="REGISTRAR INTERCAMBIO" />
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10, marginRight: '12%' }}>
                    <View>
                        <Text style={[styleTextInput.title, { marginLeft: 10 }]}>Socio reciclador</Text>
                        <Input
                            inputContainerStyle={styleTextInput.large}
                            style={{ fontSize: 15 }}
                            placeholder="socio@correo.com"
                            leftIcon={
                                <TouchableOpacity onPress={() => setSocioFocus(false)}>
                                    <Ionicons name='chevron-back' size={20} style={{ marginLeft: -10 }} />
                                </TouchableOpacity>
                            }
                            onChangeText={value => {
                                setQuery(value)
                                setSocios(sociosAll.filter(item => item.email.toUpperCase().indexOf(value.toUpperCase()) > -1))
                            }}
                            value={query}
                            autoFocus={true}
                        >
                        </Input>
                        <FlatList
                            style={{ marginLeft: 20, marginTop: -10 }}
                            data={socios}
                            keyExtractor={item => item.socioId.toString()}
                            renderItem={({ item }) =>
                                <View>
                                    <Text onPress={() => {
                                        setSocio(item)
                                        setQuery(item.email)
                                        setSocioFocus(false)
                                    }}
                                    >{item.email}</Text>
                                </View>
                            }
                        />
                    </View>
                </View>
            </View>
        ) : (
            <View style={[styleContainer.main, { flex: 1 }]}>
                <Header navigation={navigation} title="REGISTRAR INTERCAMBIO" />
                <View style={{ flex: 4, marginTop: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styleTextInput.title, { marginRight: 'auto' }]}>Socio reciclador</Text>
                        <TextInput
                            style={styleTextInput.large}
                            placeholder="socio@correo.com"
                            value={socio.email}
                            onFocus={() => setSocioFocus(true)}
                        >
                        </TextInput>
                    </View>
                    <FlatList
                        data={intercambio}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={[styleButton.base, styleButton.plus, {}]}
                                    onPress={() =>
                                        setIntercambio([...intercambio, { id: intercambio[intercambio.length - 1].id + 1, tipoId: 0, peso: '' }])
                                    }
                                >
                                    <Text style={[styleText.button, { fontSize: 30 }]}>+</Text>
                                </TouchableOpacity>
                                <Text style={{ marginTop: 'auto' }}>Puntos: {puntos}</Text>
                            </View>
                        }
                        renderItem={({ item, index }) =>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: 350 }}>
                                <View>
                                    <Text style={[styleTextInput.title, { marginLeft: 15 }]}>Material</Text>
                                    <Accordion
                                        data={materials}
                                        title="nombre"
                                        onSelect={(value) => {
                                            const newArr = [...intercambio]
                                            newArr[index] = { ...newArr[index], tipoId: value.id }
                                            setIntercambio(newArr)
                                        }}
                                        />
                                </View>
                                <View>
                                    <Text style={[styleTextInput.title, { marginBottom: 20 }]}>Peso (Kg)</Text>
                                    <View>
                                        {item.tipoId !== 0 ? <TextInput
                                            style={styleTextInput.small}
                                            keyboardType="numeric"
                                            placeholder="1.1"
                                            value={intercambio[index].peso.toString()}
                                            onChangeText={
                                                value => {
                                                    value = value.replace(/[^\d.]/, '')
                                                    const newArr = [...intercambio]
                                                    newArr[index] = {
                                                        ...newArr[index],
                                                        peso: value!=="" ? parseInt(value): "",
                                                        puntos: parseInt(value*1) * tipoValor.find(i => i.id === item.tipoId).points
                                                    }
                                                    setIntercambio(newArr)
                                                }
                                            }
                                        /> : <TextInput style={[styleTextInput.small, { backgroundColor: '#eeeeee' }]} editable={false} />}
                                    </View>
                                </View>
                                {item.id !== 0 ? <TouchableOpacity
                                    style={[styleButton.base, styleButton.plus, { backgroundColor: 'red' }]}
                                    onPress={() =>
                                        setIntercambio(intercambio.filter((item, i) => i !== index))
                                    }
                                >
                                    <Text style={[styleText.button, { fontSize: 30, marginBottom: 3 }]}>-</Text>
                                </TouchableOpacity> : <Text style={{ marginRight: 42 }}></Text>}
                            </View>
                        }
                    />

                </View>
                <View style={[styleContainer.main, { flex: 1 }]}>
                    {enabled
                        ? (<TouchableOpacity
                            style={styleButton.base}
                            onPress={() => postIntercambio()}
                        >
                            <Text style={styleText.button}>REGISTRAR</Text>
                        </TouchableOpacity>)
                        : (<TouchableOpacity
                            style={[styleButton.base, { backgroundColor: 'gray' }]}
                            disabled={true}
                        >
                            <Text style={styleText.button}>REGISTRAR</Text>
                        </TouchableOpacity>)
                    }
                </View>
            </View>
        )
    )
}