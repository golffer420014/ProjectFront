import React, { useContext, useEffect  } from "react";

import { createStackNavigator } from "@react-navigation/stack"

import ProductContainer from '../screen/products/ProductContainer';
import SingleProduct from '../screen/products/SingleProduct';

//screen 
import Login from '../screen/user/Login';
import Register from '../screen/user/Register';
import UserProfile from '../screen/user/UserProfile';
import RegisterDetail from '../screen/user/RegisterDetail';

import AuthGlobal from "../context/store/AuthGlobal";
import UserEditPassowrd from "../screen/user/UserEditPassowrd";
import UserForgetPassword from "../screen/user/UserForgetPassword";
import Setting from "../screen/user/setting/Setting";
import {useNavigation} from '@react-navigation/native';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckIn from "../screen/user/setting/CheckIn";


const Stack = createStackNavigator()



function MyStack() {
// const navigation = useNavigation();
// useEffect(() => {
//   const unsubscribe = navigation.addListener('tabPress', e => {
//     // Prevent default behavior
//     e.preventDefault();

//     // Navigate to the top of the stack
//       navigation.navigate('User Profile');
    
//   });

//   return unsubscribe;
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

    const context = useContext(AuthGlobal)
    // console.log(context.stateUser.isAuthenticated)
    return (
      <>
        {context.stateUser.isAuthenticated == true ? (
          <Stack.Navigator>
            <Stack.Screen
              name="User Profile"
              component={UserProfile}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FFFFFF'},
              }}
            />
            <Stack.Screen
              name="UserEditPassowrd"
              component={UserEditPassowrd}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FFFFFF'},
              }}
            />
            {/* setting */}
            <Stack.Screen
              name="Setting"
              component={Setting}
              options={() => ({
                cardStyle: {backgroundColor: '#FFFFFF'},
                headerShown: true,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <AntDesign name="arrowleft" size={24} color="#ff886a" />
                ),
                headerBackTitleVisible: false,
              })}
            />
            <Stack.Screen
              name="Check in"
              component={CheckIn}
              options={() => ({
                cardStyle: {backgroundColor: '#FFFFFF'},
                headerShown: true,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <AntDesign name="arrowleft" size={24} color="#ff886a" />
                ),
                headerBackTitleVisible: false,
              })}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FFFFFF'},
              }}
            />

            <Stack.Screen
              name="UserForgetPassword"
              component={UserForgetPassword}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FFFFFF'},
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FFFFFF'},
              }}
            />
            <Stack.Screen
              name="RegisterDetail"
              component={RegisterDetail}
              options={{
                headerShown: false,
                cardStyle: {backgroundColor: '#FFFFFF'},
              }}
            />
          </Stack.Navigator>
        )}
      </>
    );
}

export default function UserNavigator() {
    return <MyStack />;
}