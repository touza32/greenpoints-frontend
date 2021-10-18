import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import CarouselMenu from "../../components/CarouselMenu";
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import greenPointsApi from '../../api/greenPointsApi';

// styles
import styleContainer from '../../styles/Container';
import styleText from '../../styles/Text';

export default function SocioMenuScreen({ navigation }) {

    const { id } = useContext(AuthContext);

    const [puntos, setPuntos] = useState(0);
    const [premios, setPremios] = useState([])

    useEffect(() => {
        navigation.addListener('focus', () => {
            (async () => {
                const puntosData = await greenPointsApi.get('/usuario/socio-reciclador/puntos?socioId=' + id);
                const puntos = await puntosData.data;
                setPuntos(puntos)
            })();
        })
    }, [navigation]);

    useEffect(() => {
        (async () => {
            const premiosData = await greenPointsApi.get('/premio/top');
            const premios = await premiosData.data;
            setPremios(premios);
        })();
    }, []);

    return (

        <View style={[styleContainer.main, { flex: 1 }]}>

            <Header navigation={navigation} leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate('MenuHamburguesaSocio'); }}>
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            } />
            <View style={{ marginTop: 20, backgroundColor: '#CC7D00', borderRadius: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', height: 40, width: '60%' }}>
                <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>MIS PUNTOS</Text>
                <View style={{ backgroundColor: 'white', height: 25, paddingHorizontal: 10, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#CC7D00' }}>{puntos}</Text>
                </View>
            </View>
            <View style={[styleContainer.main, { flex: 5, marginTop: 20 }]}>
                <CarouselMenu data={premios} navigation={navigation} puntos={puntos}/>
            </View>

            <View
                style={[styleContainer.main, { flex: 8 }]} >

                <TouchableOpacity
                    onPress={() => { navigation.navigate('CatalogoPremios') }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 30, flexDirection: "row" }]}>
                        <Image

                            source={require('../../assets/ItemCatMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Catálogo de Premios              </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('MapaPuntosReciclaje') }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 30, flexDirection: "row" }]}>
                        <Image style={[{ marginLeft: 1 }]}

                            source={require('../../assets/ItemRedMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Puntos de Reciclaje                 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('MisIntercambios') }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 17, flexDirection: "row" }]}>
                        <Image
                            source={require('../../assets/ItemCoronamenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Mis Intercambios                     </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('MisPremios') }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 20, flexDirection: "row" }]}>
                        <Image
                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Mis Premios                               </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('DonacionDeMisPuntos')}} >
                    <View
                        style={[styleContainer.main, { marginBottom: 30, flexDirection: "row" }]}>
                        <Image
                            source={require('../../assets/ItemCorazonMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Donar Puntos                            </Text>
                    </View>
                </TouchableOpacity>

                

            </View>

        </View>


    );
}