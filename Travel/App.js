import { StyleSheet, Text, View, LogBox } from 'react-native'
import React , {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';

// permission
import { Platform } from 'react-native';
import { request,PERMISSIONS } from 'react-native-permissions';

//noti
import Toast from 'react-native-toast-message'

// redux
import { Provider } from 'react-redux';
import store from './Redux/Store';

// Context API
import Auth from './context/store/Auth';

// Navigator
import Main from './Navigators/Main';

//screen
import { StatusBar } from '@gluestack-ui/themed'
import TestApi from './TestApi';

// ไม่สนการแจ้งเตือน
LogBox.ignoreAllLogs(true)

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.CAMERA);
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    } else if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA);
      request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
  }, []);
  return (
    // <Auth>
    //   <Provider store={store}>

    //     <NavigationContainer>
    //       <StatusBar
    //         hidden
    //       />
    //       {/* <Header /> */}
    //       <Main />
    //       <Toast ref={(ref) => Toast.setRef(ref)} />

    //     </NavigationContainer>
    //   </Provider>
    // </Auth>

    <TestApi/>
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
