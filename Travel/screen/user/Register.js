import { StyleSheet, Text, View, Button ,ScrollView} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//noti
import Toast from 'react-native-toast-message'

//screen
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'

const Register = (props) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");

    const register = () => {
        if (email === "" || name === "" || phone === "" || password === "" || country === "") {
            setError("Please fill in the form correctly");
        }

        let user = {
            name: name,
            email: email,
            country: country,
            password: password,
            phone: phone,
            isAdmin: false,
        }

        axios
            .post(`${baseURL}users/register`, user)
            
            .then((res) => {
                if (res.status === 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: "Please Login into your account",
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Login")
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

    return (
        <ScrollView
            
        >
            <FormContainer title='Register'>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder={"Country"}
                    name={"country"}
                    id={"country"}
                    onChangeText={(text) => setCountry(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <Button title='Register' onPress={() => register()} />
                </View>
                <View>
                    <Button title='Back to Login' onPress={
                        () => props.navigation.navigate('Login')
                    } />
                </View>


            </FormContainer>

        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    },
});