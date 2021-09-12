import React, { useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import styleContainer from "../styles/Container";
import styleButton from "../styles/Button"
import styleText from "../styles/Text";
import { Ionicons } from '@expo/vector-icons';
import { Divider, CheckBox } from 'react-native-elements';

const data = [
    { id: 1, title: 'PAPEL', check: false },
    { id: 2, title: 'PLASTICO', check: true },
    { id: 3, title: 'CARTON', check: false },
    { id: 4, title: 'VIDRIO', check: false },
    { id: 5, title: 'ALUMINIO', check: false },
    { id: 6, title: 'COBRE', check: false }
];

export default function RegistroTipoMaterial() {
    const errmsg = "Debe seleccionar al menos un tipo de material";
    const [alos, setAlos] = useState(false);
    const onSubmit = () => {
        const materiales = [...data]
        materiales.map((item, index) => {
            delete item.title
            item.check = checkState[index]
        })
        const aloselected = materiales.every(item => item.check === false)
        setAlos(aloselected)
        console.log(aloselected ? errmsg : materiales)
    }
    const [checkState, setCheck] = useState(new Array(data.length).fill(false));
    const updateCheck = (position) => setCheck(
        checkState.map((item, index) => index === position ? !item : item)
    );

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
                            <Text style={[styleText.subtitle25, { textAlign: 'left', marginLeft: 30 }]}>{item.title}</Text>
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