import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';
import CarouselMenu from "../../components/CarouselMenu";
import greenPointsApi from '../../api/greenPointsApi';

// styles
import styleContainer from '../../styles/Container';
import styleText from '../../styles/Text';
import styleButton from '../../styles/Button';

export default function AdminMenuScreen({ navigation }) {

    const { logOut } = useContext(AuthContext);

    const [premios, setPremios] = useState([])

    useEffect(() => {
        (async () => {
            const premiosData = await greenPointsApi.get('/premio/top');
            const premios = await premiosData.data;
            setPremios(premios);
        })();
    }, []);

    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <Header navigation={navigation} leftComponent={<View style={{ height: 0 }}></View>} />
            <View style={[styleContainer.main, { flex: 0.5, marginTop: 40 }]}>
                <CarouselMenu data={premios} onPress={()=>null}/>
            </View>

            <View
                style={{ flex: 0.6, alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 }} >

                <TouchableOpacity
                    onPress={() => { navigation.navigate('AdministrarPremios') }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image

                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>Gestión de Premios                              </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('AdministrarTipos') }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image style={[{ marginLeft: 1 }]}

                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>Gestión de Tipos de Reciclables        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('AdministrarSponsors') }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image
                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>Gestión de Sponsors                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('AdministrarPlantas') }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row" }]}>
                        <Image
                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 10 }]}>Gestión de Plantas Recicladoras       </Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <TouchableOpacity
                    style={styleButton.base}
                    onPress={logOut}
                >
                    <     Text style={styleText.button}>Salir</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}