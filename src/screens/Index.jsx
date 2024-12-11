import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import logo from '../assets/images/img.jpeg'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ borderStartColor: '#ffffff' }}>
      <ScrollView style={{ borderStartColor: '#ffffff' }} contentContainerStyle={{ height: '100%', backgroundColor: '#ffffff' }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
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
                width: 150,
                height: 150,
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
                color: 'black',
                fontWeight: '900'
              }}
            >Welcome to <Text style={{ color: '#6479e3' }}>Ashakt bhashini</Text>
            </Text>
            <Text style={{
              fontSize: 16,
              letterSpacing: 1,
              fontWeight: '300',
              color: 'black',
              marginTop: 10
            }}>Breaking Barriers, Bridging Voices.</Text>
          </View>
        <CustomButton title='Continue' handlePress={() => navigation.navigate('GetStarted')} />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})