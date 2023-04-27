import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RSAKey from 'react-native-rsa';

const bits = 1024;
const exponent = '10001'; // must be a string. This is hex string. decimal = 65537
var rsa = new RSAKey();
rsa.generate(bits, exponent);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // var publicKey = rsa.getPublicString(); // return json encoded string
  // var privateKey = rsa.getPrivateString(); // return json encoded string
  const publicKey = JSON.stringify({"n":"8f4ecb32bfca88c7aa005f950523e7642e7385fea855e90f358803e764ee964cfa871f87c51f949c9f3965e222814d3db90ea52c90a7237bf7a227b6a244e4730c91a65a08fa7c789ccbec59b7053046e96a2c98af1f6e5db45a9d21e896708a6d2c807a2d2a538197ab6856d4f09a72fe5fad5da7b62aeccf90b05166b1fee1","e":"10001"});
  const privateKey = JSON.stringify({"n":"8f4ecb32bfca88c7aa005f950523e7642e7385fea855e90f358803e764ee964cfa871f87c51f949c9f3965e222814d3db90ea52c90a7237bf7a227b6a244e4730c91a65a08fa7c789ccbec59b7053046e96a2c98af1f6e5db45a9d21e896708a6d2c807a2d2a538197ab6856d4f09a72fe5fad5da7b62aeccf90b05166b1fee1","e":"10001","d":"87986c57967552ba6936753a1165097a1721a3b5731de6a947636d1e32b8356a9cd9e1919b88e81ad1e5836b566eb5e1230aa26aea6bdafd5f3005179fae43e0d2299c775f22c03a8bc020e1b8e5af957fec17faa365182da2a5ed0a5e721323fbc406d7c1c894bbf534ab42f7f435911d2886968bbd69999cc8d7bc61b1dc89","p":"dbcfd7ae9c2cd46887c0b25e6c2b5ec513a9bbdb7cc1ba6ab066b79dc362ad054dc8c7d91a93228918b0c5ddfe7fe4eba5d6f4cb1e37046d38003fb8ceee9af3","q":"a6e69f1939853095219b99e2598687de651d73f08c465255cdc8383f58162c5f3caaf96bb0b4a41358df23474f0a9ff4e6c41abd93fdbcb14134861335290bdb","dmp1":"04969a11f3009c8e7206fbb22cdfdae2923e80c55c1d4f1edaffc9e56926ae25e631c2ba2d6bd4d4b7c738da216dda01713cc36f59fa1c058b9db5b6cddafd31","dmq1":"0214a3ed1b93767c9573ac226f3d471a55a65d58a5570715bcbfff3b82ec9bd700199d8c63228d5d14618bbe0ad536134681315825ad271a0a970e08d543d2bb","coeff":"245f9ba5377c92c9e4bab78e327233ef90767d785d0fc6482a24ec411fd398c74b65f98b7793cea8a165fdc4dbb4a1b3214ec5c5e4b0e8bda1962c89bb58eec0"});

  useEffect(() => {
    async function fetchMessages() {
      console.log('fetching messages......');
      await getMessages();
    }
    fetchMessages();
  }, []);

  const getMessages = async() => {
    rsa.setPublicString(publicKey);
    fetch('http://127.0.0.1:3000/msg')
    .then(response => response.json())
    .then(data => {
      const messages = [];
      for (index in data) {
          rsa.setPrivateString(privateKey);
          const decryptedMessage = rsa.decrypt(data[index]);
          messages.push(decryptedMessage);
          setMessages(messages);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const onChangeText = (value) => {
    setText(value);
  };
  
  const onSend = (e) => {
    const updatedMessages = [...messages, text];
    rsa.setPublicString(publicKey);
    var encrypted = rsa.encrypt(text);
    // TODO send post request to BE
    setMessages(updatedMessages);
    setText('');
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View style={styles.textContainer} key={index}>
            <Text style={styles.text}>
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
    width: "100%",
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
