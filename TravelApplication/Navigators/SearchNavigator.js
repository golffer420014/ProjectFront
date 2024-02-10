import React , {useEffect } from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import ProductContainer from '../screen/products/ProductContainer';
import SingleProduct from '../screen/products/SingleProduct';
import ProductReview from '../screen/products/ProductReview';

import { useNavigation } from '@react-navigation/native';
import CheckIn from '../screen/products/CheckIn';

// icon 
import AntDesign from 'react-native-vector-icons/AntDesign'

const Stack = createStackNavigator()

function MyStack() {
  
  const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      // Prevent default behavior
      e.preventDefault();

      // Navigate to the top of the stack
      navigation.navigate('HomeSearch');
    });

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeSearch"
        component={ProductContainer}
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
        name="Check In"
        component={CheckIn}
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
    </Stack.Navigator>
  );
}

export default function SearchNavigator() {
  return <MyStack />;
}