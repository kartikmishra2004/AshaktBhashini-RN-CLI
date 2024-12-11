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
  const [deviceContacts, setDeviceContacts] = useState([]);
  const [serverContacts, setServerContacts] = useState([]);
  const [mergedContacts, setMergedContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDeviceContacts = async () => {
      try {
        if (Platform.OS === 'android') {
          const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
          );
          if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('Permission to access contacts was denied');
            return;
          }
        }

        const contactsList = await Contacts.getAll();
        const formattedContacts = contactsList.map((contact) => ({
          id: contact.recordID || String(Math.random()),
          name: contact.givenName + ' ' + (contact.familyName || ''),
          phone: contact.phoneNumbers && contact.phoneNumbers[0]
            ? contact.phoneNumbers[0].number.replace(/\s+/g, '')
            : 'No Number',
            avatar: contact.thumbnailPath || 'https://via.placeholder.com/50',
        }));
        setDeviceContacts(formattedContacts);
      } catch (error) {
        console.error('Error fetching device contacts:', error);
      }
    };

    fetchDeviceContacts();
  }, []);

  useEffect(() => {
    const fetchServerContacts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(
          'https://bhashasaar-sih-2024.vercel.app/api/v1/chatlist',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const parsedData = await response.json();
        const formattedContacts = parsedData.map((user) => ({
          id: user.id || String(Math.random()),
          name: user.fullName || 'Unknown',
          phone: user.phone.replace(/\s+/g, ''),
        }));
        setServerContacts(formattedContacts);
      } catch (error) {
        console.error('Error fetching server contacts:', error);
      }
    };

    fetchServerContacts();
  }, []);

  useEffect(() => {
    const mergeContacts = () => {
      const serverPhones = new Set(serverContacts.map((contact) => contact.phone));
      const matchingContacts = deviceContacts.filter((contact) =>
        serverPhones.has(contact.phone)
      );
      setMergedContacts(matchingContacts);
    };

    if (serverContacts.length && deviceContacts.length) {
      mergeContacts();
    }
  }, [serverContacts, deviceContacts]);

  const filteredContacts = mergedContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', {
          contactId: item.id,
          phone: item.phone,
          name: item.name,
        })
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
        ListEmptyComponent={() => <Text style={styles.emptyText}>No contacts found</Text>}
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
  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
});

export default HomePage;
