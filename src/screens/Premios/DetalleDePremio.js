import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

//styles
import * as styles from '../../styles';
//3er party libraries
import Moment from 'moment';
//api
import greenPointsApi from '../../api/greenPointsApi';
//context
import { AuthContext } from '../../context/AuthContext';

import Header from '../../components/Header';

export default function DetalleDePremio({ route, navigation }) {

    const [suficiente, setSuficiente] = useState(true)
    const [premio, setPremio] = useState({ id: 0, observacion: '', puntos: 0, imagen: '0', description: '', hasta: '' })
    const { premioId, puntos, backToMenu } = route.params
    const { id } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const premioData = await greenPointsApi.get(`/premio/${premioId}`);
            const premio = await premioData.data;
            setPremio(premio)
            setSuficiente(puntos >= premio.puntos)
        })();


    }, []);

    const canjearPremio = async () => {
        /*

        try {
            const codigo = await greenPointsApi.post('/canje', {
                premioId: premio.id,
                socioId: id
            });

            if(codigo && codigo.data) {
                navigation.navigate('CanjeResultado', { codigo: codigo.data, backToMenu: backToMenu ? true : false });
            };
            
        } catch (e) {
            console.error(e)
        }
    };*/
        Alert.alert(
            'Canjear premio',
            '¿Estas seguro que deseas canjear este premio?',
            [
                {
                    text: 'NO'
                },
                {
                    text: 'SI',
                    onPress: async () => {
                        const codigo = await greenPointsApi.post('/canje', {
                            premioId: premio.id,
                            socioId: id
                        })

                        if (codigo && codigo.data) {
                            navigation.navigate('CanjeResultado', { codigo: codigo.data, backToMenu: backToMenu ? true : false });
                        }
                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header navigation={navigation} title='PREMIO' />
            <View style={{ flex: 0.35, justifyContent: 'center' }}>
                <Image
                    source={{ uri: premio.imagen }}
                    style={ownStyle.image}
                    resizeMode="contain"
                >
                </Image>
            </View>
            <View style={{ flex: 0.45, justifyContent: 'space-around', width: '80%' }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.Text.titleList}>Detalle</Text>
                    <Text>{premio.description}</Text>
                </View>
                <View style={{ maxHeight: '50%', alignItems: 'flex-start' }}>
                    <Text style={styles.Text.titleList}>¿En dónde lo uso?</Text>
                    <Text>{premio.observacion}</Text>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.Text.titleList}>Vigente hasta</Text>
                    <Text>{Moment(premio.hasta).format('DD/MM/yyyy')}</Text>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.Text.titleList}>Puntos necesarios</Text>
                    <Text>{premio.puntos}</Text>
                </View>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'center' }}>
                {suficiente
                    ? <TouchableOpacity
                        style={styles.Button.base}
                        onPress={() => canjearPremio()}
                    >
                        <Text style={styles.Text.button}>CANJEAR</Text>
                    </TouchableOpacity>
                    : <>
                        <TouchableOpacity
                            style={[styles.Button.base, { backgroundColor: 'gray' }]}
                            disabled={true}
                        >
                            <Text style={styles.Text.button}>CANJEAR</Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>No cuentas con suficientes puntos</Text>
                    </>
                }
            </View>
        </View>
    )
}


const ownStyle = StyleSheet.create({
    image: {
        width: 260,
        height: 180
    }
})