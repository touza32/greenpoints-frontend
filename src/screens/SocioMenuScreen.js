import React, { useContext, useState } from 'react';
import { 
    View, 
    Image,
    Text, 
    TouchableOpacity, TouchableHighlight
} from 'react-native';
import CarouselMenu  from "../components/CarouselMenu";
import { Header } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import FAIcon from 'react-native-vector-icons/FontAwesome'

// styles
import styleContainer from '../styles/Container';
import styleText from '../styles/Text';
import styleButton from '../styles/Button';

export default function SocioMenuScreen ({ navigation }) {

    const { logOut } = useContext( AuthContext );
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

        <Header   
                              
             backgroundColor="#69A03A"
             leftComponent={
            
             <TouchableHighlight onPress={() =>{ navigation.navigate('MenuHamburguesaSocio');}}>
             <FAIcon name='bars' size={28} style={{ color: "#FFFF" }} />
             </TouchableHighlight>
           
             }
            
             centerComponent={{ text: 'GREEN POINTS', style: { color: '#fff', fontWeight: "bold", fontSize: 18} }}
             rightComponent={{ text: 'XXXX', style: {color: '#fff', textAlign: 'right',
             fontSize: 15, fontWeight: "bold" }}}
          />  


       
                
                <View style={[styleContainer.main, { flex: 5, marginTop: 20}]}>
                    <CarouselMenu data={Newdata}/> 
                </View>
                 

                <View
                    style={[styleContainer.main,{ flex: 8 }] } >
                
                    <TouchableOpacity
                        onPress={() => {}} >
                        <View
                            style={[styleContainer.main,{marginBottom:30,flexDirection: "row"}]}>
                            <Image
                                
                                source={require('../assets/ItemCatMenu.png')}
                            >
                            </Image>    
                            < Text style={[styleText.blackText,{marginLeft: 30 }]}>Catálogo de Premios              </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}} >
                        <View
                            style={[styleContainer.main,{marginBottom:30,flexDirection: "row"}]}>
                            <Image style = {[{marginLeft: 1 }]}
                            
                                source={require('../assets/ItemRedMenu.png')}
                            >
                            </Image>    
                            < Text style={[styleText.blackText,{marginLeft: 30 }]}>Puntos de Reciclale                 </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('MisIntercambios')}} >
                        <View
                            style={[styleContainer.main,{marginBottom:17,flexDirection: "row"}]}>
                            <Image
                                source={require('../assets/ItemCoronamenu.png')}
                            >
                            </Image>    
                            < Text style={[styleText.blackText,{marginLeft: 30 }]}>Mis Intercambios                     </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}} >
                        <View
                            style={[styleContainer.main,{marginBottom:20,flexDirection: "row"}]}>
                            <Image
                                source={require('../assets/ItemFlechaMenu.png')}
                            >
                            </Image>    
                            < Text style={[styleText.blackText,{marginLeft: 30 }]}>Mis Premios                               </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}} >
                        <View
                            style={[styleContainer.main,{marginBottom:30,flexDirection: "row"}]}>
                            <Image
                                source={require('../assets/ItemCorazonMenu.png')}
                            >
                            </Image>    
                            < Text style={[styleText.blackText,{marginLeft: 30}]}>Donar Puntos                            </Text>
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