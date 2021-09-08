import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import greenPointsApi from '../api/greenPointsApi';

// styles
import styleContainer from '../styles/Container';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';

export default function AdminMenuScreen ({ navigation }) {

    const { logOut } = useContext( AuthContext );

    loadProducts = async () => {
        const data = await greenPointsApi.get('/premio');
    };
    
    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <TouchableOpacity
              style={[styleButton.base, { marginTop: 60 }] }
              onPress={ loadProducts }
              >
              <Text style={styleText.button}>Obtener Premios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styleButton.base, { marginTop: 60 }] }
              onPress={ logOut }
              >
              <Text style={styleText.button}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}