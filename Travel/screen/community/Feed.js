import { StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'
import { Image } from 'react-native'

//icon
import AntDesign from 'react-native-vector-icons/AntDesign'

//auth
import AuthGlobal from '../../context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage'


const Feed = (props) => {

    const context = useContext(AuthGlobal);

    const [feed, setFeed] = useState([])
    const [token,setToken] = useState()
    const [userProfile, setUserProfile] = useState()


    useEffect(() => {

        axios
            .get(`${baseURL}community`)
            .then((res) => {
                setFeed(res.data)
            })
    }, []);

    const postCommu = () =>{
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            alert('you must be login first')
        }
        else {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res)
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => {
                            setUserProfile(user.data);
                            props.navigation.navigate('Post Feed', {
                                userProfile: user.data,
                                token: res,
                            });
                        })
                })
                .catch((error) => console.log(error));
        }
    }



    return (
        <View style={styles.mainView}>
            <Text style={styles.Heading}>Community</Text>
            <TouchableOpacity onPress={() => postCommu() }>
                <View style={styles.textInputView} >
                    <Text style={styles.textInput}>
                        What you thing?
                    </Text>
                </View>
            </TouchableOpacity>

            <ScrollView>
                {feed.map((item, index) => {
                    return (
                        <View style={styles.mainPostView}>

                            <View style={styles.postView}>
                                <View style={styles.postBox}>
                                    <View style={styles.imageView}>
                                        <Image
                                            source={require('../../assests/1223348.jpg')}
                                            style={styles.image}
                                        />
                                        <View style={styles.titleView}>
                                            <Text style={styles.postName}>{item.userId}</Text>
                                            <Text>dawdwa</Text>
                                            <Text style={styles.postTitle}>{item.description}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <AntDesign name="edit" size={20} />
                                    </View>

                                </View>

                                {/* desc */}
                                <View>
                                </View>

                                <Image
                                    source={require('../../assests/1223348.jpg')}
                                    style={styles.coverImage}
                                />
                                <Image
                                    style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
                                    source={{ uri: 'http://localhost:5000/public/uploads/1223348.jpg-1696187346789.jpeg' }}
                                />
                            </View>
                        </View>
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    Heading: {
        fontSize: 32,
        marginTop: 10,
        marginLeft: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    textInputView: {
        display: 'flex',
        alignItems: 'center'
    },

    textInput: {
        height: 40,
        width: '90%',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        marginVertical: 20,
    },
    mainPostView: {
        width: '100%',
        // backgroundColor:'gray'
    },
    postBox: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    postView: {
        width: '100%',
        alignItems: "center",
        marginVertical: 20,
    },
    image: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    imageView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    postName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    postTitle: {
        fontSize: 11,
        color: '#989898'
    },
    titleView: {
        marginLeft: 15
    },
    coverImage: {
        width: '90%',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginTop: 20,
        borderRadius: 10
    }
})