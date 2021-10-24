import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Moment from 'moment';
import greenPointsApi from '../../api/greenPointsApi';
import { Input } from 'react-native-elements';
import * as styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';

export default function ActualizacionLote({ route, navigation }) {

      const { loteId } = route.params;

      const [lote, setLote] = useState({})
      const [plantaFocus, setPlantaFocus] = useState(false)
      const [plantasAll, setPlantasAll] = useState([])
      const [planta, setPlanta] = useState({})
      const [plantas, setPlantas] = useState([])
      const [query, setQuery] = useState('')


      useEffect(() => {
            (async () => {
                  const loteData = await greenPointsApi.get('/lote/' + loteId);
                  const lote = await loteData.data;
                  setLote(lote);
            })();
            (async () => {
                  const plantasData = await greenPointsApi.get('/planta/search');
                  const plantas = await plantasData.data;
                  setPlantasAll(plantas);
            })();
      }, []);

      useEffect(() => {
            if (lote.plantaNombre !== '' && plantasAll.length > 0) {
                  const plantaLote = plantasAll.filter(item => item.nombre.indexOf(lote.plantaNombre) > -1)
                  setPlanta(plantaLote[0])
            }
      }, [lote, plantasAll]);

      const cerrarLote = async () => {
            try {
                  const cerrarLote = await greenPointsApi.put('/lote', {
                        loteId: loteId,
                        plantaId: planta.id
                  });
                  cerrarLote &&
                        navigation.navigate('Confirmacion', { nextScreen: 'PuntoMenuScreen', message: 'Lote cerrado exitosamente' });

            } catch (e) {
                  console.error(e)
            }
      };

      return (
            <View style={{ flex: 1 }}>
                  <Header navigation={navigation} title="ACTUALIZAR LOTE" />
                  {plantaFocus ? (
                        <View style={[{ flex: 1 }]}>
                              <Text style={[styles.TextInput.title, { marginLeft: 10 }]}>Planta recicladora</Text>
                              <Input
                                    inputContainerStyle={styles.TextInput.large}
                                    style={{ fontSize: 15 }}
                                    placeholder="Planta"
                                    leftIcon={
                                          <TouchableOpacity onPress={() => setPlantaFocus(false)}>
                                                <Ionicons name='chevron-back' size={20} style={{ marginLeft: -10 }} />
                                          </TouchableOpacity>
                                    }
                                    onChangeText={value => {
                                          setQuery(value)
                                          setPlantas(plantasAll.filter(item => item.nombre.toUpperCase().indexOf(value.toUpperCase()) > -1))
                                    }}
                                    value={query}
                                    autoFocus={true}
                              >
                              </Input>
                              <FlatList
                                    style={{ marginLeft: 20, marginTop: -10 }}
                                    data={plantas}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item }) =>
                                          <View>
                                                <Text onPress={() => {
                                                      setPlanta(item)
                                                      setQuery(item.nombre)
                                                      setPlantaFocus(false)
                                                }}
                                                >{item.nombre}
                                                </Text>
                                          </View>
                                    }
                              />

                        </View>
                  ) : (
                        <View style={{ flex: 1 }}>
                              <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <View>
                                          <Text style={[styles.TextInput.title, { marginRight: 'auto' }]}>Tipo de material</Text>
                                          <TextInput style={styles.TextInput.large}
                                                value={lote.tipoMaterialNombre}
                                                editable={false}
                                          />
                                    </View>
                                    <View>
                                          <Text style={[styles.TextInput.title, { marginRight: 'auto' }]}>Fecha de creación</Text>
                                          <TextInput style={styles.TextInput.large}
                                                value={Moment(lote.fechaCreacion).format('DD/MM/yyyy')}
                                                editable={false}
                                          />
                                    </View>
                                    <View>
                                          <Text style={[styles.TextInput.title, { marginRight: 'auto' }]}>Planta recicladora</Text>
                                          <TextInput
                                                style={styles.TextInput.large}
                                                value={(lote.plantaId !== undefined || (planta && planta.id !== undefined)) ? planta.nombre : ''}
                                                placeholder="Planta"
                                                onFocus={() => setPlantaFocus(true)}
                                          />
                                    </View>
                              </View>
                              <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <TouchableOpacity style={[styles.Button.base]}
                                          onPress={() => cerrarLote()}
                                    >
                                          <Text style={styles.Text.button}>CERRAR LOTE</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>)
                  }
            </View>
      );
}

