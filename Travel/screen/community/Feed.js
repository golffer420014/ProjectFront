import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, Modal, ScrollView, TouchableOpacity } from 'react-native'
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

//shared
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import Toast from 'react-native-toast-message';


const Feed = (props) => {

    const context = useContext(AuthGlobal);

    const [dataFeed, setDataFeed] = useState([])
    const [token, setToken] = useState()
    const [userProfile, setUserProfile] = useState()
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)

    // console.log('feed', JSON.stringify(dataFeed, null, 2))



    useFocusEffect(
        useCallback(() => {
            axios
                .get(`${baseURL}community`)
                .then((res) => {
                    setDataFeed(res.data)
                    setLoading(false)
                    setModalVisible(false)
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


    const deletePost = (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        axios
            .delete(`${baseURL}community/${id}`, config)

            .then((res) => {
                if (res.status === 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Delete Succeeded",
                        text2: "Please Login into your account",
                    });
                    setTimeout(() => {
                        const newFeed = dataFeed.filter((item) => item.id !== id);
                        setDataFeed(newFeed);
                    }, 500)
                }
            })
            .catch((err) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
            })
    
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
                {dataFeed.reverse().map((item, index) => {
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
                                            <Text style={styles.postName}>{item.userId.fname} {item.userId.lname}</Text>
                                            <Text>{item.province}</Text>
                                        </View>
                                    </View>
                                    {context.stateUser.user.userId != item.userId.id ? (
                                        null
                                    ) :
                                        <TouchableOpacity
                                            onPress={() => setModalVisible(true)}
                                        >
                                            <View style={{}}>
                                                <AntDesign name="edit" size={20} color='black' />
                                            </View>
                                        </TouchableOpacity>
                                    }

                                    <Modal
                                        animationType='fade'
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => {
                                            setModalVisible(false)
                                        }}
                                    >
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView}>
                                                <TouchableHighlight
                                                    underlayColor="#E8E8E8"
                                                    onPress={() => {
                                                        setModalVisible(false)
                                                    }}
                                                    style={{
                                                        alignSelf: 'flex-end',
                                                        position: 'absolute',
                                                        top: 5,
                                                        right: 10,
                                                    }}
                                                >
                                                    <AntDesign name='close' size={20} />
                                                </TouchableHighlight>
                                                <EasyButton
                                                    medium
                                                    secondary
                                                    onPress={() => {
                                                        // กรองเฉพาะข้อมูลที่มี userId ตรงกับ userId ของ user จาก context
                                                        const filteredData = dataFeed.filter(
                                                            (item) => item.userId.id === context.stateUser.user.userId
                                                        );

                                                        // เช็คว่ามีข้อมูลหลังจากกรองหรือไม่ ถ้ามีก็ส่ง item แรกที่ผ่านการกรอง
                                                        if (filteredData.length > 0) {
                                                            props.navigation.navigate("Post Feed", {
                                                                item: filteredData[0],
                                                            });
                                                        } else {
                                                            console.log('No matching data found');
                                                        }

                                                        // ปิด modal
                                                        setModalVisible(false);
                                                    }}
                                                >
                                                    <Text style={styles.textStyle}>Edit</Text>
                                                </EasyButton>
                                                <EasyButton
                                                    medium
                                                    danger
                                                    onPress={() => [deletePost(item.id), setModalVisible(false)]}

                                                >
                                                    <Text style={styles.textStyle}>Delete</Text>
                                                </EasyButton>

                                            </View>
                                        </View>

                                    </Modal>


                                </View>
                                {item.desc ? (
                                    <View style={styles.desc}>
                                        <Text style={{ color: 'black', fontSize: 15 }}>{item.desc}</Text>
                                    </View>
                                ) :
                                    <View style={{height:10}}>
                                    </View>
                                }
                                <View>
                                </View>

                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.coverImage}
                                />
                                

                            </View>
                            <View style={{
                                height: 20,
                                width: '100%',
                                backgroundColor: '#dfdfdf',
                            }}>

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
        backgroundColor: '#ffff',
        marginBottom:-5
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
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal:5,
    },

    textInput: {
        height: 40,
        width: '100%',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        marginVertical: 10,
    },
    mainPostView: {
        width: '100%',
        // backgroundColor:'gray',
        paddingVertical:5,
    },
    postBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingRight: 20,

    },
    postView: {
        width: '100%',
        alignItems: "center",
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
        marginVertical: 3,
        borderWidth: 1.5,
        borderColor: '#dfdfdf',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        top: 5,
    },
    coverImage: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.06)',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    },
})