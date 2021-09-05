import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// context
import { AuthProvider } from './src/context/AuthContext';

// screens
import Home from './src/screens/Home';
import Premios from './src/screens/Premios';
import Seleccion_de_rol from './src/screens/Seleccion_de_rol'
import Confirma_registro from './src/screens/Confirma_registro'

const Stack = createStackNavigator();

const AppState = ({ children }) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Stack.Navigator initialRouteName="Home" screenOptions={{cardStyle: {backgroundColor: 'white'}}}>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Premios" component={Premios} />
          <Stack.Screen name="Seleccion_de_rol" component={Seleccion_de_rol} />
          <Stack.Screen name="Confirma_registro" component={Confirma_registro} />
        </Stack.Navigator>
      </AppState>
    </NavigationContainer>
  );
}