import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const Chat = ({ route }) => {

  const { name } = route.params;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/50', // Placeholder for profile image
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{name}</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callIcon}>📞</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Section */}
      <View style={styles.chatContainer}>
        <Text style={styles.dateText}>Today</Text>
        <View style={[styles.message, styles.sentMessage]}>
          <Text style={styles.messageText}>Hello!!</Text>
          <Text style={styles.timeText}>23:20</Text>
        </View>
        <View style={[styles.message, styles.receivedMessage]}>
          <Text style={[styles.messageText, { color: '#000000' }]}>Hey!!</Text>
          <Text style={[styles.timeText, { color: '#000000' }]}>23:20</Text>
        </View>
        <View style={[styles.message, styles.sentMessage]}>
          <Text style={styles.messageText}>All the best!</Text>
          <Text style={styles.timeText}>23:20</Text>
        </View>
        <View style={[styles.message, styles.receivedMessage]}>
          <Text style={[styles.messageText, { color: '#000000' }]}>Thanks.


            <Text style={[styles.timeText, { color: '#000000' }]}>23:20</Text>
          </Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message here.."
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Text style={styles.icon}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>🎙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e0e7ff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  callButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#6479e3',
  },
  callIcon: {
    color: '#fff',
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  dateText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6479e3',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ebebeb',
    color: '#000000'
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
  timeText: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 10,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e7ff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    color: '#333',
  },
  icon: {
    fontSize: 20,
    color: '#4c6ef5',
    marginHorizontal: 5,
  },
});

export default Chat;