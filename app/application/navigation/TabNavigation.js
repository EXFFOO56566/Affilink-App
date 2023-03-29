import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ColorsApp from '../config/ColorsApp';
import HomeNavigation from './HomeNavigation';
import SearchNavigation from './SearchNavigation';
import ProfileNavigation from './ProfileNavigation';
import FavoritesNavigation from './FavoritesNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Strings from "../config/Strings";
import usePreferences from '../hooks/usePreferences';

const Tab = createBottomTabNavigator();

export default function TabNavigation(){

  const {theme} = usePreferences();
	
  const iconSize = 30;

	const navigatorOptions = {
    tabBarActiveTintColor: ColorsApp.PRIMARY,
    tabBarInactiveTintColor: theme === "dark" ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: -10,
      marginBottom: 10
    },
    tabBarStyle: {
      paddingBottom: 10,
      height: 90
    },
    headerShown: false
	}

	return (
<Tab.Navigator screenOptions={navigatorOptions}>

      <Tab.Screen
        name={Strings.ST2}
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name={Strings.ST3}
        component={SearchNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={iconSize} />
          ),
          // tabBarBadge: 3,
        }}
      />

      <Tab.Screen
        name={Strings.ST4}
        component={FavoritesNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-outline" color={color} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name={Strings.ST6}
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
		)
}