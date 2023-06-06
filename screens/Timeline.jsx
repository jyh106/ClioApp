import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, TextInput, View, TouchableOpacity, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native';
import TimelineFlatlist from 'react-native-timeline-flatlist';

export default function Timeline({ messages }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const onRefresh = () => {
    //set initial data
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('refreshed-------------');
    }, 100);
  }
  
  const onEndReached = () => {
    // if (!isWaiting) {
    //   setIsWaiting(true);
    //   setTimeout(() => {
    //     setIsWaiting(false);
    //     console.log('END REACHED');
    //   }, 1000);
    // }
  }
  const renderFooter = () => {
    if (isWaiting) {
      return <ActivityIndicator />;
    } else {
      return <Text>------- END --------------</Text>;
    }
  }

  const timelineData = messages.map(({message, timestamp}) => {
    const localDate = new Date(timestamp).toLocaleDateString();
    const localTimestamp = new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return {
      time: localTimestamp,
      description: message
    }
  });



  return (
    <TimelineFlatlist
      style={styles.timelineContainer}
      data={timelineData}
      circleSize={12}
      circleColor='#a4c3a7'
      lineColor='#a4c3a7'
      timeContainerStyle={{minWidth:20, marginTop: -5}}
      timeStyle={{textAlign: 'center', backgroundColor:'#91afd6', color:'white', padding:5, borderRadius:13, }}
      descriptionStyle={{color:'#100c08'}}
      options={{
        style:{paddingTop:5},
        refreshControl: (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        ),
        ListFooterComponent: renderFooter,
        onEndReached: onEndReached,
        onEndReachedThreshold: 0.5,
      }}
      isUsingFlatlist={true}
      innerCircle={'dot'}
    />
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    margin: 10,
  }
});