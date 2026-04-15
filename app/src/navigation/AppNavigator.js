import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// Telas novas (Pratica 02)
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FormScreen from '../screens/FormScreen';
import ListScreen from '../screens/ListScreen';

// Telas existentes (Pratica 01)
import { HomeScreen } from '../screens/HomeScreen';
import { ModalTabsNavigator } from './ModalTabsNavigator';
import { ScrollTabsNavigator } from './ScrollTabsNavigator';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function handleLogout(navigation) {
  Alert.alert('Sair', 'Deseja realmente sair?', [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Sair',
      style: 'destructive',
      onPress: async () => {
        try {
          await signOut(auth);
          navigation.replace('Login');
        } catch (error) {
          Alert.alert('Erro', 'Nao foi possivel sair.');
        }
      },
    },
  ]);
}

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      id="MainDrawer"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1565C0',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        drawerActiveTintColor: '#1565C0',
        drawerInactiveTintColor: '#757575',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => handleLogout(navigation)}
            style={{ marginRight: 16 }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }}>
              Sair
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          drawerLabel: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="Formulario"
        component={FormScreen}
        options={{
          title: 'Novo Aluguel',
          drawerLabel: 'Novo Aluguel',
        }}
      />
      <Drawer.Screen
        name="Listagem"
        component={ListScreen}
        options={{
          title: 'Alugueis',
          drawerLabel: 'Alugueis',
        }}
      />
      <Drawer.Screen
        name="Modais"
        component={ModalTabsNavigator}
        options={{
          title: 'Modais',
          drawerLabel: 'Modais',
        }}
      />
      <Drawer.Screen
        name="Scrolls"
        component={ScrollTabsNavigator}
        options={{
          title: 'Listas com Rolagem',
          drawerLabel: 'Listas com Rolagem',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}
