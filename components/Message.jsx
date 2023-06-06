import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

// interface MessageProps {
//   text: string,
//   id: string,
//   timestamp: string,
//   messagesInTransit: string[],
//   messagesFailed: string[],
//   resend?: (text:String) => void
// }

function Message({text, id, timestamp, resend,  messagesFailed, messagesInTransit}) {
  const isInlineStatus = text.split(' ').length <= 4;

  const localDate = new Date(timestamp).toLocaleDateString();
  const localTimestamp = new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const isSendSuccessful = !messagesFailed.includes(id) && !messagesInTransit.includes(id);
  const isSendError = messagesFailed.includes(id);
  const isSending = messagesInTransit.includes(id);

  return (
    <View style={isInlineStatus ? [styles.textContainer, styles.inlineStyle] : [styles.textContainer]} key={id}>
      <Text style={styles.text}>
        {text}
      </Text>
      <View style={isInlineStatus ? [styles.inlineStatus, styles.textStatus] : [styles.textStatus]}>
        <Text style={styles.timestamp}>{localTimestamp}</Text>
        {isSendSuccessful && <AntDesign name="checkcircleo" size={10} color="white" />}
        {isSending && 
          <View style={styles.loadingWrapper}>
            <ActivityIndicator color="white" style={styles.loadingIcon}/>
          </View>
        }
        {isSendError && 
          <>
            <View style={styles.errorWrapper}>
              <MaterialIcons name="error-outline" size={12} color="red" style={styles.error} />
            </View>
            <Text style={styles.errorcta} onPress={() => resend(text)}>Tap to try again</Text>
          </>
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#5ba4c4',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    marginVertical: 5,
    maxWidth: '80%',
  },
  inlineStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timestamp: {
    color: '#ffffff',
    fontSize: 9,
    marginRight: 4,
  },
  text: {
    fontSize: 16,
    color: '#ffffff'
  },
  textStatus: {
    paddingTop: 1,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inlineStatus: {
    paddingLeft: 5,
  },
  loadingWrapper: {
    height: 5,
    width: 5,
    paddingLeft: 8,
    paddingRight: 4,
    position: 'relative',
  },
  loadingIcon: {
    position: 'absolute',
    top: -10,
    transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],
  },
  errorWrapper: {
    position: 'relative',
    width: 11,
    height: 10,
  },
  error: {
    position: 'absolute',
  },
  errorcta: {
    color: 'red',
    textAlign: 'left',
    fontSize: 11,
  }
});

export default Message;