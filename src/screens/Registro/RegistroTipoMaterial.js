import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import styleContainer from "../../styles/Container";
import styleButton from "../../styles/Button"
import styleText from "../../styles/Text";
import { Ionicons } from '@expo/vector-icons';
import { Divider, CheckBox } from 'react-native-elements';
import greenPointsApi from '../../api/greenPointsApi';
import { AuthContext } from '../../context/AuthContext';

export default function RegistroTipoMaterial({ route, navigation }) {

    const errmsg = "Debes seleccionar al menos un tipo de material";
    const [alos, setAlos] = useState(false);
    const { token } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [checkState, setCheck] = useState([]);

    const validarChecks = () => {
        const aloselected = [...checkState].every(item => item === false)
        setAlos(aloselected)
    }

    const onSubmit = async () => {
        validarChecks();
        const materials = data.
            filter((item, index) => checkState[index] === true).
            reduce((previous, current) => [...previous, current.id], [])
        if (alos) return errmsg
        try {
            await greenPointsApi.post('/punto-reciclaje', {
                username: route.params.userName,
                customerName: route.params.customerName,
                document: route.params.document,
                latitud: route.params.latitud,
                longitud: route.params.longitud,
                direccion: route.params.address,
                password: route.params.password,
                materials: materials
            })
            navigation.navigate("Confirmacion", { nextScreen: 'LoginScreen', message: 'Tu registro ha sido exitoso' })
        } catch (e) {
            console.error(e)
        }

    }

    const updateCheck = (position) => setCheck(
        checkState.map((item, index) => index === position ? !item : item)
    );

    useEffect(() => {
        const getMateriales = async () => {
            try {
                const response = await greenPointsApi.
                    get('/tipo-reciclable', { headers: { Authorization: token } })
                const data = await response.data
                setData(data)
                setCheck(new Array(data.length).fill(false))
            } catch (e) {
                console.error(e)
            }
        }
        getMateriales();
    }, [])

    return (
        <View>
            <Text style={[styleText.blackText, { marginTop: 10 }]}>Estos son los tipos de materiales que vas a aceptar de los socios recicladores</Text>
            <View style={[styleContainer.main, { marginTop: 30, marginHorizontal: 30, alignItems: 'stretch' }]}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="image" size={50} />
                            <Text style={[styleText.subtitle25, { textAlign: 'left', marginLeft: 30 }]}>{item.nombre.toUpperCase()}</Text>
                            <CheckBox
                                containerStyle={{ marginLeft: 'auto' }}
                                checked={checkState[item.id - 1]}
                                onPress={() => updateCheck(item.id - 1)}
                                checkedColor="#69A03A"
                            />
                        </View>
                    )}
                    ItemSeparatorComponent={() => { return <Divider orientation="horizontal" /> }}
                />
            </View>
            <Text style={{ alignSelf: 'center', color: 'red', marginBottom: 10 }}>{alos && errmsg}</Text>
            <TouchableOpacity style={[styleButton.base, { alignSelf: 'center' }]} onPress={onSubmit}>
                <Text style={styleText.button}>FINALIZAR</Text>
            </TouchableOpacity>

        </View>
    )
}