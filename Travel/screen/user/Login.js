import { StyleSheet, Text, View , Button ,Keyboard } from 'react-native'
import React, { useState } from 'react'

//screen
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

const Login = (props) => {

    const [email,setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = () => {
        const user = {
            email,
            password,
        };
        if(email === "" || password === ""){
            setError('Please fill in form')
        }else{
            console.log('success')
        }
    }


  return (
    <FormContainer title={'Login'} >
          <Input
              placeholder={"Enter Email"}
              name={"email"}
              id={"email"}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <Input
              placeholder={"Enter Password"}
              name={"password"}
              id={"password"}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassowrd(text.toLowerCase())}
          />
          
        <View style={styles.buttonGroup}>
              {error ? <Error message={error} /> : null}
            <Button title='Login' onPress={()=> handleSubmit()}/>
        </View>

          <View style={[styles.buttonGroup,{marginTop:40}]}>
          <Text style={styles.middleText}>Don't have any account?</Text>
          <Button title='Register' onPress={
            () => props.navigation.navigate('Register')
          }/>
          </View>

          

    </FormContainer>
  )
}

export default Login

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        alignItems: "center",
    },
    middleText: {
        marginBottom: 20,
        alignSelf: "center",
    },
});