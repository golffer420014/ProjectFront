import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import CheckoutNavigator from './CheckoutNavigator';
import Cart from '../screen/cart/Cart';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />
            {/* <Stack.Screen
                name="Checkout"
                component={CheckoutNavigator}
                options={{
                    title: 'Checkout'
                }}
            /> */}
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}