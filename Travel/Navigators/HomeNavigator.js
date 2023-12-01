import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// import CheckoutNavigator from './CheckoutNavigator';
import Cart from '../screen/cart/Cart';
import Home from '../screen/home/Home';
import SingleProduct from '../screen/products/SingleProduct';
import ProductReview from '../screen/products/ProductReview';

const Stack = createStackNavigator();

function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Cart"
          component={Home}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#FFFFFF'},
          }}
        />

        <Stack.Screen
          name="Product Detail"
          component={SingleProduct}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#FFFFFF'},
          }}
        />
        <Stack.Screen
          name="Product Review"
          component={ProductReview}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#FFFFFF'},
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
    );
}

export default function HomeNavigator() {
    return <MyStack />
}