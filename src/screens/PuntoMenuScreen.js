import React, { useContext } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity, TouchableHighlight
} from 'react-native';

import { Header } from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome'

// styles
import styleContainer from '../styles/Container';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';
import { AuthContext } from '../context/AuthContext';



export default function PuntMenuScreen({ navigation }) {

    const { logOut } = useContext(AuthContext);

    return (
        <View style={[styleContainer.main, { flex: 1}]}>

        <Header   
                              
             backgroundColor="#69A03A"
             leftComponent={
            
             <TouchableHighlight onPress={() =>{ navigation.navigate('MenuHamburguesaPunto');}}>
             <FAIcon name='bars' size={28} style={{ color: "#FFFF" }} />
             </TouchableHighlight>
           
             }
            
             centerComponent={{ text: 'GREEN POINTS', style: { color: '#fff', fontWeight: "bold", fontSize: 18} }}
             
          />  

            <View style={[styleContainer.main, { flex: 1}]}>
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
                    onPress={() => {navigation.navigate('RegistrarIntercambio')}} >
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