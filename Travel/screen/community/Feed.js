import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, Modal, ScrollView, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'
import { Image } from 'react-native'

//icon
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

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
                    const reversedData = [...res.data].reverse();
                    setDataFeed(reversedData);
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
        console.log(id)

        // axios
        //     .delete(`${baseURL}community/${id}`, config)

        //     .then((res) => {
        //         if (res.status === 200) {
        //             Toast.show({
        //                 topOffset: 60,
        //                 type: "success",
        //                 text1: "Delete Succeeded",
        //                 text2: "Please Login into your account",
        //             });
        //             setTimeout(() => {
        //                 const newFeed = dataFeed.filter((item) => item.id !== id);
        //                 setDataFeed(newFeed);
        //             }, 500)
        //         }
        //     })
        //     .catch((err) => {
        //         Toast.show({
        //             topOffset: 60,
        //             type: "error",
        //             text1: "Something went wrong",
        //             text2: "Please try again",
        //         });
        //     })

    }

    const reverseDataFeed = () => {
        // สร้างสำเนาของอะเรย์โดยใช้ slice() หรือ spread operator
        // แล้วค่อยเรียก reverse() บนสำเนา
        const reversedData = [...dataFeed].reverse();
        // ตั้งค่า state ด้วยอะเรย์ที่ได้ reverse แล้ว
        setDataFeed(reversedData);
    };


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
        <View style={styles.container}>
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
                        <View style={styles.itemWrapper}>
                            <View style={styles.header}>
                                <View style={{flexDirection:'row'}}>
                                    <Image
                                        source={{ uri: item.userId.image }}
                                        style={{ width: 35, height: 35, borderRadius: 50 ,top:-9 }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.itemName}>{item.userId.fname} {item.userId.lname}</Text>
                                    </View>
                                </View>
                                {context.stateUser.user.userId != item.userId.id ? (
                                    null
                                ) :
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <View style={{ top:-10 }}>
                                            <Entypo name="dots-three-horizontal" size={20} color='black' />
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{paddingHorizontal:10 ,top:-15 }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ height: 300, width: '100%', borderRadius: 10 }}
                                    resizeMode='stretch'
                                />

                            </View>

                            <View style={styles.descWrapper}>
                               <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <View style={styles.like}>
                                        <FontAwesome name="heart-o" size={20} color='black' />
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome name="map-marker" size={20} color='black' />
                                        <Text style={[styles.itemName]}>{'  '}</Text>
                                        <Text style={[styles.itemName]}>{item.province}</Text>
                                    </View>
                                </View>
                                {item.desc ? (
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={[styles.itemName]}>{item.desc}</Text>
                                    </View>
                                ) :
                                null
                                }

                            </View>


                            {/* modal */}
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
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom:20
    },
    itemWrapper: {
        borderRadius:10,
        width: 400,
        marginVertical:5,
        borderWidth: 3,
        borderColor:'#dfdfdf'
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        margin:15,
        marginTop:25
    },
    itemName:{
        color:'black',
        fontWeight:'500',
        fontSize:15
    },
    descWrapper:{
        paddingHorizontal:15,
        paddingBottom:10
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