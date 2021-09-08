import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../components/InputForm";
import styleContainer from "../styles/Container";
import styleButton from "../styles/Button"
import styleText from "../styles/Text";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    address: yup.string().required('Requerido')
});

export default function ConfirmarDireccion({navigation}) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    //const onSubmit = () => {navigation.navigate('RegistroTipoMaterial')}

    return (
        <View style={styleContainer.main}>
            <Image style={{height:300,width:'100%',marginBottom:20}} source={{uri: "https://picsum.photos/300"}}>

            </Image>
            <InputForm
                control={control}
                errors={errors}
                name="address"
                title="Dirección"
            />

            <TouchableOpacity
              style={[styleButton.base, { marginTop: 60 }] }
              onPress={() => navigation.navigate('RegistroTipoMaterial')}
              >
              <Text style={styleText.button}>SIGUIENTE</Text>
            </TouchableOpacity>

        </View>
    )
}