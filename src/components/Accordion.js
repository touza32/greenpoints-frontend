import React, { useState } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function Accordion({ data, title, onSelect }) {

    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState('Seleccione')

    return (

        <View style={{ width: 150 }}>
            <ListItem.Accordion
                content={
                    <>
                        <ListItem.Content>
                            <ListItem.Title>{selected}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                {data.map((l, i) => (
                    <ListItem
                        key={i}
                        onPress={() => {
                            setExpanded(false)
                            onSelect(l)
                            setSelected(l[title])
                        }}
                        >
                        <ListItem.Content>
                            <ListItem.Title>{l[title]}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ListItem.Accordion>
        </View>
    )
}