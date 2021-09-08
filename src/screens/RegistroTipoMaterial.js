import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, FlatList,CheckBox } from "react-native";
import { useForm } from "react-hook-form";
import styleContainer from "../styles/Container";
import styleButton from "../styles/Button"
import styleText from "../styles/Text";

const data = [
    { id: 1, title: 'PAPEL', image: require('../assets/tilde.png'), check:false},
    { id: 2, title: 'PLASTICO', image: require('../assets/tilde.png'), check:false },
    { id: 3, title: 'CARTON', image: require('../assets/tilde.png'), check:false },
    { id: 4, title: 'VIDRIO', image: require('../assets/tilde.png'), check:false },
    { id: 5, title: 'ALUMINIO', image: require('../assets/tilde.png'), check:false },
    { id: 6, title: 'COBRE', image: require('../assets/tilde.png'), check:false }
  ];


export default function RegistroTipoMaterial() {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = () => { console.log("fin") }

    return (
        <View style={styleContainer.main}>
            <Text style={styleText.blackText}>Estos son los tipos de materiales que vas a aceptar de los socios recicladores</Text>
            
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                //<View style={styleText.listItem}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Image
                source={item.image}
                style={{
                    width: 60,
                    height: 60
                }}>
                </Image>
                    <Text style={styleText.subtitle25}>{item.title}</Text>
                    <CheckBox />
                </View>
                )}
            />
            <TouchableOpacity style={styleButton.base} onPress={handleSubmit(onSubmit)}>
               <Text style={styleText.button}>FINALIZAR</Text>
            </TouchableOpacity>
        </View>
    )
}