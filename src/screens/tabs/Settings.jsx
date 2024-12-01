import { StatusBar, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../../components/CustomButton'

const Settings = () => {

  const Logout = async () => {
    await AsyncStorage.removeItem('token');
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: 'white' }}>
        <CustomButton title={'Logout'} handlePress={() => Logout()} />
      </Text>
      <StatusBar backgroundColor='#ffa001' barStyle="light-content" />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#232533'
  }
})