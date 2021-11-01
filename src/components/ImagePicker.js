import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ImgPicker(props) {

    const { handleImage, defaultValue } = props;

    const [pickerResult, setPickerResult] = useState({ uri: '' });

    let openImagePickerAsync = async () => {

        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Se requieren permisos para acceder a la cámara");
            return;
        }

        let _pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true });

        if (_pickerResult.uri !== undefined) {
            let format = _pickerResult.uri.substr(-3)
            if (format !== 'jpg' & format !== 'png') return alert("Solo se admite formato .jpg o .png")
        }

        handleImage(_pickerResult);
        _pickerResult.cancelled === false && setPickerResult(_pickerResult);

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', ...props }}>
            <TouchableOpacity onPress={openImagePickerAsync}
                style={styles.box}>
                {defaultValue !== undefined & (pickerResult.uri === '')
                    ?
                    <Image
                        style={styles.box}
                        source={{ uri: defaultValue }}
                    />
                    :
                    defaultValue === undefined & (pickerResult.uri === '')
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