import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";

// import CartIcon from "../Shared/CartIcon";

const Tab = createBottomTabNavigator();

const Main = () => {


  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: "#f47a7e",
        inactiveTintColor: "black",
        labelStyle: {
          fontSize: 15, // Set the font size to 20
        },
      }}
    >
    {/* home */}
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assests/icon/homeIcon.png')}
            />
          ),
          headerShown: false,
        }}
      />
      {/* search */}
      <Tab.Screen
        name="Search"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assests/icon/searchIcon.png')}
            />
          ),
          headerShown: false,
        }}
      />
      {/* maps */}
      <Tab.Screen
        name="Maps"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assests/icon/mapsIcon.png')}
            />
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

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Main;