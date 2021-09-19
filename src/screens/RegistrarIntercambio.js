import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import greenPointsApi from '../api/greenPointsApi';
import styleContainer from '../styles/Container';
import styleTextInput from '../styles/TextInput';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import Accordion from '../components/Accordion';
import { AuthContext } from '../context/AuthContext';

const materials = [
    { id: 1, title: 'Plástico' },
    { id: 2, title: 'Vidrio' },
    { id: 3, title: 'Cartón' }
]

export default function RegistrarIntercambio() {

    const [socio, setSocio] = useState('');
    const [intercambio, setIntercambio] = useState([{ id: 0, material: 0, peso: undefined }]);
    const [enabled, setEnabled] = useState(false)
    const { token } = useContext(AuthContext);
    const [tipoValor, setTipoValor] = useState([]);
    const [puntos, setPuntos] = useState(0);

    useEffect(() => {
        {
            greenPointsApi.
                get('/tipo-reciclable', { headers: { Authorization: token } }).
                then(response => setTipoValor(response.data)).
                catch(error => console.error(error))
        }
    }, [])

    useEffect(() => setEnabled(intercambio.
        every(item => item.peso > 0 && item.material > 0 && socio !== "")))

    useEffect(() => {
        try {
            setPuntos(intercambio.
                reduce((acc, item) =>
                    acc + item.peso * tipoValor.
                        find(i => i.id === item.material).points, 0))
        } catch (e) {
            console.log(e)
        }
    }, [intercambio])


    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <View style={{ flex: 4, marginTop: 10 }}>
                <Text style={[styleTextInput.title, { marginRight: 'auto' }]}>Socio reciclador</Text>
                <TextInput
                    style={[styleTextInput.large, { marginBottom: 10 }]}
                    value={socio}
                    onChangeText={setSocio}
                    placeholder="socio@correo.com"
                />
                <FlatList
                    data={intercambio}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) =>
                    (
                        <View style={{ maxHeight: materials.length * 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: 350 }}>
                            <View>
                                <Text style={[styleTextInput.title, { marginLeft: 15 }]}>Material</Text>
                                <Accordion
                                    data={materials}
                                    onSelect={(value) => {
                                        const newArr = [...intercambio]
                                        newArr[index] = { ...newArr[index], material: value.id }
                                        setIntercambio(newArr)
                                    }

                                    } />
                            </View>
                            <View>
                                <Text style={[styleTextInput.title, { marginBottom: 20 }]}>Peso (Kg)</Text>
                                <View>
                                    <TextInput
                                        style={styleTextInput.small}
                                        keyboardType="numeric"
                                        placeholder="1.1"
                                        value={intercambio[index].peso}
                                        onChangeText={
                                            value => {
                                                value = value.replace(/[^\d.]/, '')
                                                const newArr = [...intercambio]
                                                newArr[index] = { ...newArr[index], peso: parseInt(value) }
                                                setIntercambio(newArr)
                                            }
                                        }
                                    />
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
                    )}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={[styleButton.base, styleButton.plus, {}]}
                        onPress={() =>
                            setIntercambio([...intercambio, { id: intercambio[intercambio.length - 1].id + 1, material: 0, peso: 0 }])
                        }
                    >
                        <Text style={[styleText.button, { fontSize: 30 }]}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 'auto' }}>Puntos: {puntos}</Text>
                </View>
            </View>
            <View style={[styleContainer.main, { flex: 1 }]}>
                {enabled
                    ? (<TouchableOpacity
                        style={styleButton.base}
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
}
