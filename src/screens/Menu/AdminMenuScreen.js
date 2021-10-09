import React, { useContext } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';

// styles
import styleContainer from '../../styles/Container';
import styleText from '../../styles/Text';
import styleButton from '../../styles/Button';

export default function AdminMenuScreen({ navigation }) {

    const { logOut } = useContext(AuthContext);

    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <Header navigation={navigation} leftComponent={<></>} />
            <View style={[styleContainer.main, { flex: 0.4, marginTop:50 }]}>

                <Image
                    source={require('../../assets/AdminMenu.png')}
                    style={{
                        width: 370,
                        height: 231
                    }}>
                </Image>
            </View>

            <View
                style={{ flex: 0.5, alignItems: 'center', justifyContent: 'space-between', marginVertical: 50 }} >

                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image

                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>ABM de Premios                              </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image style={[{ marginLeft: 1 }]}

                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>ABM de Tipos de Reciclables        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image
                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>ABM de Sponsors                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image
                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>ABM de Plantas Recicladoras       </Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 0.1, alignItems: 'center', marginBottom:50 }}>
                <TouchableOpacity
                    style={styleButton.base}
                    onPress={logOut}
                >
                    <     Text style={styleText.button}>Salir</Text>
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