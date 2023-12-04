import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// import CheckoutNavigator from './CheckoutNavigator';
import Cart from '../screen/cart/Cart';
import Home from '../screen/home/Home';
import SingleProduct from '../screen/products/SingleProduct';
import ProductReview from '../screen/products/ProductReview';
import AllProduct from '../screen/home/AllProduct';

import AntDesign from 'react-native-vector-icons/AntDesign'

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
        <Stack.Screen
          name="All Product"
          component={AllProduct}
          options={() => ({
            cardStyle: {backgroundColor: '#FFFFFF'},
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackImage: () => (
              <AntDesign name="arrowleft" size={24} color="#ff886a" />
            ),
            headerBackTitleVisible: false,
            // เพิ่มสไตล์เพิ่มเติมตามที่ต้องการ
          })}
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