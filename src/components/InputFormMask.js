import React from 'react';
import { View, Text } from "react-native";
import { TextInputMask } from 'react-native-masked-text';
import { Controller } from 'react-hook-form';
import styleTextInput from '../styles/TextInput';

export default function InputForm({ control, errors, name, title, type, maskOptions, ...inputProps }) {

    return (
        <View style={{alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>{title}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInputMask style={styleTextInput.large}
                        type={type}
                        options={maskOptions}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        {...inputProps}
                    />
                )}
                name={name}
            />
            <Text style={{color:'red'}}>{errors[name]?.message}</Text>
        </View>
    )
}