import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native';
import logo from "../../assets/images/img.jpeg";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  // Function to fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );

        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Permission to access contacts was denied');
          return;
        }
      }

      fetchContacts();
      Contacts.getAll()
        .then((contactsList) => {
          setContacts(
            contactsList.map((contact) => ({
              id: contact.recordID,
              name: contact.displayName || 'Unknown',
              phone: contact.phoneNumbers[0].number || 'No Number',
              avatar: contact.thumbnailPath || 'https://via.placeholder.com/50',
            }))
          );
        })
        .catch((error) => console.error('Error fetching contacts:', error));
    };

    const getUserList = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('https://bhashasaar-sih-2024.vercel.app/api/v1/chatlist', {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        const parsed_data = await response.json();
        console.log(parsed_data[0].phone, 'Number from server');
        console.log(contacts)
      } catch (error) {
        console.log("Error fetching users")
      }
    }
    getUserList();

  }, []);

  // Filter contacts based on search text
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchText.toLowerCase())
  );

  // Render each contact item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', { contactId: item.id, phone: item.phone, name: item.name })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10 }}>
        <Image
          style={{
            width: 40,
            height: 40,
            marginTop: 9,
          }}
          source={logo}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  searchBar: {
    height: 40,
    width: 320,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#888',
  },
});

export default HomePage;