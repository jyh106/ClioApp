import React, { useState } from 'react';
import { ScrollView, TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Message from '../components/Message';

export default function Chat({ messages, onSend, messagesInTransit, messagesFailed, textInputRef}) {
	const [text, setText] = useState('');

  const onChangeText = (value) => {
    setText(value);
  };

	return (
		<View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map(({message, id, timestamp}) => 
          <Message 
            text={message} 
            key={id} 
            id={id}
            timestamp={timestamp}
            messagesInTransit={messagesInTransit}
            messagesFailed={messagesFailed}
            resend={(text) => console.log(`trying to resend message - ${text} `)} // TODO 
          />
        )}
      </ScrollView>
      <View style={styles.sendContainer}>
        <TextInput 
          placeholder='tiny moment of the day'
          style={styles.inputBox}
          onChangeText={onChangeText}
          ref={textInputRef}
        />
        {/* “what is my story from today? What is the thing about today that has made it different from any previous day?” */}
        <TouchableOpacity style={styles.sendButton} onPress={() => onSend(text)}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: "100%",
	},
	messagesContainer: {
		height: "80%",
		width: "96%",
		marginTop: 40,
		marginBottom: 1,
		marginHorizontal: 40,
	},
	sendContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
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
		backgroundColor: '#90c1d7',
		borderRadius: 30,
		height: 40,
		width: 24,
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
		marginRight: 10,
	},
});