import React, { useContext } from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// icon 
import AntDesign from 'react-native-vector-icons/AntDesign'

//screen 
import Login from '../screen/user/Login';
import Feed from '../screen/community/Feed';
import PostFeed from '../screen/community/PostFeed';

import { useNavigation } from '@react-navigation/native';
import AuthGlobal from '../context/store/AuthGlobal';
const Stack = createStackNavigator()

function MyStack() {

    const context = useContext(AuthGlobal)



    return (
        <>
            {context.stateUser.isAuthenticated == true ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name='Feed'
                        component={Feed}
                        options={{
                            headerShown: false,
                            cardStyle: { backgroundColor: '#FFFFFF' },
                        }}
                    />

                    <Stack.Screen
                        name="Post Feed"
                        component={PostFeed}
                        options={() => ({
                            cardStyle: { backgroundColor: '#FFFFFF' },
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
            ) : (
                    <Stack.Navigator>
                        <Stack.Screen
                            name='Feed'
                            component={Feed}
                            options={{
                                headerShown: false,
                                cardStyle: { backgroundColor: '#FFFFFF' },
                            }}
                        />
                    </Stack.Navigator>
            )
            }
            

        </>
    )
}

export default function CommunityNavigator() {
    return <MyStack />;
}