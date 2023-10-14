import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import Toast from 'react-native-toast-message';
import baseURL from '../../assests/common/baseUrl';

export const SET_CURRENT_USER = "SET_CURRENT_USER"

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                const token = data.token;
                AsyncStorage.setItem('jwt', token)
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded, user))
            } else {
                logoutUser(dispatch)
            }
        })
        .catch(err => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Provide correct",
                text2: ""
            });
            logoutUser(dispatch)
        })
}

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt")
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decode, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decode,
        userProfile: user
    }
}
