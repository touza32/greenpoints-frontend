import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Controller } from 'react-hook-form';
import styleTextInput from '../styles/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as styles from '../styles';

export default function InputForm(props) {

    const { control, errors, name, title, defaultDate, minDate, maxDate } = props

    const [date, setDate] = useState(new Date(Moment(defaultDate)));
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
                                    Moment(value).format('DD-MM-yyyy')
                                    :
                                    <Text style={{ color: 'gray' }}>{Moment(defaultDate).format('DD-MM-yyyy')}</Text>}
                            </Text>
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                value={date}
                                minimumDate={new Date(Moment(minDate || '1900-01-01'))}
                                maximumDate={new Date(Moment(maxDate || '2050-01-01'))}
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