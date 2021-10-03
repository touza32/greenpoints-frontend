import React, { useContext } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

// styles
import styleContainer from '../styles/Container';
import styleText from '../styles/Text';
import { AuthContext } from '../context/AuthContext';



export default function PuntMenuScreen({ navigation }) {

    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <Header navigation={navigation} leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate('MenuHamburguesaPunto'); }}>
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            } />

            <View style={[styleContainer.main, { flex: 1 }]}>
                <Image
                    source={require('../assets/PuntoMenu.png')}
                    style={{
                        width: 359,
                        height: 215
                    }}>
                </Image>
            </View>

            <View
                style={{ justifyContent: 'space-between', alignItems: 'center', flex: 1 }} >

                <TouchableOpacity
                    onPress={() => { navigation.navigate('RegistrarIntercambio') }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image

                            source={require('../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 20 }]}>Registrar Intercambio                   </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image style={[{ marginLeft: 1 }]}

                            source={require('../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 20 }]}>Nuevo Lote                                     </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row", marginBottom: 120 }]}>
                        <Image
                            source={require('../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 20 }]
                        }>Mis Lotes                                        </Text>
                    </View>
                </TouchableOpacity>

            </View>


            {/*<View style={{ flex:4}}>
                    <Menu.Item style={{ color: '#4B9D2D'}}
                      icon="heart-outline" onPress={() => {}} title="ABM de Premios" 

                    />
                    
                    <Menu.Item icon="undo" onPress={() => {}} title="ABM Tipos de Reciclables" />
                    <Menu.Item icon="content-cut" onPress={() => {}} title="ABM de Sponsors"  />
                    <Menu.Item icon="content-copy" onPress={() => {}} title="ABM Plantas Recicladoras"  />
    
                </View> */}

        </View>
    );
}