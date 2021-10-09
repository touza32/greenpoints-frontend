import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Divider } from 'react-native-elements';
//styles
import styleContainer from "../../styles/Container";
import styleText from "../../styles/Text";
//api
import greenPointsApi from '../../api/greenPointsApi';
// components
import Header from '../../components/Header';

export default function CatalogoPremios({ props, navigation }) {

    const [ premios, setPremios ] = useState([]);

    useEffect(() => {
        (async () => {
            const premiosData = await greenPointsApi.get('/premio');
            setPremios(premiosData.data);
          })();

    }, []);

    return (
        <View>
            <Header navigation={navigation} title="PREMIOS" />
            <View>
                <FlatList
                    data={ premios }
                    keyExtractor={ (premio) => premio.id.toString() }
                    renderItem={ ({ item }) => 
                        <TouchableOpacity onPress={() => {  }}>
                            <View style={ styles.premio }>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={ require('../../assets/PremioCine.png') }
                                            style={ styles.image }>
                                    </Image> 
                                    <View style={ styles.premioDetail }>
                                        <Text style={[styleText.titleList, { textAlign: 'left' }]}>{ item.description }</Text>
                                        <Text style={ styles.sponsor }>{ item.sponsorName }</Text>
                                    </View>
                                </View>
                                <View style={ styles.points }>
                                    <Text style={ styles.pointsHeader }>{ item.points }</Text>
                                    <Text style={ styles.pointsBody }>GREEN</Text>
                                    <Text style={ styles.pointsBody }>POINTS</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={() => { return <Divider color= '#B2B2B2'/> }}>
                </FlatList>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 80,
        marginLeft:10,
        marginRight:10
    },
    sponsor: {
        color: '#827C7B', 
        textAlign: 'left',
        fontSize: 15
    },
    premio: {
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row",
        paddingRight: 2,
        paddingLeft: 2
    },
    premioDetail: {
        flexDirection: "column",
        width: 170
    },
    points: {
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    pointsHeader: {
        fontWeight: "bold",
        fontSize: 35
    },
    pointsBody: {
        fontWeight: "bold",
        fontSize: 10
    }
})
