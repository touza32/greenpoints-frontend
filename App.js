import React from 'react';
import 'react-native-gesture-handler';

// navigator
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';

// context
import { AuthProvider } from './src/context/AuthContext';


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
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}