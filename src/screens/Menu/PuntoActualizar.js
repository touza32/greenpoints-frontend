import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import styleTextInput from '../../styles/TextInput';
import styleButton from '../../styles/Button';
import styleText from '../../styles/Text'

export default function SocioActualizar({ navigation }) {

    const { logOut } = useContext(AuthContext);

    const data = {
        nombre: 'Empresa Holandesa',
        correo: 'empresaholandesa@gmail.com',
        documento: '30-50279317-5'
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header navigation={navigation} title="ACTUALIZAR DATOS" />
            <View style={{ flex: 0.8 }}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={styleTextInput.title}>Correo electrónico</Text>
                    <TextInput style={styleTextInput.large}
                        value={data.correo}
                        editable={false}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styleTextInput.title}>Nombre</Text>
                    <TextInput style={styleTextInput.large}
                        value={data.nombre}
                        editable={false}
                    />
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Text style={styleTextInput.title}>CUIT</Text>
                    <TextInput style={styleTextInput.large}
                        value={data.documento}
                        editable={false}
                    />
                </View>
                <TouchableOpacity
                    style={[styleButton.base]}
                    onPress={() => navigation.navigate('ConfirmarDireccion', { ...data, puntoActualizar: true })}
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
                                onPress: () => {
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
