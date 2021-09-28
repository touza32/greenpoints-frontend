import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity, TouchableHighlight
} from 'react-native';
import CarouselMenu from "../components/CarouselMenu";
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

// styles
import styleContainer from '../styles/Container';
import styleText from '../styles/Text';

export default function SocioMenuScreen({ navigation }) {

    /*const {Newdata} = useState(null);*/
    const Newdata = [
        {
            fuente: require('../assets/PremioCine.png')
        },
        {
            fuente: require('../assets/PremioBurger.png')
        },
        {
            fuente: require('../assets/PremioLatte.png')
        }
    ];

    return (

        <View style={[styleContainer.main, { flex: 1 }]}>

            <Header navigation={navigation} leftComponent={
                <TouchableOpacity onPress={() => { navigation.navigate('MenuHamburguesaSocio'); }}>
                    <Ionicons name="menu" size={30} color="white" />
                </TouchableOpacity>
            } />

            <View style={[styleContainer.main, { flex: 5, marginTop: 20 }]}>
                <CarouselMenu data={Newdata} />
            </View>

            <View
                style={[styleContainer.main, { flex: 8 }]} >

                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 30, flexDirection: "row" }]}>
                        <Image

                            source={require('../assets/ItemCatMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Catálogo de Premios              </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 30, flexDirection: "row" }]}>
                        <Image style={[{ marginLeft: 1 }]}

                            source={require('../assets/ItemRedMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Puntos de Reciclale                 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('MisIntercambios') }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 17, flexDirection: "row" }]}>
                        <Image
                            source={require('../assets/ItemCoronamenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Mis Intercambios                     </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 20, flexDirection: "row" }]}>
                        <Image
                            source={require('../assets/ItemFlechaMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Mis Premios                               </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }} >
                    <View
                        style={[styleContainer.main, { marginBottom: 30, flexDirection: "row" }]}>
                        <Image
                            source={require('../assets/ItemCorazonMenu.png')}
                        >
                        </Image>
                        < Text style={[styleText.blackText, { marginLeft: 30 }]}>Donar Puntos                            </Text>
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