import { StatusBar, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../App';
import { useContext } from 'react';

const Settings = () => {

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: 'black' }}>
        <CustomButton title={'Logout'} handlePress={() => signOut()} />
      </Text>
      <StatusBar backgroundColor='#6479e3' barStyle="light-content" />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffffff'
  }
})