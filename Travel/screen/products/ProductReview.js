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

const ProductReview = (props) => {
    // console.log('props =', JSON.stringify(props, null, 2))
    // console.log(token)
    const [password, setDesc] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [point, setPoint] = useState(0)
    const navigation = useNavigation()
    const context = useContext(AuthGlobal);

    console.log(JSON.stringify(point,null,2))


    const handleConfirm = (props) => {

        if (password === "" || conPassword === "") {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please fill your form",
                text2: "Please try again",
            });
        } else if (password !== conPassword) {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Password not correct",
                text2: "Please try again",
            });
        } else {
            let formData = {
                password: password
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            axios
                .put(`${baseURL}users/password/${id}`, JSON.stringify(formData), config)
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
                        text1: "Updated error",
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
                // <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                //     <View style={{flexDirection:'row'}}>
                //         {<FontAwesome name='star' size={20} color={i <= point ? '#f36d72' : 'gray'} />}
                //         <Text>{'  '}</Text>
                //     </View>
                // </TouchableOpacity>
                <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                    <FontAwesome
                        name={i <= point ? (point >= i && point < i + 0.5 ? 'star-half-empty' : 'star') : 'star'}
                        size={20}
                        color={i <= point ? '#f36d72' : '#b1b1b1'}
                    />
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

                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 22, marginVertical: 20 }}>Review</Text>

                <View style={[styles.input, { marginTop: 5 }]}>
                    <View style={[styles.input, { marginTop: 5 }]}>
                        <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Fname + Lname</Text>
                        <InputFormProduct
                            placeholder={"แสดงความคิดเห็นของคุณ"}
                            name={"desc"}
                            id={"desc"}
                            onChangeText={(text) => setDesc(text)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                    {renderStars()}
                    </View>

                </View>



                <TouchableOpacity
                    onPress={() => handleConfirm()}
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