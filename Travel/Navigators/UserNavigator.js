import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductContainer from '../screen/products/ProductContainer';
import SingleProduct from '../screen/products/SingleProduct';

//screen 
import Login from '../screen/user/Login';
import Register from '../screen/user/Register';
import UserProfile from '../screen/user/UserProfile';


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='User Profile'
                component={UserProfile}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />;
}