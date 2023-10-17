import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";


//icon 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import UserNavigator from "./UserNavigator";
import CommunityNavigator from "./CommunityNavigator";


const Tab = createBottomTabNavigator();

const Main = () => {


  return (
    <Tab.Navigator
      initialRouteName="Post Feed"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#f47a7e",
      }}
      // screenOptions={{
      //   tabBarStyle: { height: 60 },
      // }}
      // tabBarOptions={{
      //   keyboardHidesTabBar: true,
      //   showLabel: true,
      //   activeTintColor: "#f47a7e",
      //   inactiveTintColor: "black",
      //   labelStyle: {
      //     fontSize: 15, // Set the font size to 20
      //   },
      // }}
    >
    {/* home */}
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      {/* search */}
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      {/* maps */}
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="login" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />

      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : null}
          */}
      <Tab.Screen
        name="Feed"
        component={CommunityNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="earth-asia" color={color} size={30} />
          ),
          headerShown: false,
        }}
      /> 

      
    </Tab.Navigator>
  );
};

export default Main;