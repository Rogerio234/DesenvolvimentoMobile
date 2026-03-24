import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollViewScreen } from '../screens/scroll/ScrollViewScreen';
import { FlatListScreen } from '../screens/scroll/FlatListScreen';
import { SectionListScreen } from '../screens/scroll/SectionListScreen';
import theme from '../styles/theme';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export function ScrollTabsNavigator() {
  return (
    <Tab.Navigator
      id="ScrollTabs"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.scrollView,
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
        name="ScrollView"
        component={ScrollViewScreen}
        options={{
          tabBarLabel: 'ScrollView',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>📜</Text>
          ),
        }}
      />
      <Tab.Screen
        name="FlatList"
        component={FlatListScreen}
        options={{
          tabBarLabel: 'FlatList',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="SectionList"
        component={SectionListScreen}
        options={{
          tabBarLabel: 'SectionList',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>📂</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
