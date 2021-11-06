import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
import { Divider } from 'react-native-elements';
import styleButton from "../../../styles/Button";
import styleText from "../../../styles/Text";
import styleTextInput from "../../../styles/TextInput";
import Header from '../../../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function VerCodigos({ route, navigation }) {

    const [codigo, setCodigo] = useState('')
    const [codigos, setCodigos] = useState(route.params.codigos)
    const { backToAgregar } = route.params
    const previousScreen = backToAgregar ? 'AgregarPremio' : 'EditarPremio'

    return (
        <View>
            <Header
                leftComponent={
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ marginLeft: -10 }}
                            onPress={() => { navigation.navigate({ name: previousScreen, params: { codigos: codigos }, merge: true }) }}>
                            <Ionicons name="chevron-back" size={35} color="white" />
                        </TouchableOpacity>
                        <Text
                            style={[styleText.button, { width: '90%' }]}>CÓDIGOS</Text>
                    </View>
                }
                navigation={navigation}
            />
            <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 30 }}>
                <TextInput
                    style={[styleTextInput.medium, { width: 200, marginTop: 32 }]}
                    value={codigo}
                    onChangeText={setCodigo}
                />
                {codigo !== ''
                    ?
                    <TouchableOpacity
                        style={[styleButton.base, styleButton.plus, { marginTop: 32, marginLeft: 60 }]}
                        onPress={() => {
                            if (!codigos.every(item => item !== codigo)) return Alert.alert("Error", "El código ya ha sido ingresado")
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
            <Divider orientation='horizontal' width={1} color='#DDDDDD' />
            <FlatList
                data={codigos}
                keyExtractor={(codigos, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                        <TextInput
                            style={[styleTextInput.medium, { width: 200, marginTop: 15, color: 'black' }]}
                            value={item}
                            editable={false}
                        />
                        <TouchableOpacity
                            style={[styleButton.base, styleButton.plus, { marginTop: 15, marginLeft: 60, backgroundColor: 'red' }]}
                            onPress={() => {
                                setCodigos(codigos.filter((item, i) => i !== index))
                            }
                            }
                        >
                            <Text style={[styleText.button, { fontSize: 30 }]}>-</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}
