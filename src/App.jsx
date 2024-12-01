import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './screens/Index';
import GetStarted from './screens/GetStarted';
import SignUp from './screens/auth/SignUp';
import SignIn from './screens/auth/SignIn';
import Tabs from './screens/tabs/Tabs';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Index" component={Index} />
        <Stack.Screen options={{ headerShown: false }} name="GetStarted" component={GetStarted} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
        <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});