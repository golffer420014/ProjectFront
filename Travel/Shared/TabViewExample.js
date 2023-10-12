import * as React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();



function TabViewExample(props) {

    function Description() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffff' , padding:20 , color:'gainsboro'}}>
                <Text style={{fontSize:18}}>{props.description}</Text>
            </View>
        );
    }

    function Review() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffff', padding: 20, color: 'gainsboro' }}>
                <Text style={{ fontSize: 18 }}>{props.numReviews}</Text>
            </View>
        );
    }

    function Location() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffff', padding: 20, color: 'gainsboro' }}>
                <Text style={{ fontSize: 18 }}>{props.numReviews}</Text>
            </View>
        );
    }

  return (
    <Tab.Navigator
          tabBarOptions={{
              activeTintColor: 'black', // Set the color of the active tab here
              indicatorStyle: { backgroundColor: '#f36d72' },
          }}
    >
          <Tab.Screen name="Description" component={Description} />
          <Tab.Screen name="Review" component={Review} />
          <Tab.Screen name="Location" component={Location} />
    </Tab.Navigator>
  );
}

export default TabViewExample;
