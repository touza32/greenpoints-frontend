import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/icon.png';
import styleText from '../styles/Text';
import { AuthContext } from '../context/AuthContext';

export default function HeaderComponent({ navigation, title, leftComponent }) {

    const { nombre, rol, status } = useContext(AuthContext);

    return (
        <>
            <Header
                backgroundColor="#69A03A"
                leftContainerStyle={{ flex: 1, justifyContent: 'center', marginTop: -10 }}
                centerContainerStyle={{ flex: 1, justifyContent: 'center', marginTop: -10 }}
                rightContainerStyle={{ flex: 1, justifyContent: 'center', marginTop: -10 }}
            >
                {leftComponent ? leftComponent : <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ marginLeft: -10 }}
                        onPress={() => { navigation.goBack(); }}>
                        <Ionicons name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text
                        style={[styleText.button, { width: '90%' }]}>{title}</Text>
                </View>}
                <Image
                    source={logo}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <Text style={styleText.button}>
                    {status === 'authenticated' ? rol === 3 ? 'Administrador' : nombre : ''}
                </Text>
            </Header>
        </>
    )
}
