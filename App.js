import * as React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styleContainer from './src/styles/Container'
import styleTextInput from './src/styles/TextInput';
import styleText from './src/styles/Text';
import styleButton from './src/styles/Button';

function HomeScreen({ navigation }) {
  return (
    <View style={[
      styleContainer.main, {
        backgroundColor: 'white'
      }]}>
      <View style={[
      styleContainer.main, {
        marginTop: 100
      }]}>
        <Image
          source={require('./src/assets/icon.png')}
          style={{
            width: 170,
            height: 170
            }}>
        </Image>
        <Text style={styleText.title}>Green Points</Text>
      </View>
      <View style={[
      styleContainer.main, {
        backgroundColor: 'white',
        margin: 100,
        justifyContent: 'space-between'
      }]}>
        <TextInput
          style={styleTextInput.large}
          placeholder='Usuario'
        />
        <TextInput
          style={styleTextInput.large}
          placeholder='Contraseña'
        />
        <TouchableOpacity
          style={styleButton.base}
          onPress={() => navigation.navigate('Premios')}
        >
          <Text style={styleText.button}>INGRESAR</Text>
        </TouchableOpacity>
        <Button 
          title='premios'
          onPress={() => navigation.navigate('Premios')}
        />
      </View>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Premios" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;