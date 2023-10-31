import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Stacks
import HomeNavigator from "./SearchNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import CommunityNavigator from "./CommunityNavigator";
import AdminNavigator from "./AdminNavigator";


//icon 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AuthGlobal from "../context/store/AuthGlobal";
import SearchNavigator from "./SearchNavigator";


const Tab = createBottomTabNavigator();

const Main = () => {

  const context = useContext(AuthGlobal)


  return (
    
    <Tab.Navigator
      initialRouteName="Search"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#f47a7e",
      }}
    >
    
      {/* Home */}
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={37} style={{ alignItems: 'center', justifyContent: 'center' }} />
          ),
          headerShown: false,
        }}
      />

      {/* search */}
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-circle-sharp" color={color} size={40} style={{ alignItems: 'center', justifyContent: 'center' }} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Feed"
        component={CommunityNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="earth-asia" color={color} size={30} style={{ alignItems: 'center', justifyContent: 'center' }} />
          ),
          headerShown: false,
        }}
      /> 

      {/* auth */}
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="setting" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      ) : null}
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={30} style={{ alignItems: 'center', justifyContent: 'center' }} />
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

      
          */}

          {/* commu */}
      

      
    </Tab.Navigator>
  );
};

export default Main;