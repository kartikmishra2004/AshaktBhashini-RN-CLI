import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Signup = ({ navigation }) => {

    const [isLoading, setisLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: '',
        username: '',
        phone: '',
        password: '',
        isDeaf: 'No',
        langPref: 'Hindi',
    });

    const submitData = async () => {
        setisLoading(true);
        try {
            const data = await fetch('https://bhashasaar-sih-2024.vercel.app/api/v1/auth/signup', {
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
                try {
                    await AsyncStorage.setItem('token', res_data.token);
                    setForm({
                        fullName: '',
                        username: '',
                        phone: '',
                        password: '',
                        isDeaf: 'No',
                        langPref: 'Hindi',
                    });
                    Alert.alert("Success!!", res_data.message);
                    navigation.navigate('SignIn');
                } catch (storageError) {
                    console.error("Failed to save token:", storageError);
                    Alert.alert("Warning", "Failed to save login credentials. You may need to login again.");
                }
            }
        } catch (error) {
            console.error("Failed to signup:", error);
            Alert.alert("Error", "Failed to sign up. Please try again.");
        } finally {
            setisLoading(false);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ height: '100vh', paddingVertical: 50, backgroundColor: '#ffffff' }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        gap: 20
                    }}
                >
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View style={{}}>

                        </View>
                        <Text
                            style={{
                                textAlign: "center",
                                width: 300,
                                fontSize: 30,
                                fontFamily: 'Inder',
                                color: 'black',
                                fontWeight: '900'
                            }}
                        >Sign Up to <Text style={{ color: '#6479e3' }}>Ashakt bhashini</Text>
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            fontWeight: '300',
                            color: 'black',
                            marginTop: 10
                        }}>Join Us and Redefine Connection.</Text>
                    </View>
                    <View>
                        <FormField
                            fieldType='text'
                            title='Full Name'
                            value={form.fullName}
                            handleChangeText={(value) => setForm({ ...form, fullName: value })}
                        />
                        <FormField
                            fieldType='text'
                            title='Username'
                            value={form.username}
                            handleChangeText={(value) => setForm({ ...form, username: value })}
                        />
                        <FormField
                            fieldType='number'
                            title='Phone'
                            value={form.phone}
                            handleChangeText={(value) => setForm({ ...form, phone: value })}
                        />
                        <FormField
                            fieldType='text'
                            title='Password'
                            value={form.password}
                            handleChangeText={(value) => setForm({ ...form, password: value })}
                        />
                        <FormField
                            fieldType='deaf'
                            title='Got a speech or hearing impairment?'
                            value={form.isDeaf}
                            handleChangeText={(value) => setForm({ ...form, isDeaf: value })}
                        />
                        <FormField
                            fieldType='langpref'
                            title='Language Preference'
                            value={form.langPref}
                            handleChangeText={(value) => setForm({ ...form, langPref: value })}
                        />
                    </View>
                    {isLoading ?
                        (<CustomButton isDisabled={true} title='Please wait...' />) :
                        (<CustomButton isDisabled={!form.fullName || !form.username || !form.phone || !form.password ? true : false} title='Sign Up' handlePress={() => submitData()} />)}

                    <Text
                        onPress={() => navigation.navigate('SignIn')}
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            fontWeight: '300',
                            color: 'black',
                            marginTop: 10
                        }}
                    >
                        Already have an account?
                    </Text>
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({})