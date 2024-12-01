import { Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'
import logo from '../../assets/images/img.png';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../App';

const SignIn = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const submitData = async () => {
    setisLoading(true);
    try {
      const data = await fetch('https://bhashasaar-sih-2024.vercel.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });
      const res_data = await data.json();
      
      if (!data.ok) {
        Alert.alert("Invalid details!!", res_data.extraDetails ? res_data.extraDetails : res_data.message);
      } else {
        await signIn(res_data.token);
        setForm({
          username: '',
          password: '',
        });
        Alert.alert("Success!!", res_data.message);
      }
    } catch (error) {
      console.log("Failed to login!!");
      Alert.alert("Error", "Failed to login. Please try again.");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: '100%', paddingVertical: 50, backgroundColor: '#161622' }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#161622",
            gap: 60
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                marginBottom: 20,
              }}
              source={logo}
            />
            <Text
              style={{
                textAlign: "center",
                width: 300,
                fontSize: 30,
                fontFamily: 'Inder',
                color: 'white',
                fontWeight: '900'
              }}
            >Sign In to <Text style={{ color: '#ffa001' }}>Ashakt bhashini</Text>
            </Text>
            <Text style={{
              fontSize: 16,
              letterSpacing: 1,
              fontWeight: '100',
              color: 'white',
              marginTop: 10
            }}>Join Us and Redefine Connection.</Text>
          </View>
          <View>
            <FormField
              fieldType='text'
              title='Username'
              value={form.username}
              handleChangeText={(value) => setForm({ ...form, username: value })}
            />
            <FormField
              fieldType='text'
              title='Password'
              value={form.password}
              handleChangeText={(value) => setForm({ ...form, password: value })}
              secureTextEntry={true}
            />
          </View>
          {isLoading ? (
            <CustomButton isDisabled={true} title='Please wait...' />
          ) : (
            <CustomButton 
              isDisabled={!form.username || !form.password ? true : false} 
              title='Sign in' 
              handlePress={() => submitData()} 
            />
          )}
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={{
              fontSize: 16,
              letterSpacing: 1,
              fontWeight: '100',
              color: 'white',
              marginTop: 10
            }}
          >
            Don't have an account?
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' barStyle="light-content" />
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})