import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';



//noti
import Toast from 'react-native-toast-message'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

//screen
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'
import RegisterDetail from './RegisterDetail'

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [passShow, setPassShow] = useState(false)
 

    const navigation = useNavigation()

   
//   console.log('dd',password)
//     console.log('ee', conPassword)

    const handleNext = () => {

        if (email === "" || password === "" || conPassword === "" ) {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please fill your form",
                text2: "Please try again",
            });
        }else if(password !== conPassword){
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Password not correct",
                text2: "Please try again",
            });
        }else{
            props.navigation.navigate('RegisterDetail', {
                email: email,
                password: password,
            });
        }
        
    }

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

            <Text style={{fontWeight:'bold',color:'black',fontSize:22, marginVertical:20}}>Create Account</Text>
                {/* email */}
                <View style={[styles.input, { marginTop: 5 }]}>
                    <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -105 }}>Username or Email</Text>
                    <Input
                        placeholder={"travel@gmail.com OR hello123"}
                        name={"email"}
                        id={"email"}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                    />
                    <View style={styles.iconUser}>
                        <FontAwesome name='user' size={25} color='#f36d72' />
                    </View>
                </View>
                
                
                
                {passShow == false ? (
                    <View style={[styles.input, { marginTop: 5 }]}>
                        <View style={[styles.input, { marginTop: 5 }]}>
                            <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                            <Input
                                placeholder={"Password"}
                                name={"password"}
                                id={"password"}
                                secureTextEntry={true}
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
                                <FontAwesome name='lock' size={25} color='#f36d72' />
                            </View>
                        </View>

                        <View style={[styles.input, { marginTop: 5 }]}>
                            <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                            <Input
                                placeholder={"Confirm Password"}
                                name={"ConPassword"}
                                id={"ConPassword"}
                                secureTextEntry={true}
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
                                <FontAwesome name='lock' size={25} color='#f36d72' />
                            </View>
                        </View>
                    </View>
                ):
                    <View style={[styles.input, { marginTop: 5 }]}>
                        <View style={[styles.input, { marginTop: 5 }]}>
                            <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                            <Input
                                placeholder={"Password"}
                                name={"password"}
                                id={"password"}
                                // secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                onPress={() => setPassShow(false)}
                            >
                                <View style={styles.iconEye}>
                                    <Entypo name='eye' size={22} color='#f36d72' />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.iconPassowrd}>
                                <FontAwesome name='unlock' size={25} color='#f36d72' />
                            </View>
                        </View>

                        <View style={[styles.input, { marginTop: 5 }]}>
                            <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                            <Input
                                placeholder={"Confirm Password"}
                                name={"ConPassword"}
                                id={"ConPassword"}
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
                                <FontAwesome name='unlock' size={25} color='#f36d72' />
                            </View>
                        </View>
                    </View>
                    }
                
                

                <TouchableOpacity
                    onPress={() => handleNext()}
                >
                    <View style={styles.btnLogin}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Next</Text>
                    </View>
                </TouchableOpacity>

                


            

            </View>

        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom:200,
        paddingTop:40
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

    
});