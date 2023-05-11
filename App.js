import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import Chat from './screens/Chat';
import Timeline from './screens/Timeline';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RSAKey from 'react-native-rsa';
import { RSA_BITS, RSA_EXPONENT } from './constants';

var rsa = new RSAKey();
rsa.generate(RSA_BITS, RSA_EXPONENT);

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator style={styles.tabNavigator}>
        <Tab.Screen name="Tiny Moments" component={Chat} />
        <Tab.Screen name="Timeine" component={Timeline} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


