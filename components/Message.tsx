import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

interface MessageProps {
  text: string,
  id: string
  isSending?: boolean,
  isSendSuccessful?: boolean,
  isSendError?: boolean,
  resend?: (text:String) => void
}

function Message({text, isSendError, isSendSuccessful, isSending, id, resend } : MessageProps) {
  const isInlineStatus = text.split(' ').length <= 4;
  return (
    <View style={isInlineStatus ? [styles.textContainer, styles.inlineStyle] : [styles.textContainer]} key={id}>
      <Text style={styles.text}>
        {text}
      </Text>
      <View style={isInlineStatus ? [styles.inlineStatus, styles.textStatus] : [styles.textStatus]}>
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
    backgroundColor: '#0490e0',
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
  text: {
    fontSize: 16,
    color: '#ffffff'
  },
  textStatus: {
    paddingTop: 1,
    display: 'flex',
    alignItems: 'flex-end'
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