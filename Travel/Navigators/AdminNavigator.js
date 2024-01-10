import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Products from '../screen/admin/Products';
import Categories from '../screen/admin/Categories';
import Orders from '../screen/admin/Orders';
import ProductForm from '../screen/admin/ProductForm';
import Event from '../screen/admin/Event';
import AntDesign from 'react-native-vector-icons/AntDesign'


const Stack = createStackNavigator();

function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#FFFFFF'},
          }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={() => ({
            // cardStyle: {backgroundColor: '#f5f5f5'},
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackImage: () => (
              <AntDesign name="arrowleft" size={24} color="#ff886a" />
            ),
            headerBackTitleVisible: false,
            // เพิ่มสไตล์เพิ่มเติมตามที่ต้องการ
          })}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#FFFFFF'},
          }}
        />
        <Stack.Screen
          name="ProductForm"
          component={ProductForm}
          options={() => ({
            // cardStyle: {backgroundColor: '#f5f5f5'},
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackImage: () => (
              <AntDesign name="arrowleft" size={24} color="#ff886a" />
            ),
            headerBackTitleVisible: false,
            // เพิ่มสไตล์เพิ่มเติมตามที่ต้องการ
          })}
        />
        <Stack.Screen
          name="Event"
          component={Event}
          options={() => ({
            // cardStyle: {backgroundColor: '#f5f5f5'},
            headerShown: true,
            headerTitleAlign: 'center',
            headerBackImage: () => (
              <AntDesign name="arrowleft" size={24} color="#ff886a" />
            ),
            headerBackTitleVisible: false,
            // เพิ่มสไตล์เพิ่มเติมตามที่ต้องการ
          })}
        />
      </Stack.Navigator>
    );
}

export default function AdminNavigator() {
    return <MyStack />
}