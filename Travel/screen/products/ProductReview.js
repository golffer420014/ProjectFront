import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Input from '../../Shared/Form/Input';

import AuthGlobal from '../../context/store/AuthGlobal';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
//noti
import Toast from 'react-native-toast-message'


import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import { useNavigation } from '@react-navigation/native';
import InputFormProduct from '../../Shared/Form/InputFormProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductReview = (props) => {
    // console.log(token)
    const [desc, setDesc] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [point, setPoint] = useState(0)
    const navigation = useNavigation()
    const context = useContext(AuthGlobal);
    const [token ,setToken] = useState()
    console.log(JSON.stringify(props.route.params.idProduct,null,2))



    useEffect(() =>{

        AsyncStorage.getItem('jwt')
        .then(res =>{
            setToken(res)
        })

        // axios
        //     .get(`${baseURL}users/${context.stateUser.user.userId}`)
        //     .then(res =>{
        //         console.log(JSON.stringify(res.data,null,2))
        //         setUser(res.data)
        //     })
    },[])

    const handleConfirm = () => {

        
            if(desc == '' && point == 0){
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Please fill in form",
                    text2: "try again"
                })
            }else{
                let formData = {
                    userId: `${context.stateUser.user.userId}`,
                    productId: `${props.route.params.idProduct}`,
                    rating: point,
                    desc: desc
                };

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                axios
                    .post(`${baseURL}review`, formData, config)
                    .then((res) => {
                        if (res.status == 200 || res.status == 201) {
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: "updated successfuly ",
                                text2: ""
                            });
                            setTimeout(() => {
                                navigation.goBack()
                            }, 500)
                        }
                    })
                    .catch((error) => {
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Please give star",
                            text2: "Please try again"
                        })
                    })
            }

    }

    const handleStarPress = (newRating) => {
        setPoint(newRating);
    };
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                    <View style={{flexDirection:'row'}}>
                        {<FontAwesome name='star' size={20} color={i <= point ? '#f36d72' : 'gray'} />}
                        <Text>{'  '}</Text>
                    </View>
                </TouchableOpacity>
                
            );
        }
        return stars;
    };

    return (
        <ScrollView

        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ padding: 10, paddingHorizontal: 15, backgroundColor: '#f36d72', borderRadius: 50, position: 'absolute', top: -25, left: -190 }}>
                        <FontAwesome name='angle-left' size={20} color='white' />
                    </View>
                </TouchableOpacity>

                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 22, marginTop: 20 }}>Review</Text>

                <View style={[styles.input, { marginTop: 5 }]}>
                        <InputFormProduct
                            placeholder={"แสดงความคิดเห็นของคุณ"}
                            name={"desc"}
                            id={"desc"}
                            onChangeText={(text) => setDesc(text)}
                        />

                    <View style={{ flexDirection: 'row' }}>
                    {renderStars()}
                    </View>
                    <View>
                        <Text style={{ fontSize: 20 , color:'black' }}>{point} / 5</Text>
                    </View>

                </View>



                <TouchableOpacity
                    onPress={() => handleConfirm()}
                    style={{top:-15}}
                >
                    <View style={styles.btnLogin}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Confirm</Text>
                    </View>
                </TouchableOpacity>






            </View>

        </ScrollView>
    )
}

export default ProductReview

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 300,
        paddingTop: 40
    },
    input: {
        width: '100%',
        alignItems: 'center'
    },
    iconUser: {
        position: 'absolute',
        left: 55,
        bottom: 30
    },
    iconPassowrd: {
        position: 'absolute',
        left: 55,
        bottom: 29
    },
    iconEye: {
        position: 'absolute',
        right: -140,
        bottom: 27
    },
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    },
    btnLogin: {
        backgroundColor: '#f36d72',
        width: 330,
        height: 44,
        padding: 10,
        alignItems: 'center', // center x
        justifyContent: 'center', //center y
        borderRadius: 10,
        marginTop: 25
    },

})