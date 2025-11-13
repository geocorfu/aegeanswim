/**
 * AegeanSwim Mobile App
 * Find perfect swimming beaches in the Aegean Sea
 *
 * @format
 */

import React from 'react';
import { StatusBar, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

function App() {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#0891b2"
      />
      <AppNavigator />
    </>
  );
}

export default App;
