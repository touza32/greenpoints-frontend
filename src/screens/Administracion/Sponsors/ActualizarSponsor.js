import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image,StyleSheet,Alert} from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../../components/InputForm";
import styleButton from "../../../styles/Button";
import styleText from "../../../styles/Text";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../../api/greenPointsApi';
import Header from '../../../components/Header';
import ImagePicker from '../../../components/ImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';


const schema = yup.object().shape({
    nombre: yup.
        mixed().
        required('Requerido')
});

export default function ActualizarSponsor({ route, navigation }) {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [Sponsor, setSponsor] = useState({});
    const [image, setImage] = useState({});
    const [ErrorImagen, setErrorImagen] = useState(false);
    

    useEffect(()=>{
        const {id} = route.params
        console.log(id);

        (async () => {
            const SponsorData = await greenPointsApi.get(`/sponsor/${ id }`);
            const Sponsor = await SponsorData.data;
            setSponsor(Sponsor)
            
        })();
    },[]);

    useEffect(() => {
        reset({
            nombre: Sponsor.nombre,
            activo: Sponsor.activo
        })
    }, [Sponsor])

    const onSubmit = async data => {
        const objData = {
            ...data,
               image: image
        }
        console.log(objData)
        
        await greenPointsApi.put('/sponsor', {
            id: Sponsor.id,
            nombre: objData.nombre,
            imageData: objData.image,
            activo: objData.activo

        });
        {Sponsor.activo ?
            navigation.navigate('Confirmacion', { nextScreen: 'AdministrarSponsors', message: 'Se actualizó exitosamente' })
        :
            navigation.navigate('Confirmacion', { nextScreen: 'AdministrarSponsors', message: 'Se activó exitosamente' })
        }
    }

    const desactivarSponsor = () => {
        Alert.alert(
            'Desactivar Sponsor',
            '¿Estás seguro que deseas desactivar este sponsor?',
            [
                {
                    text: 'NO'
                },
                {
                    text: 'SI',
                    onPress: async () => {
                        await greenPointsApi.delete('/sponsor/' + Sponsor.id)
                        navigation.navigate('Confirmacion', { nextScreen: 'AdministrarSponsors', message: 'Se desactivó exitosamente' })
                    }
                }
            ]
        )
    }

    return (
        <KeyboardAwareScrollView
            stickyHeaderIndices={[0]}
        >
            <Header
            leftComponent={
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ marginLeft: -10 }}
                        onPress={() => { navigation.navigate('AdministrarSponsors') }}>
                        <Ionicons name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                    <Text
                        style={[styleText.button, { width: '90%' }]}>EDITAR SPONSOR</Text>
                </View>
            }
            navigation={navigation}
        /> 
            {/*{Sponsor && (*/}
            <View style={{ flex: 1, paddingBottom: 100 }}>
                {Sponsor.activo ?
                    <View>
                        <ImagePicker
                        handleImage={(image) => setImage(image)}
                        marginVertical={25}
                        defaultValue={Sponsor.imagen}
                    />
                        <InputForm
                        control={control}
                        errors={errors}
                        name="nombre"
                        title="Nombre (*)"
                        placeholder="Nombre"
                    
                        />
            
                        <TouchableOpacity
                        style={[styleButton.base, { alignSelf: 'center' }]}
                        onPress={handleSubmit(onSubmit)}
                        onPressIn={() => {
                        if (image === undefined || image === null || Object.keys(image).length === 0) setImage(null)
                        }}
                        >
                            <Text style={styleText.button}>ACTUALIZAR</Text>  
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[styleButton.base, { alignSelf: 'center', backgroundColor: 'red', marginTop: 20 }]}
                        onPress={() => desactivarSponsor()}
                        >
                            <Text style={styleText.button}>DESACTIVAR</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={{ alignItems: 'center'}}>
                        <Image
                        style={styles.box}
                        source={{ uri: Sponsor.imagen }}
                        />
                        <InputForm
                        control={control}
                        errors={errors}
                        name="nombre"
                        title="Nombre"
                        placeholder="Nombre"
                        editable={false}  
                        />
                        <TouchableOpacity
                        style={[styleButton.base, { alignSelf: 'center' }]}
                        onPress={handleSubmit(onSubmit)}
                        onPressIn={() => {
                        if (image === undefined || image === null || Object.keys(image).length === 0) setImage(null)
                        }}
                        >
                            <Text style={styleText.button}>ACTIVAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[styleButton.base, { alignSelf: 'center', backgroundColor: 'gray', marginTop: 20 }]}
                        disabled={true}
                        >
                            <Text style={styleText.button}>DESACTIVAR</Text>
                        </TouchableOpacity>
                    </View>
            }
            </View>
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
    box: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 25
    },
    TextInput: {
        height:40,
        width: 300,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },})
