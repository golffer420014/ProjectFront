import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';


import axios from "axios"
import baseURL from '../../assests/common/baseUrl';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import AuthGlobal from '../../context/store/AuthGlobal';
import { logoutUser } from '../../context/actions/Auth.actions';
import { useEffect } from 'react/cjs/react.development';

var { height, width } = Dimensions.get("window")

const UserProfile = (props) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()
  // console.log('LOG login =', JSON.stringify(context, null, 2))
  console.log('Profile =', JSON.stringify(userProfile, null, 2))

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login")
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data))
        })
        .catch((error) => console.log(error))

      

      return () => {
        setUserProfile();
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.stateUser.isAuthenticated]))

  return (
    <Container style={styles.container}>  
      <ScrollView contentContainerStyle={styles.subContainer}>
        {/* image */}
        <LinearGradient
          colors={['#ff9a9e', '#fcb69f']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
          start={{ x: 0, y: 0 }} // จุดเริ่มต้น (บนซ้าย)
          end={{ x: 1, y: 0 }} // จุดสิ้นสุด (บนขวา)
          style={styles.backImageContainer}
        >
        <TouchableOpacity>
            <View style={styles.editProfile}>
              <FontAwesome name='pencil' size={20} color='#f36d72' />
            </View>
        </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: userProfile ? userProfile.image : "" }} />
          </View>
        </LinearGradient>

        <Text style={{ fontSize: 25 ,color:'black',marginVertical:10 }}>
          {userProfile ? userProfile.fname +' '+ userProfile.lname : ""}
        </Text>
        {/* email */}
        <View style={styles.formDetail}>
          <Text style={{color:'black',fontSize:15}}>Email</Text>
          <View style={styles.detailValue}>
          <View style={{position:'relative',top:2,marginRight:10}}>
              <Entypo name='email' size={15} color='#f47a7e' />
          </View>
            <Text style={styles.textValue}>{userProfile ? userProfile.email : ""}</Text>
          </View>
        </View>
        {/* Address */}
        <View style={styles.formDetail}>
          <Text style={{ color: 'black', fontSize: 15 }}>Address</Text>
          <View style={styles.detailValue}>
            <View style={{ position: 'relative', top: 2, marginRight: 10 }}>
              <FontAwesome name='address-card' size={15} color='#f47a7e' />
            </View>
            <Text style={styles.textValue}>{userProfile ? userProfile.address : ""}</Text>
          </View>
        </View>
        {/* Birth */}
        <View style={styles.formDetail}>
          <Text style={{ color: 'black', fontSize: 15 }}>Birth</Text>
          <View style={styles.detailValue}>
            <View style={{ position: 'relative', top: 2, marginRight: 10 }}>
              <FontAwesome name='birthday-cake' size={15} color='#f47a7e' />
            </View>
            <Text style={styles.textValue}>{userProfile ? userProfile.birth : ""}</Text>
          </View>
        </View>
        {/* Gender */}
        <View style={styles.formDetail}>
          <Text style={{ color: 'black', fontSize: 15 }}>Gender</Text>
          <View style={styles.detailValue}>
            <View style={{ position: 'relative', top: 2, marginRight: 10 }}>
              <FontAwesome name='transgender' size={18} color='#f47a7e' />
            </View>
            <Text style={styles.textValue}>{userProfile ? userProfile.gender : ""}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch)
          ]}
        >
          <View style={styles.btnLogin}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={{ marginTop: 80 }}>
          <Button title={"Sign Out"} onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch)
          ]} />
        </View> */}
        
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: -50
  },
  imageContainer: {
    // elevation: 10
    width: 100,
    height: 100,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    position:'relative',
    top:55
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100
  },
  backImageContainer:{
    width:width,
    height:150,
    justifyContent: "center",
    alignItems:'center',
    marginBottom:30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  formDetail:{
    width:330,
    marginBottom:10
  },

  detailValue:{
    flexDirection:'row',
    padding:15,
    borderRadius:10,
    backgroundColor: 'whitesmoke',
    marginTop:10,
    alignItems: 'center',
  },
  textValue:{
    color:'black',
    fontSize:17
  },

  subContainer: {
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
    marginTop: 10
  },
  editProfile:{
    position: 'absolute',
    right:-197,
    top:30,
    backgroundColor:'whitesmoke',
    padding:10,
    borderRadius:50
  },
  // order: {
  //   marginTop: 20,
  //   alignItems: "center",
  //   marginBottom: 60
  // }
})

export default UserProfile;