import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#ffa001',
            tabBarInactiveTintColor: '#cdcde0',
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopColor: '#232533',
                borderTopWidth: 0,
                boxShadow: '0px 0px',
                height: 60,
                paddingTop: 10,
            }
        }}>
            <Tab.Screen options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (<FontAwesome name="home" size={size} color={color} />)
            }} name="Home" component={Home} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (<FontAwesome name="user" size={size} color={color} />)
            }} name="Profile" component={Profile} />
            <Tab.Screen options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (<FontAwesome name="gear" size={size} color={color} />)
            }} name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default Tabs

const styles = StyleSheet.create({})