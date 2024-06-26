import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../../Shared/Form/Input';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
//noti
import Toast from 'react-native-toast-message'

import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import FormContainer from '../../Shared/Form/FormContainer';
import { useNavigation } from '@react-navigation/native';

const UserForgetPassword = () => {
    // console.log('props =', JSON.stringify(props, null, 2))
    // const id = props.route.params.userId
    // const token = props.route.params.token
    // console.log(token)

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState("");
    const [passShow, setPassShow] = useState(false)
    const [conPassword, setConPassword] = useState("");

    const [checkUser, setCheckUser] = useState(false)
    const [id, setID] = useState()

    const navigation = useNavigation()

    const handleCheckUser = () => {
        // const [email, setEmail] = useState(null)
        if (email === null || email === "") {
            Toast.show({
              topOffset: 60,
              type: 'error',
            //   text1: 'Please fill your form',
              text2: 'Please fill your form',
            });

        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            axios
                .get(`${baseURL}users/forgetPassword/${email}`, config)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        setID(res.data.id);
                        Toast.show({
                          topOffset: 60,
                          type: 'success',
                          text1: "Auth successfuly",
                          text2: 'Auth successfuly',
                        });
                        setTimeout(() => {
                            setCheckUser(true)
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Auth error",
                        text2: "Please try again"
                    })
                })
        }

    }


    const handleConfirm = () => {

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
              type: 'error',
              text1: 'Password not correct',
              text2: 'Password not correct',
            });
        } else {
            let formData = {
                password: password
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
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
    return (
        <ScrollView
            style={{ backgroundColor: 'white' }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ padding: 10, paddingHorizontal: 15, backgroundColor: '#f36d72', borderRadius: 50, position: 'absolute', top: -25, left: -190 }}>
                        <FontAwesome name='angle-left' size={20} color='white' />
                    </View>
                </TouchableOpacity>

                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 22, marginVertical: 20 }}>Reset Password</Text>

                {/* email */}
                <View style={[styles.input, { marginTop: 5 }]}>
                    <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -105 }}>Username or Email</Text>
                    <Input
                        placeholder={"travel@gmail.com OR hello123"}
                        name={"email"}
                        id={"email"}
                        onSubmitEditing={() => handleCheckUser()}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                    />
                    <View style={styles.iconUser}>
                        <FontAwesome name='user' size={25} color='#f36d72' />
                    </View>
                </View>


                {checkUser == true ? (
                    <View style={styles.containerPassword}>
                        {passShow == false ? (
                            <View style={[styles.input, { marginTop: 5 }]}>
                                <View style={[styles.input, { marginTop: 5 }]}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                                    <Input
                                        placeholder={"Password"}
                                        name={"password"}
                                        id={"password"}
                                        secureTextEntry={true}
                                        onSubmitEditing={() => handleConfirm()}

                                        onChangeText={(text) => setPassword(text)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setPassShow(true)}
                                    >
                                        <View style={styles.iconEye}>
                                            <Entypo name='eye-with-line' size={22} color='gray' />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.iconPassowrd}>
                                        <FontAwesome name='lock' size={25} color='gray' />
                                    </View>
                                </View>

                                <View style={[styles.input, { marginTop: 5 }]}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -115 }}>New Password</Text>
                                    <Input
                                        placeholder={"Confirm Password"}
                                        name={"ConPassword"}
                                        id={"ConPassword"}
                                        secureTextEntry={true}
                                        onSubmitEditing={() => handleConfirm()}

                                        onChangeText={(text) => setConPassword(text)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setPassShow(true)}
                                    >
                                        <View style={styles.iconEye}>
                                            <Entypo name='eye-with-line' size={22} color='gray' />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.iconPassowrd}>
                                        <FontAwesome name='lock' size={25} color='gray' />
                                    </View>
                                </View>
                            </View>
                        ) :
                            <View style={[styles.input, { marginTop: 5 }]}>
                                <View style={[styles.input, { marginTop: 5 }]}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                                    <Input
                                        placeholder={"Password"}
                                        name={"password"}
                                        id={"password"}
                                        // secureTextEntry={true}
                                        onChangeText={(text) => setPassword(text)}
                                        onSubmitEditing={() => handleConfirm()}

                                    />
                                    <TouchableOpacity
                                        onPress={() => setPassShow(false)}
                                    >
                                        <View style={styles.iconEye}>
                                            <Entypo name='eye' size={22} color='#f36d72' />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.iconPassowrd}>
                                        <FontAwesome name='lock' size={25} color='#f36d72' />
                                    </View>
                                </View>

                                <View style={[styles.input, { marginTop: 5 }]}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -115 }}>New Password</Text>
                                    <Input
                                        placeholder={"Confirm Password"}
                                        name={"ConPassword"}
                                        id={"ConPassword"}
                                        onSubmitEditing={() => handleConfirm()}

                                        // secureTextEntry={true}
                                        onChangeText={(text) => setConPassword(text)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setPassShow(false)}
                                    >
                                        <View style={styles.iconEye}>
                                            <Entypo name='eye' size={22} color='#f36d72' />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.iconPassowrd}>
                                        <FontAwesome name='lock' size={25} color='#f36d72' />
                                    </View>
                                </View>
                            </View>
                        }

                    </View>
                ) :
                    null
                }




                {checkUser == false ? (
                    <TouchableOpacity
                        onPress={() => handleCheckUser()}
                    >
                        <View style={styles.btnLogin}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Auth</Text>
                        </View>
                    </TouchableOpacity>
                ) :
                    <TouchableOpacity
                        onPress={() => handleConfirm()}
                    >
                        <View style={styles.btnLogin}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Confirm</Text>
                        </View>
                    </TouchableOpacity>
                }






            </View>

        </ScrollView>
    )
}

export default UserForgetPassword

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 40
    },
    containerPassword: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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