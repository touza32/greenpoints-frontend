import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import styleText from "../../styles/Text";
import styleButton from '../../styles/Button';
import Header from '../../components/Header';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import greenPointsApi from '../../api/greenPointsApi';
import { AuthContext } from '../../context/AuthContext';
import { Slider } from 'react-native-elements';


export default function DonacionDeMisPuntos({ route, navigation }) {

    const [socioFocus, setSocioFocus] = useState(false);
    const [socio, setSocio] = useState({ socioId: 0, email: '' });
    const [socios, setSocios] = useState([]);
    const [sociosAll, setSociosAll] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const { token, id } = useContext(AuthContext);
    const [SlideValue, setSlideValue] = useState(0);
    const [puntos, setPuntos] = useState(null)
    const [isDisable, setisDisable] = useState(false);
    const [enabled, setEnabled] = useState(false)

    const getSocios = async () => {
        setLoading(true)
        try {
            const response = await greenPointsApi.get('/socio-reciclador', { headers: { Authorization: token } })
            setLoading(false)
            setSociosAll(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getPuntos = async id => {
        setLoading(true)
        try {
            const response = await greenPointsApi.get('/socio-reciclador/puntos?socioId=' + id, { headers: { Authorization: token } })
            setLoading(false)
            setPuntos(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const checkDisable = async puntos => {
        if (puntos == 0) {
            setisDisable(true)
        }
    }

    const sendPoints = async () => {
        try {
            const donacion = await greenPointsApi.post('/donacion', {
                socioOrigenId: id,
                socioDestinoId: socio.socioId,
                puntos: SlideValue
            });
            donacion &&
                navigation.navigate('Confirmacion', { nextScreen: 'SocioMenuScreen', message: 'Su donación ha sido exitosa' });

        } catch (e) {
            console.error(e)
        }
    };


    useEffect(() => {
        getSocios()
        getPuntos(id)
        checkDisable(puntos)
    }, [])

    const slideBool = id !== 0 && socio.socioId > 0 && SlideValue > 0;

    useEffect(() => {
        setEnabled(slideBool)
    }, [slideBool])

    return (
        socioFocus ? (
            <View style={[{ flex: 1 }]}>
                <Header navigation={navigation} title="DONAR MIS PUNTOS" />
                <Image
                    source={require('../../assets/DonacionPuntos.png')}
                    style={styles.image}>
                </Image>
                <Text style={styles.title}>Socio Reciclador</Text>
                <Input
                    inputContainerStyle={styles.inputbox}
                    style={{ fontSize: 15 }}
                    placeholder="socio@correo.com"
                    leftIcon={
                        <TouchableOpacity onPress={() => setSocioFocus(false)}>
                            <Ionicons name='chevron-back' size={20} style={{ marginLeft: -10 }} />
                        </TouchableOpacity>
                    }
                    onChangeText={value => {
                        setQuery(value)
                        setSocios(sociosAll.filter(item => item.socioId !== id && item.email.toUpperCase().indexOf(value.toUpperCase()) > -1))
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
                                setSocioFocus(false)
                            }}
                            >{item.email}
                            </Text>
                        </View>
                    }
                />

            </View>
        ) : (
            isDisable ? (
                <View style={{ flex: 1 }}>
                    <Header navigation={navigation} title="DONAR MIS PUNTOS" />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.disabledactions}>No tienes puntos para donar</Text>
                    </View>
                </View>

            ) : (
                <View style={[{ flex: 1 }]}>

                    <Header navigation={navigation} title="DONAR MIS PUNTOS" />
                    {puntos && (
                        <View>
                            <Image
                                source={require('../../assets/DonacionPuntos.png')}
                                style={styles.image}>
                            </Image>
                            <Text style={styles.title}>Socio Reciclador</Text>
                            <TextInput
                                style={styles.inputboxfilled}
                                placeholder="socio@correo.com"
                                value={socio.email}
                                onFocus={() => setSocioFocus(true)}

                            >
                            </TextInput>
                            <Text style={styles.title}>Puntos</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                <Slider
                                    style={{ width: 300, height: 30 }}
                                    value={SlideValue}
                                    onValueChange={(value) => setSlideValue(value)}
                                    minimumValue={0}
                                    maximumValue={puntos}
                                    step={1}
                                    maximumTrackTintColor='gray'
                                    minimumTrackTintColor='#CC7D00'
                                    thumbTintColor='#CC7D00'
                                    thumbStyle={{ height: 25, width: 25 }}
                                />
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={styles.pointsnumber}> {SlideValue}</Text>
                                    <View>
                                        <Text style={styles.points}>Green</Text>
                                        <Text style={styles.points}>Points</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
                                {enabled ?
                                    (<TouchableOpacity
                                        style={styleButton.base}
                                        onPress={() => { sendPoints() }}
                                    >
                                        <Text style={styleText.button}>DONAR</Text>
                                    </TouchableOpacity>)
                                    : (<TouchableOpacity
                                        style={[styleButton.base, { backgroundColor: 'gray' }]}
                                        disabled={true}
                                    >
                                        <Text style={styleText.button}>DONAR</Text>
                                    </TouchableOpacity>)
                                }
                            </View>
                        </View>
                    )}
                </View>
            )
        )
    )

}

const styles = StyleSheet.create({
    image: {
        width: 184,
        height: 154,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20
    },

    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 30,
        textAlign: 'left',
        marginBottom: 5

    },
    inputbox: {
        height: 40,
        width: 300,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginLeft: 20,




    },
    inputboxfilled: {
        height: 40,
        width: 300,
        paddingLeft: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginLeft: 30,
        marginBottom: 10


    },
    points: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: -8,
        marginLeft: 10




    },
    pointsnumber: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#CC7D00'



    },
    disabledactions: {
        color: '#B2B2B2',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10

    }

})