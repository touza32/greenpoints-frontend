import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ImgPicker(props) {

    const { handleImage } = props;

    const [pickerResult, setPickerResult] = useState({ uri: '' });

    let openImagePickerAsync = async () => {

        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Se requieren permisos para acceder a la cámara");
            return;
        }

        let _pickerResult = await ImagePicker.launchImageLibraryAsync();

        handleImage(_pickerResult);

        setPickerResult(_pickerResult);

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', ...props }}>
            <TouchableOpacity onPress={openImagePickerAsync}
                style={styles.box}>
                {pickerResult.uri === ''
                    ?
                    <Text
                        style={styles.text}>
                        {`Seleccione\nuna\nimagen`}
                    </Text>
                    :
                    <Image
                        style={styles.box}
                        source={{ uri: pickerResult.uri }}

                    />
                }
                <Ionicons
                    style={styles.icon}
                    name='create-outline'
                    size={30}
                    color='gray'

                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        position: 'absolute',
        left: 200,
        bottom: 170
    },
    text: {
        textAlign: 'center',
        fontSize: 32,
        color: 'gray'
    }
})