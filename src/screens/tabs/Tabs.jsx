import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TTStranslation from './TTStranslation';
import Profile from './Profile';
import Settings from './Settings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../App';
import Call from './Call';
import HomePage from './HomePage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6479e3',
        tabBarInactiveTintColor: '#cdcde0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#232533',
          borderTopWidth: 0,
          boxShadow: '0px 0px',
          height: 60,
          paddingTop: 10,
        }
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<FontAwesome name="home" size={size} color={color} />)
        }}
        name="HomePage"
        component={HomePage}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<FontAwesome name="file-text" size={size} color={color} />)
        }}
        name="TTStranslation"
        component={TTStranslation}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<FontAwesome name="user" size={size} color={color} />)
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<FontAwesome name="gear" size={size} color={color} />)
        }}
        name="Settings"
        component={Settings}
        signout={signOut}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Ionicons name="call" size={size} color={color} />)
        }}
        name="Call"
        component={Call}
      />
    </Tab.Navigator>
  );
};

export default Tabs;