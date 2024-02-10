import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductContainer from '../screen/products/ProductContainer';
import SingleProduct from '../screen/products/SingleProduct';
import ProductReview from '../screen/products/ProductReview';

import {useNavigation} from '@react-navigation/native';
import CheckIn from '../screen/products/CheckIn';

// icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import TestMap from '../screen/map/TestMap';
import CalendarNote from '../screen/map/calendar/CalendarNote';
import NewNote from '../screen/map/calendar/NewNote';

const Stack = createStackNavigator();

function MyStack() {
//   const navigation = useNavigation();
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('tabPress', e => {
//       // Prevent default behavior
//       e.preventDefault();

//       // Navigate to the top of the stack
//       navigation.navigate('HomeSearch');
//     });

//     return unsubscribe;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={TestMap}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen
        name="Calendar note"
        component={CalendarNote}
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
      <Stack.Screen
        name="Note"
        component={NewNote}
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

export default function MapNavigator() {
  return <MyStack />;
}
