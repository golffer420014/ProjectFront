import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Products from '../screen/admin/Products';
import Categories from '../screen/admin/Categories';
import Orders from '../screen/admin/Orders';
import ProductForm from '../screen/admin/ProductForm';
import Event from '../screen/admin/Event';


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Products"
                component={Products}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#FFFFFF' },
                }}
            />
            <Stack.Screen
                name="Categories"
                component={Categories}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#FFFFFF' },
                }}
            />
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#FFFFFF' },
                }}
            />
            <Stack.Screen
                name="ProductForm"
                component={ProductForm}
                options={{
                    title: 'Product Form',
                    headerShown: false,
                    cardStyle: { backgroundColor: '#FFFFFF' },
                }}
            />
            <Stack.Screen
                name="Event"
                component={Event}
                options={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#FFFFFF' },
                }}

            />
        </Stack.Navigator>
    )
}

export default function AdminNavigator() {
    return <MyStack />
}