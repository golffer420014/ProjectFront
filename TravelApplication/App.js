import {StyleSheet, Text, View, LogBox} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

//noti
import Toast from 'react-native-toast-message';

// redux
import {Provider} from 'react-redux';
import store from './Redux/Store';

// Context API
import Auth from './context/store/Auth';

// Navigator
import Main from './Navigators/Main';

//screen
import {StatusBar} from '@gluestack-ui/themed';
import UserEditPassowrd from './screen/user/UserEditPassowrd';

// ไม่สนการแจ้งเตือน
LogBox.ignoreAllLogs(true);

const toastConfig = {
  success: ({text1, text2, props, ...rest}) => (
    <View style={styles.successToas}>
      <Text style={{color: 'black'}}>{text1}</Text>
      <Text style={{color: 'gray'}}>{text2}</Text>
    </View>
  ),
  error: ({text1, text2, props, ...rest}) => (
    <View style={styles.errorToas}>
      <Text style={{color: 'black'}}>{text1}</Text>
      <Text style={{color: 'gray'}}>{text2}</Text>
    </View>
  ),
  // ... other types if needed
};

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          {/* <StatusBar
            hidden
          /> */}
          {/* <Header /> */}
          <Main />
          <Toast ref={ref => Toast.setRef(ref)} config={toastConfig} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
};

export default App;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorToas: {
    borderWidth: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 10,
    borderTopColor: '#dfdfdf',
    borderBottomColor: '#dfdfdf',
    borderLeftColor: 'red',
    borderLeftWidth: 5,
    borderRightColor: 'red',
    borderRightWidth: 5,
  },
  successToas: {
    borderWidth: 1,
    width: '80%',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    backgroundColor: 'white',
    height: 55,
    borderRadius: 10,
    borderTopColor: '#dfdfdf',
    borderBottomColor: '#dfdfdf',
    borderLeftColor: 'green',
    borderLeftWidth: 5,
    borderRightColor: 'green',
    borderRightWidth: 5,
  },
});
