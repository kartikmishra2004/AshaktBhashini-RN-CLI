import { FlatList, PermissionsAndroid, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Contacts from 'react-native-contacts';
import pfp from '../../assets/images/pfp.png'

const Call = () => {
    const [contacts, setContacts] = useState([]); // Initialize with empty array
    const [search, setSearch] = useState("");

    const readContacts = async () => {
        try {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts',
                    message: 'This app would like to view your contacts.',
                    buttonPositive: 'Please accept bare mortal',
                }
            );

            if (permission === 'granted') {
                const contactList = await Contacts.getAll();
                setContacts(contactList);
            } else {
                console.log('Contacts permission denied');
            }
        } catch (error) {
            console.error('Error reading contacts:', error);
        }
    };

    useEffect(() => {
        readContacts();
    }, []);

    // Only filter contacts if they exist
    const filteredContacts = contacts?.filter((contact) =>
        contact.givenName?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.recordID || String(Math.random())}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => console.log(`Calling to ${item.phoneNumbers?.[0]?.number}`)}>
                        <View style={styles.contactItem}>
                            <Image
                                source={pfp}
                                style={styles.avatar}
                            />
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>
                                    {item.givenName} {item.familyName}
                                </Text>
                                <Text style={styles.contactPhone}>
                                    {item.phoneNumbers?.[0]?.number || 'No number'}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Call;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    searchBar: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: "#f7f7f7",
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: "500",
    },
    contactPhone: {
        fontSize: 14,
        color: "#888",
    },
});