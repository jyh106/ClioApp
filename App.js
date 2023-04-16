import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [messages, setMessages] = useState(["hello", "world"]);
  const [text, setText] = useState('');

  const onChangeText = (value) => {
    setText(value);
  };

  const onSend = () => {
    const updatedMessages = [...messages, text];
    setMessages(updatedMessages);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View style={styles.textContainer}>
            <Text key={index} style={styles.text}>
              {message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.sendContainer}>
        <TextInput 
          placeholder='record your day'
          style={styles.inputBox}
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100vw",
  },
  messagesContainer: {
    height: "80%",
    width: "96%",
    marginTop: 40,
    marginBottom: 1,
    marginHorizontal: 40,
  },
  textContainer: {
    backgroundColor: '#0490e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    maxWidth: '80%',
  },
  text: {
    fontSize: 16,
    color: '#ffffff'
  },
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'baseline',
    marginBottom: 30,
  },
  inputBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontSize: 16,
    flexGrow: 15,
  },
  sendButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 30,
    height: 40,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    marginRight: 18,
  },
});
