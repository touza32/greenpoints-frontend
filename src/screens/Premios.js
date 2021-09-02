import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Premios() {
    return (
      <View>
        <Text>Ver lista de premios</Text>
        <Button
          title="OBTENER"
          onPress={() => {
            console.log("click")
            fetch('http://localhost:44331/premio')
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error))
          }}
        />
      </View>
    );
  }