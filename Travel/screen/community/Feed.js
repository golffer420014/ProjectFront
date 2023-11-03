import { StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useContext, useCallback } from 'react'
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

    const [dataFeed, setDataFeed] = useState([])
    const [token, setToken] = useState()
    const [userProfile, setUserProfile] = useState()
    const [loading, setLoading] = useState(true)




    useFocusEffect(
        useCallback(() => {
            axios
                .get(`${baseURL}community`)
                .then((res) => {
                    setDataFeed(res.data)
                    setLoading(false)
                })

        }, [])
    )



    const postCommu = () => {
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

    if (loading == true) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffff'
            }}>
                <ActivityIndicator size="large" color="#f36d72" />
            </View>
        );
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.Heading}>Community</Text>
            <TouchableOpacity onPress={() => postCommu()}>
                <View style={styles.textInputView} >
                    <Text style={styles.textInput}>
                        What you thing?
                    </Text>
                </View>
            </TouchableOpacity>

            <ScrollView>
                {dataFeed.map((item, index) => {
                    return (
                        <View style={styles.mainPostView}>

                            <View style={styles.postView}>
                                <View style={styles.postBox}>
                                    <View style={styles.imageView}>
                                        <Image
                                            source={{ uri: item.userId.image }}
                                            style={styles.image}
                                        />
                                        <View style={styles.titleView}>
                                            <Text style={styles.postName}>{item.userId.fname}</Text>
                                            <Text>{item.province}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <AntDesign name="edit" size={20} />
                                    </View>

                                </View>
                                {item.desc ? (
                                    <View style={styles.desc}>
                                        <Text style={{ color: 'black', fontSize: 15 }}>{item.desc}</Text>
                                    </View>
                                ) : 
                                null
                                }
                                <View>
                                </View>

                                <Image
                                    source={{ uri: item.userId.image }}
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
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:5,
        paddingRight:20
    },
    postView: {
        width: '100%',
        alignItems: "center",
        marginBottom: -170
    },
    image: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom:5
    },
    imageView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    postName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },

    titleView: {
        marginLeft: 15
    },
    desc: {
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        marginVertical:3,
        borderWidth: 1,
        borderColor: '#B1B1B1',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        top:5
        

    },
    coverImage: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.06)',
    }
})