import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image,StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../../components/InputForm";
//import InputFormDate from "../../../components/InputFormDate";
import styleButton from "../../../styles/Button";
import styleText from "../../../styles/Text";
import styleTextInput from "../../../styles/TextInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../../api/greenPointsApi';
import Header from '../../../components/Header';
import ImagePicker from '../../../components/ImagePicker';
import Moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const schema = yup.object().shape({
    nombre: yup.
        mixed().
        required('Requerido')
});

export default function AgregarSponsor({ route, navigation }) {

    const {id} = route.params
    console.log(id);
    const [Sponsor, setSponsor] = useState(null);
    const [SponsorName, setSponsorName] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(()=>{
        (async () => {
            const SponsorData = await greenPointsApi.get(`/sponsor/${ id }`);
            const Sponsor = await SponsorData.data;
            setSponsor(Sponsor)
            console.log(Sponsor)
            setSponsorName(Sponsor.nombre)
        })();

        
    },[]);

    //useEffect(() => route.params?.codigos && setCodigos(route.params?.codigos), [route.params?.codigos])

    /*const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 5000,
                useNativeDriver: false
            }).start();
        });
    };*/

    const [image, setImage] = useState({});
    const [codigo, setCodigo] = useState('');
    const [codigos, setCodigos] = useState([]);
    const [errorCodigo, setErrorCodigo] = useState(false);

    const onSubmit = async data => {
        if (codigos.length === 0) return setErrorCodigo(true)
        const objData = {
            ...data,
            codigos: codigos,
            image: image
        }
        console.log(objData)
        // await greenPointsApi.post('/alta-premio', {
        //     nombre: data.nombre,
        // })
        //navigation.navigate('Confirmacion', { nextScreen: 'AgregarPremio', message: 'Su registro ha sido exitoso' })
    }

    return (
        <KeyboardAwareScrollView
            stickyHeaderIndices={[0]}
        >
            <Header navigation={navigation} title="ACTUALIZAR SPONSOR" />
            {Sponsor && (
            <View style={{ flex: 1,alignItems:"center"}}>
                <View style={{ flex: 0.35 ,justifyContent: 'center'}}>
                    <Image
                        source={{ uri: Sponsor.imagen }}
                        style={styles.image}>
                    </Image>
                </View>
                {/*<ImagePicker
                    handleImage={(image) => setImage(image)}
                    marginVertical={25}
                />*/}
                <View style={{ flex: 0.30 }}>
                    <Text style={[styles.TextInput, { marginRight: 'auto' }]}>Nombre</Text>
                    <TextInput style={styles.TextInput}
                               value={SponsorName}
                               editable={true}
                               //onFocus={() => setSponsorName('')}
                    />
                </View>
                
                
                <TouchableOpacity style={[styleButton.base, {marginTop:150, alignSelf: 'center' }]} onPress={handleSubmit(onSubmit)}>
                    <Text style={styleText.button}>AGREGAR</Text>
                </TouchableOpacity>
                
            </View>
            )}
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 260,
        height: 180,
        alignSelf: 'center',
        marginTop: 10
    },
    TextInput: {
        height:40,
        width: 300,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },})
