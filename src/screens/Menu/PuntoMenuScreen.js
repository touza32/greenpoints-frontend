import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import CarouselMenu from "../../components/CarouselMenu";

// styles
import styleContainer from '../../styles/Container';
import styleText from '../../styles/Text';
import { AuthContext } from '../../context/AuthContext';

//api
import greenPointsApi from '../../api/greenPointsApi';

export default function PuntMenuScreen({ navigation }) {
    const [sponsors, setSponsors] = useState([])

    useEffect(() => {
        (async () => {
            const sponsorsData = await greenPointsApi.get('/sponsor/top');
            const sponsors = await sponsorsData.data;
            setSponsors(sponsors);
        })();
    }, []);

    return (
        <View style={[styleContainer.main, { flex: 1 }]}>
            <Header navigation={navigation} leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate('MenuHamburguesa'); }}>
                    <Ionicons name="menu" size={40} color="white" />
                </TouchableOpacity>
            } />

            <View style={[styleContainer.main],{ marginVertical:10}}>
                < Text style={styles.TextAuspician}>Auspician Green Points</Text>
            </View>

            <View style={[styleContainer.main,{ flex: 0.5}]}>
                <CarouselMenu data={sponsors} onPress={()=>null}/>
            </View>

            {/*<View style={[styleContainer.main, { flex: 1 }]}>
                <Image
                    source={require('../../assets/PuntoMenu.png')}
                    style={{
                        width: 359,
                        height: 215
                    }}>
                </Image>
                </View>*/}

            <View
                style={{flex: 0.8}} >

                <TouchableOpacity
                    onPress={() => { navigation.navigate('RegistrarIntercambio') }} >
                    <View
                        style={[styleContainer.main,{flexDirection: "row" , marginLeft:-30, marginVertical:20 }]}>
                        <Image

                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={styles.TextItem}>Registrar Intercambio</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('CrearLote') }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row", marginLeft:-143, marginVertical:20}]}>
                        <Image style={[{ marginLeft: 1 }]}

                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={styles.TextItem}>Nuevo Lote</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('MisLotes') }} >
                    <View
                        style={[styleContainer.main, { flexDirection: "row", marginLeft:-157, marginVertical:20}]}>
                        <Image
                            source={require('../../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={styles.TextItem}
                        >Mis Lotes</Text>
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

const styles = StyleSheet.create({
    TextAuspician: {
        color: '#69A03A',
        fontSize: 25,
        fontWeight: 'bold',
    },
    TextItem: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        marginLeft:20
    },
    



})