import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomButton from '../../components/CustomButton';
import { ElevenLabsClient } from "elevenlabs";

const TTStranslation = () => {

  const [transForm, setTransForm] = useState({
    key: 'devnagri_2c7a182ca9ca11efb60142010aa00012',
    sentence: '',
    src_lang: 'en',
    dest_lang: 'hi'
  });

  const [isLoading, setIsLoading] = useState(false);

  const languageMapping = {
    en: "English",
    hi: "Hindi",
    bn: "Bengali",
    gu: "Gujarati",
    kn: "Kannada",
    mr: "Marathi",
  };

  const [translatedText, setTranslatedText] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('key', transForm.key);
    formData.append('sentence', transForm.sentence);
    formData.append('src_lang', transForm.src_lang);
    formData.append('dest_lang', transForm.dest_lang);
    setIsLoading(true);
    try {
      const response = await fetch('https://api.devnagri.com/machine-translation/v2/translate', {
        method: "POST",
        body: formData,
      });
      const res_data = await response.json();
      setTranslatedText(res_data.translated_text);
      if (response.ok) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Failed to translate!!");
      setIsLoading(false);
    }
  }

  const handleSpeech = async () => {
    try {
      console.log("TTS")
      const res_data = await response.json();
      console.log(res_data)
    } catch (error) {
      console.log("Error in fetching!!")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View>
          <Text
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              paddingVertical: 25,
              color: '#6479e3',
              fontWeight: '900',
            }}>
            India <Text style={{ color: 'black' }}>Speaks, You</Text> <Text style={{ color: '#6479e3' }}>Understand.</Text>
          </Text>
        </View>
        <View style={styles.translationBox}>
          <View style={styles.boxHeader}>
            <Picker
              mode='dropdown'
              onValueChange={(e) => setTransForm({ ...transForm, src_lang: e })}
              dropdownIconColor="black"
              style={{
                color: 'black',
                width: 150,
                height: 50,
                padding: 30,
                backgroundColor: '#ffffff',
              }}>
              <Picker.Item key={'en'} label='English' value='en' />
              <Picker.Item key={'hi'} label='Hindi' value='hi' />
              <Picker.Item key={'bn'} label='Bengali' value='bn' />
              <Picker.Item key={'gu'} label='Gujrati' value='gu' />
              <Picker.Item key={'kn'} label='Kannada' value='kn' />
              <Picker.Item key={'mr'} label='Marathi' value='mr' />
            </Picker>
            <TouchableOpacity onPress={handleSpeech}>
              <Ionicons name="volume-high" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholderTextColor="#a3a3a3"
            placeholder='Enter text to translate.'
            multiline={true}
            scrollEnabled={true}
            onChangeText={(e) => setTransForm({ ...transForm, sentence: e })}
            style={styles.textInput}
            value={transForm.sentence}
          />
          <View style={styles.bottomRow}>
            <Ionicons onPress={() => Clipboard.setString(transForm.sentence)} name="copy" size={24} color="#000000" />
          </View>
        </View>
        <View style={styles.translationBox}>
          <View style={styles.boxHeader}>
            <Picker
              mode='dropdown'
              onValueChange={(e) => setTransForm({ ...transForm, dest_lang: e })}
              dropdownIconColor="black"
              style={{
                color: 'black',
                width: 150,
                height: 50,
                padding: 30,
                backgroundColor: '#ffffff',
              }}>
              <Picker.Item key={'hi'} label='Hindi' value='hi' />
              <Picker.Item key={'en'} label='English' value='en' />
              <Picker.Item key={'bn'} label='Bengali' value='bn' />
              <Picker.Item key={'gu'} label='Gujrati' value='gu' />
              <Picker.Item key={'kn'} label='Kannada' value='kn' />
              <Picker.Item key={'mr'} label='Marathi' value='mr' />
            </Picker>
            <TouchableOpacity onPress={handleSpeech}>
              <Ionicons name="volume-high" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholderTextColor="#bababa"
            placeholder='Translated text will appear here.'
            multiline={true}
            scrollEnabled={true}
            style={styles.textInput}
            editable={false}
          >{translatedText}</TextInput>
          <View style={styles.bottomRow}>
            <Ionicons onPress={() => Clipboard.setString(translatedText)} name="copy" size={24} color="#000000" />
          </View>
        </View>
        <View style={{
          alignItems: 'center',
          paddingVertical: 20
        }}>
          {isLoading ? (<CustomButton isDisabled={true} title='Please wait...' />) : (<CustomButton isDisabled={!transForm.sentence ? true : false} handlePress={() => handleSubmit()} style={styles.translateButtonText} title={'Translate'}>
            <Text>Translate</Text>
          </CustomButton>)}
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#6479e3' barStyle="light-content" />
    </SafeAreaView>
  );
}

export default TTStranslation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
  languageSelector: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 2,
  },
  languageButton: {
    padding: 10,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
  },
  translationBox: {
    backgroundColor: '#ffffff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  textInput: {
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    color: 'black',
    padding: 10,
    marginBottom: 10,
    height: 120,
    textAlignVertical: 'top',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  micIcon: {
    backgroundColor: '#000000',
    borderRadius: 50,
    padding: 10,
  },
  translateButton: {
    backgroundColor: '#6479e3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  translateButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'black',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: 'black',
  },
  activeNavText: {
    color: 'blue',
  },
});