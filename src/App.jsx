import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

import Index from './screens/Index';
import GetStarted from './screens/GetStarted';
import SignUp from './screens/auth/SignUp';
import SignIn from './screens/auth/SignIn';
import Tabs from './screens/tabs/Tabs';

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = React.useMemo(() => ({
    signIn: async (token) => {
      try {
        await AsyncStorage.setItem('token', token);
        setUserToken(token);
      } catch (e) {
        console.log(e);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('token');
        setUserToken(null);
      } catch (e) {
        console.log(e);
      }
    }
  }), []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setUserToken(token);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#6479e3" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!userToken ? (
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Index" component={Index} />
            <Stack.Screen options={{ headerShown: false }} name="GetStarted" component={GetStarted} />
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;