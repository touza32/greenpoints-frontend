import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Moment from 'moment';
import greenPointsApi from '../../api/greenPointsApi';
import * as styles from '../../styles';

export default function DetalleLote({ route, navigation }) {

      const { loteId } = route.params;

      const [lote, setLote] = useState({})

      useEffect(() => {
            (async () => {
                  const loteData = await greenPointsApi.get('/lote/' + loteId);
                  const lote = await loteData.data;
                  setLote(lote);
            })();
      }, []);

      return (
            <View style={{ flex: 1 }}>
                  <Header navigation={navigation} title="LOTE CERRADO" />
                  <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'space-evenly' }}>
                              <View>
                                    <Text style={[styles.TextInput.title, { marginRight: 'auto' }]}>Tipo de material</Text>
                                    <TextInput style={styles.TextInput.large}
                                          value={lote.tipoMaterialNombre}
                                          editable={false}
                                    />
                              </View>
                              <View>
                                    <Text style={[styles.TextInput.title, { marginRight: 'auto' }]}>Kilos de material</Text>
                                    <TextInput style={styles.TextInput.large}
                                          value={lote.kilos}
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
                                    <Text style={[styles.TextInput.title, { marginRight: 'auto' }]}>Fecha de cierre</Text>
                                    <TextInput style={styles.TextInput.large}
                                          value={Moment(lote.fechaCierre).format('DD/MM/yyyy')}
                                          editable={false}
                                    />
                              </View>
                              <View>
                                    <Text style={[styles.TextInput.title, { marginRight: 'auto' }]}>Planta recicladora</Text>
                                    <TextInput style={styles.TextInput.large}
                                          value={lote.plantaNombre}
                                          editable={false}
                                    />
                              </View>
                        </View>
                  </View>
            </View>
      );
}

