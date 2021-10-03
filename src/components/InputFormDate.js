import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Controller } from 'react-hook-form';
import styleTextInput from '../styles/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as styles from '../styles';

export default function InputForm({ control, errors, name, title }) {

    const [date, setDate] = useState(new Date(1999, 0, 1));
    const [show, setShow] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    return (
        <View style={{ alignSelf: 'center' }}>
            <Text style={styleTextInput.title}>{title}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <TouchableOpacity style={[styles.TextInput.large, { justifyContent: 'center' }]}
                            onPress={() => setShow(true)}
                            activeOpacity={1}
                        >
                            <Text>
                                {value !== undefined
                                    ?
                                    value.toISOString().slice(8, 10) +
                                    value.toISOString().slice(4, 8) +
                                    value.toISOString().slice(0, 4)
                                    :
                                    <Text style={{ color: 'gray' }}>01-01-99</Text>}
                            </Text>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                value={date}
                                minimumDate={new Date(1908, 0, 3)}
                                maximumDate={new Date(2008, 0, 1)}
                                onChange={(e, s) => {
                                    onChangeDate(e, s)
                                    onChange(s)
                                }}
                            />
                        )}
                    </View>
                )}
                name={name}
            />
            <View style={{ width: '80%' }}>
                <Text style={{ color: 'red' }}>{errors[name]?.message}</Text>
            </View>

        </View>
    )
}