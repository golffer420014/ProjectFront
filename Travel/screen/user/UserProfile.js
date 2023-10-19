import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios"
import baseURL from '../../assests/common/baseUrl';

import AuthGlobal from '../../context/store/AuthGlobal';
import { logoutUser } from '../../context/actions/Auth.actions';
import { useEffect } from 'react/cjs/react.development';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()
  console.log('LOG login =', JSON.stringify(context, null, 2))
  console.log('LOG user =', JSON.stringify(userProfile, null, 2))

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
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button title={"Sign Out"} onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch)
          ]} />
        </View>
        
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60
  }
})

export default UserProfile;