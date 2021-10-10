import React from 'react';
import * as styles from '../../styles';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CanjeResultado({ navigation }) {

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1, marginBottom: 50 }}>
                <Ionicons name='checkmark-circle-outline' size={175} color="#69A03A" style={{ marginLeft: 15 }} />
                <Text style={[styles.Text.titleList, { fontSize: 25 }]}>¡Ya es tuyo!</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={[styles.Text.titleList, { fontSize: 25, marginBottom: 10 }]}>Tu código:</Text>
                <View style={{ borderColor: 'black', borderWidth: 1, marginBottom: 10 }}>
                    <Text style={[styles.Text.subtitle25, { marginHorizontal: 30, marginTop: 10, marginBottom: 10 }]}>ABC123456</Text>
                </View>
                <Text style={[styles.Text.titleList, { fontWeight: 'normal', marginHorizontal: 50, marginBottom: 50 }]}>Canjealo en cualquiera de los locales adheridos</Text>
                <TouchableOpacity
                    style={styles.Button.base}
                    onPress={() => navigation.navigate('DetalleDePremio')}
                >
                    <Text style={styles.Text.button}>VOLVER</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}