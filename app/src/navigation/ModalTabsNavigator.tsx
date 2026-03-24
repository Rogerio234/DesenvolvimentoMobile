import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ModalSlideScreen } from '../screens/modals/ModalSlideScreen';
import { ModalFadeScreen } from '../screens/modals/ModalFadeScreen';
import { ModalNoneScreen } from '../screens/modals/ModalNoneScreen';
import theme from '../styles/theme';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export function ModalTabsNavigator() {
  return (
    <Tab.Navigator
      id="ModalTabs"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSize.small,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="ModalSlide"
        component={ModalSlideScreen}
        options={{
          tabBarLabel: 'Slide',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>↕</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ModalFade"
        component={ModalFadeScreen}
        options={{
          tabBarLabel: 'Fade',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>◐</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ModalNone"
        component={ModalNoneScreen}
        options={{
          tabBarLabel: 'None',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>⚡</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
