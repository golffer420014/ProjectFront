import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


//screen 
import Login from '../screen/user/Login';
import Feed from '../screen/community/Feed';
import PostFeed from '../screen/community/PostFeed';


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name='Feed'
                component={Feed}
                options={{
                    headerShown: false,
                }}
            />
            
            <Stack.Screen
                name='Post Feed'
                component={PostFeed}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            

        </Stack.Navigator>
    )
}

export default function CommunityNavigator() {
    return <MyStack />;
}