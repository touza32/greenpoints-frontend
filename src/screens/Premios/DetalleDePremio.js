import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../components/Header';
import * as styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';

const data = {
    detalle: 'Aqui va a ir el texto con el detalle del premio. Por ejemplo: una rica hamburguesa con queso',
    direcciones: [
        'Av. 9 de Julio 145, CABA',
        'Córdoba 25, CABA',
        'Av. San Martín 1200, CABA',
    ],
    puntos: 150,
    vigencia: '31/12/2021'
}



export default function DetalleDePremio({ route, navigation }) {

    //llamada a la API para consultar premio por id y traer la data (detalle, direcciones, puntos, vigencia)
    
    const [suficiente, setSuficiente] = useState(false)
    const {premio, puntos} = route.params
    
    useEffect(()=>{
        setSuficiente(puntos >= data.puntos)
    }
        ,[])
    
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header navigation={navigation} title='PREMIO' />
            <View style={{ flex: 0.35, justifyContent: 'center' }}>
                <Ionicons name='image' size={200} />
            </View>
            <View style={{ flex: 0.45, justifyContent: 'space-around', width: '80%' }}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.Text.titleList}>Detalle</Text>
                    <Text>{data.detalle}</Text>
                </View>
                <View style={{ maxHeight: '50%', alignItems: 'flex-start' }}>
                    <Text style={styles.Text.titleList}>¿En dónde lo uso?</Text>
                    <FlatList
                        data={data.direcciones}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={item => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
                                <View style={{ padding: 4, borderRadius: 4, backgroundColor: 'black', marginRight: 5 }} />
                                <Text>{item.item}</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.Text.titleList}>Vigente hasta</Text>
                    <Text>{data.vigencia}</Text>
                </View>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'center' }}>
                {suficiente
                    ? <TouchableOpacity
                        style={styles.Button.base}
                        onPress={() => navigation.navigate('CanjeResultado')}
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
                        <Text style={{textAlign:'center'}}>No cuentas con suficientes puntos</Text>
                    </>
                }
            </View>
        </View>
    )
}
