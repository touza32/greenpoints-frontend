import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import styleTextInput from '../../styles/TextInput';
import styleButton from '../../styles/Button';
import styleText from '../../styles/Text'
//api
import greenPointsApi from '../../api/greenPointsApi';

export default function SocioActualizar({ navigation }) {

    const { logOut } = useContext(AuthContext);
    const { token, id } = useContext(AuthContext);
    const [ punto, setPunto ] = useState({});


    useEffect(() => {
        (async () => {
            const puntoData = await greenPointsApi.get('/punto-reciclaje/' + id);
            const punto = await puntoData.data;
            setPunto(punto);
        })();
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header navigation={navigation} title="ACTUALIZAR DATOS" />
            <View style={{ flex: 0.8 }}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={styleTextInput.title}>Correo electrónico</Text>
                    <TextInput style={styleTextInput.large}
                        value={punto.email}
                        editable={false}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styleTextInput.title}>Nombre</Text>
                    <TextInput style={styleTextInput.large}
                        value={punto.nombre}
                        editable={false}
                    />
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Text style={styleTextInput.title}>CUIT</Text>
                    <TextInput style={styleTextInput.large}
                        value={punto.cuit}
                        editable={false}
                    />
                </View>
                <TouchableOpacity
                    style={[styleButton.base]}
                    onPress={() => navigation.navigate('ConfirmarDireccion', { ...punto, puntoActualizar: true })}
                >
                    <Text style={styleText.button}>SIGUIENTE</Text>
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
                                onPress: async () => {
                                    await greenPointsApi.delete('/punto-reciclaje/' + id)
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
