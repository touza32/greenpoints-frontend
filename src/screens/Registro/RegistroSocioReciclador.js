import React, {useState, useEffect} from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput} from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import InputFormDate from "../../components/InputFormDate";
import { Input } from 'react-native-elements';
import styleButton from "../../styles/Button";
import styleText from "../../styles/Text";
import styleTextInput from '../../styles/TextInput';
import styleContainer from "../../styles/Container";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import greenPointsApi from '../../api/greenPointsApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';

const schema = yup.object().shape({
    email: yup.
        string().
        email('Correo electrónico inválido').
        required('Requerido'),
    password: yup.
        string().
        required('Requerido').
        matches(/^.{8,32}$/, 'Contraseña muy débil: debe ser mayor o igual a 8 caracteres').
        matches(/^(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ]).{8,32}$/, 'Contraseña débil: debe tener al menos una minúscula y una mayúscula').
        matches(/^(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ])(?=.*\d).{8,}$/, 'Contraseña moderada: debe tener al menos un número'),
    passwordConfirmation: yup.
        string().
        oneOf([yup.ref('password'), null], 'La contraseña debe coincidir').
        required('Requerido'),
    firstName: yup.
        string().
        matches(/^[^!$%^&@*()_+|~=`{}\[\]:";'<>?,.\/0-9]+$/, 'Nombre inválido').
        required('Requerido'),
    lastName: yup.
        string().
        matches(/^[^!$%^&@*()_+|~=`{}\[\]:";'<>?,.\/0-9]+$/, 'Nombre inválido').
        required('Requerido'),
    birthDate: yup.
        mixed(). // transform(value => Moment(value).format('DD-MM-yyyy')).
        required('Requerido')
});

export default function RegistroSocioReciclador({ navigation }) {

    const [ReferidoFocus, setReferidoFocus] = useState(false);
    const [query, setQuery] = useState('');
    const [sociosAll, setSociosAll] = useState([]);
    const [socios, setSocios] = useState([]);
    const [socio, setSocio] = useState({ socioId: 0, email: '' });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const getSocios = async () => {
        try {
            const response = await greenPointsApi.get('/socio-reciclador')
            setSociosAll(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const onSubmit = async data => {
        await greenPointsApi.post('/socio-reciclador', {
            birthDate: data.birthDate,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        })
        navigation.navigate('Confirmacion', { nextScreen: 'LoginScreen', message: 'Tu registro ha sido exitoso' })
    }

    useEffect(() => {
        getSocios()
    },[])


    return (
        ReferidoFocus ? (
            <View style={[{ flex: 1 }]}>
                <Text style={styles.title}>Ingresa el Socio Reciclador amigo que te recomendó la app. Como beneficio recibirá puntos extra.</Text>
                <Input
                    inputContainerStyle={styles.inputbox}
                    style={{ fontSize: 15 }}
                    placeholder="socio@correo.com"
                    leftIcon={
                        <TouchableOpacity onPress={() => setReferidoFocus(false)}>
                            <Ionicons name='chevron-back' size={20} style={{ marginLeft: -10 }} />
                        </TouchableOpacity>
                    }
                    onChangeText={value => {
                        setQuery(value)
                        setSocios(sociosAll.filter(item => item.email.toUpperCase().indexOf(value.toUpperCase()) > -1))
                    }}
                    value={query}
                    autoFocus={true}
                >
                </Input>
                <FlatList
                    style={{ marginLeft: 20, marginTop: -10 }}
                    data={socios}
                    keyExtractor={item => item.socioId.toString()}
                    renderItem={({ item }) =>
                        <View>
                            <Text onPress={() => {
                                setSocio(item)
                                setQuery(item.email)
                                setReferidoFocus(false)
                            }}
                            >{item.email}
                            </Text>
                        </View>
                    }
                />
            </View>
        ):(
        <KeyboardAwareScrollView
            contentContainerStyle={[styleContainer.main, { padding: 20, paddingTop: 5 }]}
        >
            <Text style={{ marginVertical: 10, textDecorationLine: 'underline' }}>Los campos (*) son requeridos</Text>
            <InputForm
                control={control}
                errors={errors}
                name="email"
                title="Correo electrónico (*)"
                placeholder="ejemplo@dominio.com"
            />
            <InputForm
                control={control}
                errors={errors}
                name="password"
                title="Contraseña (*)"
                secureTextEntry={true}
                placeholder="Contraseña123"
            />
            <InputForm
                control={control}
                errors={errors}
                name="passwordConfirmation"
                title="Repetir contraseña (*)"
                secureTextEntry={true}
                placeholder="Contraseña123"
            />
            <InputForm
                control={control}
                errors={errors}
                name="firstName"
                title="Nombre (*)"
                placeholder="Nombre"
            />
            <InputForm
                control={control}
                errors={errors}
                name="lastName"
                title="Apellido (*)"
                placeholder="Apellido"
            />
            <InputFormDate
                control={control}
                errors={errors}
                name="birthDate"
                title="Fecha de nacimiento (*)"
                defaultDate="1999-01-01"
                minDate="1908-01-01"
                maxDate="2008-01-01"
            />
            <View style={{ alignSelf: 'center' }}>
            <Text style={styleTextInput.title}>¿Quién te recomendó Green Points?</Text>
            <TextInput
                style={styles.inputboxfilled}
                placeholder="socio@correo.com"
                value={socio.email}
                onFocus={() => setReferidoFocus(true)}
            >
            </TextInput>
            </View>
            <TouchableOpacity style={[styleButton.base, { alignSelf: 'center' }]} onPress={handleSubmit(onSubmit)}>
                <Text style={styleText.button}>FINALIZAR</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>

        )
        
    );
}

const styles = StyleSheet.create({
    inputbox: {
        height: 40,
        width: 300,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginLeft: 20,
    },
    title: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        //marginHorizontal: 30,
        textAlign:'center',
        marginBottom: 5

    },
    inputboxfilled: {
        height: 40,
        width: 300,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        //marginLeft: 30,
        marginBottom: 10


    }


})