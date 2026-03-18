import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MyDrawer } from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenContainer } from './src/components/ScreenContainer';

export default function App() {
  return (
    <ScreenContainer>
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
    </ScreenContainer>
  );
}


