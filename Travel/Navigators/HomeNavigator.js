import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductContainer from '../screen/products/ProductContainer';
import SingleProduct from '../screen/products/SingleProduct';


const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Product Detail'
        component={SingleProduct}
        options={{
          headerShown: false,
        }}
      />
      
    </Stack.Navigator>
  )
}

export default function HomeNavigator() {
  return <MyStack />;
}