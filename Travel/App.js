import { StyleSheet, Text, View, LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

// redux
import { Provider } from 'react-redux';
import store from './Redux/Store';
// Navigator
import Main from './Navigators/Main';
//screen
import Header from './Shared/Header'
import { StatusBar } from '@gluestack-ui/themed'

// ไม่สนการแจ้งเตือน
LogBox.ignoreAllLogs(true)

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        hidden
      />
      <Header />
      <Main />
    </NavigationContainer>


  )
}

export default App

const styles = StyleSheet.create({
  center: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
