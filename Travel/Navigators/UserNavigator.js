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


const Stack = createStackNavigator()



function MyStack() {
    const context = useContext(AuthGlobal)
    console.log(context.stateUser.isAuthenticated)
    return (

        <>
            {context.stateUser.isAuthenticated == true ?(
                <Stack.Navigator>

                <Stack.Screen
                    name='User Profile'
                    component={UserProfile}
                    options={{
                        headerShown: false,
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
                name='RegisterDetail'
                component={RegisterDetail}
                options={{
                    headerShown: false,
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