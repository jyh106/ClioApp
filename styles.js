import { StyleSheet } from 'react-native';

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

export default styles;