import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductContainer from '../screen/products/ProductContainer';
import SingleProduct from '../screen/products/SingleProduct';
import ProductReview from '../screen/products/ProductReview';


const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={ProductContainer}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name='Product Detail'
        component={SingleProduct}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name='Product Review'
        component={ProductReview}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      
    </Stack.Navigator>
  )
}

export default function SearchNavigator() {
  return <MyStack />;
}