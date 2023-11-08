import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity,ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

//screen
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

//noti
import Toast from 'react-native-toast-message'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

// Context
import AuthGlobal from '../../context/store/AuthGlobal'
import { loginUser } from '../../context/actions/Auth.actions'

const Login = (props) => {

    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [error, setError] = useState('')
    const [passShow, setPassShow] = useState(false)

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("User Profile");
        }
    }, [context.stateUser.isAuthenticated, props.navigation])


    const handleSubmit = () => {
        const user = {
            email,
            password,
        };
        if (email === "" || password === "") {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please fill your form",
                text2: "Please try again",
            });
        } else {
            loginUser(user, context.dispatch)
        }
    }



    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>You muse sign in to join</Text>
                    <Text style={{ textAlign: 'center', marginVertical: 10 }}>We’re a Team That Guides Each Other</Text>
                </View>
                {/* google */}
                <TouchableOpacity
                // onPress={}
                >
                    <View style={styles.loginWithContainer}>
                        <View style={styles.loginWith}>
                            <Image
                                source={require('../../assests/google.png')}
                                style={{ width: 25, height: 25, marginRight: 10 }} //
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Sign in with Google</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* facebook */}
                <TouchableOpacity
                // onPress={}
                >
                    <View style={[styles.loginWithContainer]}>
                        <View style={[styles.loginWith, { marginLeft: 15 }]}>
                            <Image
                                source={require('../../assests/facebook.png')}
                                style={{ width: 25, height: 25, marginRight: 10 }} //
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Sign in with Facebook</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* or */}
                <View style={{ borderWidth: .7, width: '75%', borderColor: "#f36d72", marginVertical: 20 }}>
                </View>
                <View style={{ backgroundColor: 'white', top: -30, paddingHorizontal: 10 }}>
                    <Text style={styles.or}>or</Text>
                </View>
                {/* email */}
                <View style={[styles.input, { marginTop: -15 }]}>
                    <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -103 }}>Username or Email</Text>
                    <Input
                        placeholder={"Enter Username or Email"}
                        name={"email"}
                        id={"email"}
                        value={email}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                        onSubmitEditing={() => handleSubmit()}
                        returnKeyType="next"
                    />
                    <View style={styles.iconUser}>
                        <FontAwesome name='user' size={25} color='#f36d72' />
                    </View>
                </View>
                {/* password */}
                {passShow == false ? (
                    <View style={styles.input}>
                        <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                        <Input
                            placeholder={"Enter Password"}
                            name={"password"}
                            id={"password"}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassowrd(text.toLowerCase())}
                            onSubmitEditing={() => handleSubmit()}
                            returnKeyType="next"
                        />
                        <View style={styles.iconPassword}>
                            <FontAwesome name='lock' size={25} color='gray' />
                        </View>
                        <TouchableOpacity
                            onPress={() => setPassShow(true)}
                        >
                            <View style={styles.iconEye}>
                                <Entypo name='eye-with-line' size={22} color='gray' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={
                                () => props.navigation.navigate('UserForgetPassword')
                            }
                        >
                            <Text style={{ color: '#f36d72', fontWeight: 'bold', position: 'relative', right: -105 }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                ) :
                    <View style={styles.input}>
                        <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Password</Text>
                        <Input
                            placeholder={"Enter Password"}
                            name={"password"}
                            id={"password"}
                            // secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassowrd(text.toLowerCase())}
                            onSubmitEditing={() => handleSubmit()}
                            returnKeyType="next"
                            
                        />
                        <View style={styles.iconPassword}>
                            <FontAwesome name='lock' size={25} color='#f36d72' />
                        </View>
                        <TouchableOpacity
                            onPress={() => setPassShow(false)}
                        >
                            <View style={styles.iconEye}>
                                <Entypo name='eye' size={22} color='#f36d72' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={
                                () => props.navigation.navigate('UserForgetPassword')
                            }
                        >
                            <Text style={{ color: '#f36d72', fontWeight: 'bold', position: 'relative', right: -105 }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>}

                <TouchableOpacity
                    onPress={() => handleSubmit()}
                >
                    <View style={styles.btnLogin}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Sign in</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                        onPress={
                            () => props.navigation.navigate('Register')
                        }
                    >
                        <Text style={{ color: '#f36d72' }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Button title='Login' onPress={() => handleSubmit()} />
            </View> */}

                {/* <View style={[styles.buttonGroup, { marginTop: 40 }]}>
                <Text style={styles.middleText}>Don't have any account?</Text>
                <Button title='Register' onPress={
                    () => props.navigation.navigate('Register')
                } />
            </View> */}



            </View>
        </ScrollView>
    )

}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom:55,
        paddingTop:30
    },
    buttonGroup: {
        width: "80%",
        alignItems: "center",
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center",
    },
    loginWithContainer: {
        borderWidth: 2,
        padding: 15,
        borderColor: '#dfdfdf',
        borderRadius: 10,
        width: 330,
        marginVertical: 7
    },
    loginWith: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    or: {
        zIndex: 1,
        position: 'relative',
        // eslint-disable-next-line no-dupe-keys
        top: -3,
        fontSize: 15,
        color: 'black',
        borderRadius:50
    },
    input: {
        width: '100%',
        alignItems: 'center'
    },
    iconUser: {
        position: 'absolute',
        left: 60,
        bottom: 31
    },
    iconPassword: {
        position: 'absolute',
        left: 60,
        bottom: 48
    },
    iconEye: {
        position: 'absolute',
        right: -140,
        bottom: 27
    },
    btnLogin: {
        backgroundColor: '#f36d72',
        width: 330,
        height: 44,
        padding: 10,
        alignItems: 'center', // center x
        justifyContent: 'center', //center y
        borderRadius: 10,
        marginTop: 15
    },
});