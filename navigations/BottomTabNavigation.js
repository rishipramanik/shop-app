import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import Favorites from '../screens/Favorites';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: true,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
    background: colors.backgroundDark,
  },
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name='home'
                size={focused ? 34 : 24}
                color={focused ? colors.warning : colors.buttonDisabled}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Categories'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name='category'
                size={focused ? 34 : 24}
                color={focused ? colors.warning : colors.buttonDisabled}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Favorite'
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name='favorite'
                size={focused ? 34 : 24}
                color={focused ? colors.warning : colors.buttonDisabled}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='More'
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name='more-vert'
                size={focused ? 34 : 24}
                color={focused ? colors.warning : colors.buttonDisabled}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
