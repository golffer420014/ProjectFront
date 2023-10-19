import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import CommunityNavigator from "./CommunityNavigator";
import AdminNavigator from "./AdminNavigator";


//icon 
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

import AuthGlobal from "../context/store/AuthGlobal";


const Tab = createBottomTabNavigator();

const Main = () => {

  const context = useContext(AuthGlobal)


  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#f47a7e",
      }}
      
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

          {/* commu */}
      {/* <Tab.Screen
        name="Feed"
        component={CommunityNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="earth-asia" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />  */}

      
    </Tab.Navigator>
  );
};

export default Main;