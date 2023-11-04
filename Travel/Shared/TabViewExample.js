import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import baseURL from '../assests/common/baseUrl';

//icon 
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const Tab = createMaterialTopTabNavigator();

function TabViewExample(props) {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios
            .get(`${baseURL}review`)
            .then(res => {
                setReviews(res.data)

            })
            .catch((err) => {
                console.log('review call error')
            })
        return () => {

        };
    }, []);
    
    // console.log(JSON.stringify(reviews, null, 2))
    // console.log(JSON.stringify(props.id, null, 2))

    function Description() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: '#ffff', padding: 20, color: 'gainsboro', textAlign: 'center' }}>
                    <Text style={{ fontSize: 15 }}>{props.description}</Text>
                </View>
            </ScrollView>
        );
    }

    function Review() {
        return (
            <ScrollView style={{  backgroundColor: '#ffff'}}>
                <View>
                    {reviews.map((item) => (
                        item.productId && item.productId.id === props.id && (
                            <View key={item.id} style={styles.reviewContainer}>

                                <Image
                                    source={{ uri: item.userId.image }}
                                    style={styles.userImage}
                                />

                                <View style={styles.reviewTextContainer}>
                                    <Text style={styles.userName}>{item.userId.fname} {item.userId.lname}</Text>

                                    <View style={styles.starsContainer}>
                                        {Array.from({ length: Math.floor(item.rating) }, (_, index) => (
                                            <FontAwesome key={index} name="star" style={styles.star} />
                                        ))}
                                        {/* Half star */}
                                        {item.rating % 1 !== 0 && (
                                            <FontAwesome name="star-half-empty" style={styles.star} />
                                        )}
                                    </View>

                                    <Text style={styles.userReview}>{item.desc}</Text>
                                </View>

                            </View>

                        )
                    ))}
                </View>
            </ScrollView>
        );
    }

    function Location() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#ffff', padding: 20, color: 'gainsboro' }}>
                <Text style={{ fontSize: 18 }}>{props.numReviews}</Text>
            </View>
        );
    }
    const tabRef = React.useRef();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'black', // Set the color of the active tab here
                tabBarIndicatorStyle: { backgroundColor: '#f36d72' },
                lazy: true,
            }}
            ref={tabRef}
        >
            <Tab.Screen name="Description" component={Description} />
            <Tab.Screen name="Review" component={Review} />
            <Tab.Screen name="Location" component={Location} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({

    reviewContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewTextContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        color:'black'
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // Position this container absolutely if needed, but not the stars themselves
        position: 'absolute',
        right: 0,
    },
    star: {
        color: '#f36d72',
        fontSize: 13,
        marginRight: 1, // Adjust as necessary for spacing between stars
        // Do not use position: 'absolute' here for individual stars
    },
    userReview: {
        color: '#333',
        marginTop: 5,
    },

})


export default TabViewExample;
