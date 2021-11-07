import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import styleContainer from "../../styles/Container";
import styleButton from "../../styles/Button"
import styleText from "../../styles/Text";
import { Divider, CheckBox } from 'react-native-elements';
import greenPointsApi from '../../api/greenPointsApi';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';


export default function ActualizarTipoMaterial({ route, navigation }) {

    const errmsg = "Debes seleccionar al menos un tipo de material";
    const [alos, setAlos] = useState(false);
    const { token, id } = useContext(AuthContext);
    const [materiales, setMateriales] = useState([]);
    const [materialesPunto, setMaterialesPunto] = useState([]);
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
            // await greenPointsApi.post('/punto-reciclaje', {
            //     email: route.params.correo,
            //     document: route.params.documento,
            //     latitud: route.params.latitud,
            //     longitud: route.params.longitud,
            //     materials: materials
            // })
            //navigation.navigate("Confirmacion", { nextScreen: 'LoginScreen', message: 'Tu registro ha sido exitoso' })
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
                setMateriales(data)
            } catch (e) {
                console.error(e)
            }
        }
        const getMaterialesPunto = async () => {
            try {
                const response = await greenPointsApi.
                    get('/punto-reciclaje/tipo-reciclables?puntoId=' + id + '&onlyOpenedLote=false')
                const data = await response.data
                setMaterialesPunto(data)
            } catch (e) {
                console.error(e)
            }
        }
        getMateriales();
        getMaterialesPunto();
    }, [])

    useEffect(() => {
        const idMaterialesPunto = materialesPunto.map(item => item.id)
        setCheck(materiales.map(item => idMaterialesPunto.find(i => i === item.id) ? true : false))
    }, [materialesPunto])

    return (
        <View>
            <Header navigation={navigation} title="ACTUALIZAR DATOS" />
            <Text style={[styleText.blackText, { marginTop: 10 }]}>Estos son los tipos de materiales que vas a aceptar de los socios recicladores</Text>
            <View style={[styleContainer.main, { marginTop: 30, marginHorizontal: 30, alignItems: 'stretch' }]}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item.imagen }} style={{ width: 80, height: 60, margin: 10 }} />
                            <Text style={[styleText.subtitle25, { marginTop: 0, textAlign: 'left', marginLeft: 20 }]}>{item.nombre.toUpperCase()}</Text>
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