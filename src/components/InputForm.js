import React from 'react';
import { View, Text, TextInput } from "react-native";
import { Controller } from 'react-hook-form';
import styleTextInput from '../styles/TextInput';

export default function InputForm(props) {

    const { control, errors, name, title, containerStyle, ...inputProps } = props;

    return (
        <View style={[{alignSelf: 'center'}, containerStyle]}>
            <Text style={styleTextInput.title}>{title}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styleTextInput.large}
                        onChangeText={onChange}
                        value={value}
                        {...inputProps}
                    />
                )}
                name={name}
            />
            <View style={{width:'80%'}}>
            <Text style={{color:'red'}}>{errors[name]?.message}</Text>
            </View>
        </View>
    )
}