import { Button, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import logo from "../assets/images/img.jpeg";
import CustomButton from '../components/CustomButton';
import sign1 from "../assets/images/sign1.jpeg";

GetStarted = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: '100%', backgroundColor: '#ffffff' }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            gap: 60,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{
              flexDirection: 'row',
              marginLeft: 50,
            }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  marginBottom: 20,
                }}
                source={logo}
              />
              <Text
                style={{
                  marginLeft: 10,
                  width: 300,
                  fontSize: 30,
                  fontFamily: 'Inder',
                  color: 'black',
                  fontWeight: '900'
                }}
              >Continue to <Text style={{ color: '#6479e3' }}>Ashakt bhashini</Text>
              </Text>
            </View>
            <Text style={{
              fontSize: 16,
              letterSpacing: 1,
              fontWeight: '300',
              color: 'black',
              marginTop: 10
            }}>Empower Communication, One Tap Away.</Text>
            <Image
              style={{
                width: 250,
                height: 200,
                marginTop: 50,
                objectFit: 'contain'
              }}
              source={sign1}
            />
          </View>
          <CustomButton title='Get started' handlePress={() => { navigation.navigate('SignUp') }} />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
    </SafeAreaView>
  )
}

export default GetStarted

const styles = StyleSheet.create({})