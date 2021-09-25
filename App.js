import React from 'react';
import 'react-native-gesture-handler';

// navigator
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';

// context
import { AuthProvider } from './src/context/AuthContext';
import { PermissionProvider } from './src/context/PermissionContext';


const AppState = ({ children }) => {
  return (
    <PermissionProvider>
      <AuthProvider>
        { children }
      </AuthProvider>
    </PermissionProvider>

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