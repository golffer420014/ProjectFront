// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '316031732426-mf4bc2laeqc2gokvclja906huuu8ksq7.apps.googleusercontent.com',
});


// Your Firebase config object
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Check if Firebase has been initialized before initializing it
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function Auth({navigation}) {
  const [isSigninInProgress, setSigninInProgress] = React.useState(false);

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log({idToken});

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>auth Screen</Text>
      <TouchableOpacity
        onPress={() =>
          onGoogleButtonPress().then(() => {
            console.log('userLogin');
            navigation.navigate('Home');
          })
        }
        // disabled={isSigninInProgress}
      >
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          // disabled={isSigninInProgress}
        />
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({navigation}) {
  const [email, setEmail] = useState();

  // useEffect(() =>{
  //   const decode = auth().onAuthStateChanged(user =>{
  //     if(user){
  //       setEmail(user.email)
  //       console.log('user')
  //     }else{
  //       console.log('never login')
  //       navigation.navigate('Home')
  //     }
  //   })

  //   return() => decode();

  // },[])

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home dd</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function TestApi() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default TestApi;
