import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import baseURL from '../assests/common/baseUrl';
import AuthGlobal from '../context/store/AuthGlobal';

//icon 
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EasyButton from './StyledComponents/EasyButton';
import InputFormProduct from './Form/InputFormProduct';
import { useNavigation } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();

function TabViewExample(props) {
    const context = useContext(AuthGlobal)
    const [modalVisible, setModalVisible] = useState(false)
    const [desc, setDesc] = useState()
    const [point, setPoint] = useState(0)
    const [reviews, setReviews] = useState([])
    const [authReview, setAuthReview] = useState()
    // console.log(JSON.stringify(context, null, 2))
    const navigation = useNavigation()

    useEffect(() => {
        axios
            .get(`${baseURL}review`)
            .then(res => {
                setReviews(res.data)

            })
            .catch((err) => {
                console.log('review call error')
            })

        if (context.stateUser.isAuthenticated == true) {
            setAuthReview(true)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
            <ScrollView style={{ backgroundColor: '#ffff' }}>

                {authReview == true ? (
                        <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                            onPress={() => navigation.navigate('Product Review' , {item:props})}
                    >
                            <View style={{ padding: 5, backgroundColor:'#f47a7e' ,borderRadius:50,marginTop:8}}>
                                <FontAwesome name="plus" size={20} color='white' />
                            </View>
                    </TouchableOpacity>
                        </View>

                ) :
                    null
                }

                

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

    postReview: {
        width: '60%',
        marginTop: 20,
        marginLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#dfdfdf',
    },

    reviewContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 5,
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
        color: 'black'
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#f36d72",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 350,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    },

})


export default TabViewExample;
