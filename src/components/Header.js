import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/icon.png';
import styleText from '../styles/Text';
import { AuthContext } from '../context/AuthContext';

export default function HeaderComponent({ navigation, title, leftComponent }) {

    const { rol } = useContext(AuthContext);

    return (
        <>
            <Header
                backgroundColor="#69A03A"
                centerContainerStyle={{ flex: 1 }}>
                {leftComponent ? leftComponent : <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: -10 }}>
                    <TouchableOpacity
                        onPress={() => { navigation.goBack(); }}>
                        <Ionicons name="chevron-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={[styleText.button, { width: '80%' }]}>{title}</Text>
                </View>}
                <Image
                    source={logo}
                    style={{ width: 40, height: 40, borderRadius: 20, marginTop: -10 }}
                />
                {rol === 1 ? (<Text style={styleText.button}>
                    Mis Puntos:
                </Text>) : null}
            </Header>
        </>
    )
}
