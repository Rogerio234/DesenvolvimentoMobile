import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen';
import { ModalTabsNavigator } from './ModalTabsNavigator';
import { ScrollTabsNavigator } from './ScrollTabsNavigator';
import theme from '../styles/theme';

const Drawer = createDrawerNavigator();

export function AppNavigator() {
  return (
    <Drawer.Navigator
      id="MainDrawer"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: theme.fontSize.subtitle,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textSecondary,
        drawerLabelStyle: {
          fontSize: theme.fontSize.body,
          fontWeight: '600',
        },
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: 280,
        },
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
