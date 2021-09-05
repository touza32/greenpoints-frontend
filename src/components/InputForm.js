import React from 'react';
import { View, Text, TextInput } from "react-native";
import { Controller } from 'react-hook-form';
import styleTextInput from '../styles/TextInput';

export default function InputForm({ control, errors, name, title, ...inputProps }) {

    return (
        <View style={{alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>{title}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styleTextInput.large}
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