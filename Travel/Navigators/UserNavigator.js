import React, { useContext } from "react";

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


const Stack = createStackNavigator()



function MyStack() {
    const context = useContext(AuthGlobal)
    console.log(context.stateUser.isAuthenticated)
    return (

        <>
            {context.stateUser.isAuthenticated == true ? (
                <Stack.Navigator>

                    <Stack.Screen
                        name='User Profile'
                        component={UserProfile}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' },
                        }}
                    />
                    <Stack.Screen
                        name='UserEditPassowrd'
                        component={UserEditPassowrd}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' },
                        }}
                    />
                </Stack.Navigator>
            ) :
                <Stack.Navigator>
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' },
                        }}
                    />

                    <Stack.Screen
                        name='UserForgetPassword'
                        component={UserForgetPassword}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' },
                        }}
                    />

                    <Stack.Screen
                        name='Register'
                        component={Register}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' },
                        }}
                    />
                    <Stack.Screen
                        name='RegisterDetail'
                        component={RegisterDetail}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' },
                        }}
                    />
                </Stack.Navigator>
            }

        </>

    )
}

export default function UserNavigator() {
    return <MyStack />;
}