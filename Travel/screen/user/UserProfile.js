import React, { useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import mime from 'mime'

import axios from "axios"
import baseURL from '../../assests/common/baseUrl';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import AuthGlobal from '../../context/store/AuthGlobal';
import { logoutUser } from '../../context/actions/Auth.actions';
import { useEffect } from 'react/cjs/react.development';
import Input from '../../Shared/Form/Input';

var { height, width } = Dimensions.get("window")

const UserProfile = ({ props, navigation }) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState(null)
  const [editProfile, setEditProfile] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [loading, setLoading] = useState()

  const [token, setToken] = useState()
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState()
  const [selectedGender, setSelectedGender] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');





  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login")
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res)
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => {
              setUserProfile(user.data)
              setLoading(false);
            })
        })
        .catch((error) => console.log(error))



      return () => {
        setUserProfile();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.stateUser.isAuthenticated]))

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    hideCalendar();
  };
  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 4000,
      maxWidth: 4000,
    };


    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri)

      }
    });
  };
 

  const handleEdit = () => {

    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('address', address);
    formData.append('birth', selectedDate);
    formData.append('gender', selectedGender);

    if(image){
      const newImageUri = "file:///" + image.split("file:/").join("");

      formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
      });
    }

    // let formData = {
    //   image: image,
    //   fname: fname,
    //   lname: lname,
    //   address: address,
    //   email: email,
    //   birth: selectedDate,
    //   gender: selectedGender
    // };
    

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .put(`${baseURL}users/${userProfile.id}`, formData, config)
      .then((res) => {
        setUserProfile(res.data)
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "User successfuly updated",
            text2: ""
          });
          setTimeout(() => {
            setEditProfile(false)
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

  

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffff'
      }}>
        <ActivityIndicator size="large" color="#f36d72" /> 
      </View>
    );
  }


  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserEditPassowrd', { 
          userId: userProfile ? userProfile.id : '',
          token:token
           })}
      >
        <View style={styles.editPassword}>
          <MaterialIcons name='key' size={18} color='#f36d72' />
        </View>
      </TouchableOpacity>
      {editProfile == true ? (

        <TouchableOpacity
          onPress={() => setEditProfile(false)}
        >
          <View style={styles.editProfile}>
            <FontAwesome name='close' size={20} color='#f36d72' />
          </View>
        </TouchableOpacity>
      ) :
        <TouchableOpacity
          onPress={() => setEditProfile(true)}
        >
          <View style={styles.editProfile}>
            <FontAwesome name='pencil' size={20} color='#f36d72' />
          </View>
        </TouchableOpacity>
      }
      {editProfile == true ? (
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={styles.subContainer}>

            {/* image */}
            <LinearGradient
              colors={['#ff9a9e', '#fcb69f']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
              start={{ x: 0, y: 0 }} // จุดเริ่มต้น (บนซ้าย)
              end={{ x: 1, y: 0 }} // จุดสิ้นสุด (บนขวา)
              style={styles.backImageContainer}
            >

              <View style={styles.imageContainer}>
                {image ? (
                  <Image style={styles.image} source={{ uri: image }} />

                ) :
                  <Image style={styles.image} source={{ uri: userProfile ? userProfile.image : "" }} />

                }
                <TouchableOpacity onPress={openImagePicker} style={styles.imagePicker}>
                  {/* <Text style={{ color:'#f36d72'}}>IMAGE</Text> */}
                  <FontAwesome name='camera' color='white' />
                </TouchableOpacity>
              </View>
            </LinearGradient>


            {/* fname */}
            <View style={[styles.input, { marginTop: 5 }]}>
              <Text style={{ color: 'black', position: 'relative', left: -128 }}>First Name</Text>
              <Input
                placeholder={"First Name"}
                name={"fname"}
                id={"fname"}
                onChangeText={(text) => setFname(text)}

                onSubmitEditing={() => handleEdit()}
                returnKeyType="next"
              />
              <View style={styles.iconUserEdit}>
                <FontAwesome name='user' size={25} color='#f36d72' />
              </View>
            </View>
            {/* lname */}
            <View style={[styles.input, { marginTop: 5 }]}>
              <Text style={{ color: 'black', position: 'relative', left: -128 }}>Last Name</Text>
              <Input
                placeholder={"Last Name"}
                name={"lname"}
                id={"lname"}
                onChangeText={(text) => setLname(text)}
                onSubmitEditing={() => handleEdit()}
                returnKeyType="next"
              />
              <View style={styles.iconUserEdit}>
                <FontAwesome name='user' size={25} color='#f36d72' />
              </View>
            </View>
            {/* Address */}
            <View style={[styles.input, { marginTop: 5 }]}>
              <Text style={{ color: 'black', position: 'relative', left: -133 }}>Address</Text>
              <Input
                placeholder={"Address"}
                name={"address"}
                id={"address"}
                onChangeText={(text) => setAddress(text)}
                onSubmitEditing={() => handleEdit()}
                returnKeyType="next"
              />
              <View style={styles.iconUserEdit}>
                <FontAwesome name='address-card' size={20} color='#f36d72' />
              </View>
            </View>

            {/* Email */}
            {/* <View style={[styles.input, { marginTop: 5 }]}>
              <Text style={{ color: 'black', position: 'relative', left: -133 }}>Email</Text>
              <Input
                placeholder={"Email"}
                name={"email"}
                id={"email"}
                onChangeText={(text) => setEmail(text)}
              />
              <View style={styles.iconUserEdit}>
                <FontAwesome name='address-card' size={20} color='#f36d72' />
              </View>
            </View> */}

            {/* Birth */}
            <View style={styles.input}>
              <Text style={{ color: 'black', position: 'relative', left: -145, marginBottom: 10 }}>Birth</Text>
              <TouchableOpacity onPress={showCalendar} style={styles.selectButton}>
                <View style={styles.inputCalendar}>
                  <Text style={styles.selectedDate}>{selectedDate}</Text>
                  <Modal isVisible={isCalendarVisible} onBackdropPress={hideCalendar}>
                    <View style={styles.modalContent}>
                      <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{ [selectedDate]: { selected: true } }}
                      />
                    </View>
                  </Modal>

                </View>
              </TouchableOpacity>
              <View style={styles.iconCalendar}>
                <FontAwesome name='birthday-cake' size={25} color='#f36d72' />
              </View>
            </View>
            {/* Gender */}
            <View>
              <View style={styles.genderBox}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    selectedGender === 'Male' && styles.radioButtonSelected,
                  ]}
                  onPress={() => setSelectedGender('Male')}
                />
                <Text style={styles.radioButtonLabel}>Male</Text>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    selectedGender === 'Female' && styles.radioButtonSelected,
                  ]}
                  onPress={() => setSelectedGender('Female')}
                />
                <Text style={styles.radioButtonLabel}>Female</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                userProfile && handleEdit()
              }
            >
              <View style={styles.btnLogin}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Confirm</Text>
              </View>
            </TouchableOpacity>



          </ScrollView>
        </Container>
      ) :
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={styles.subContainer}>

            {/* image */}
            <LinearGradient
              colors={['#ff9a9e', '#fcb69f']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
              start={{ x: 0, y: 0 }} // จุดเริ่มต้น (บนซ้าย)
              end={{ x: 1, y: 0 }} // จุดสิ้นสุด (บนขวา)
              style={styles.backImageContainer}
            >

              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: userProfile ? userProfile.image : "" }} />
              </View>
            </LinearGradient>

            <Text style={{ fontSize: 25, color: 'black', marginVertical: 10 }}>
              {userProfile ? userProfile.fname + ' ' + userProfile.lname : ""}
            </Text>
            {/* email */}
            <View style={styles.formDetail}>
              <Text style={{ color: 'black', fontSize: 15 }}>Email & Username</Text>
              <View style={styles.detailValue}>
                <View style={{ position: 'relative', top: 2, marginRight: 10 }}>
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



          </ScrollView>
        </Container>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: -50,
    zIndex: -1,
  },
  subContainer: {
    alignItems: "center",
    paddingBottom: 20
  },
  imageContainer: {
    // elevation: 10
    width: 100,
    height: 100,
    borderStyle: "solid",
    borderWidth: 5,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    position: 'relative',
    top: 55,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor: 'whitesmoke'
  },
  backImageContainer: {
    width: width,
    height: 150,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: -1
  },
  imagePicker: {
    position: "absolute",
    right: -5,
    bottom: 0,
    backgroundColor: "#f36d72",
    padding: 8,
    borderRadius: 100,
    elevation: 20
  },

  formDetail: {
    width: 330,
    marginBottom: 10
  },

  detailValue: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    marginTop: 10,
    alignItems: 'center',
  },
  textValue: {
    color: 'black',
    fontSize: 17
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
  editProfile: {
    position: 'absolute',
    right: 10,
    top: 5,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 50,
    width: 37
  },
  editPassword: {
    position: 'absolute',
    right: 10,
    top: 50,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 50,
    width: 37
  },
  input: {
    width: '100%',
    alignItems: 'center'
  },
  iconUser: {
    position: 'absolute',
    left: 60,
    bottom: 28
  },
  iconUserEdit: {
    position: 'absolute',
    left: 60,
    bottom: 31
  },
  //calendar
  inputCalendar: {
    width: 330,
    borderWidth: 2,
    borderColor: "#dfdfdf",
    borderRadius: 10,
    paddingLeft: 45,
  },
  iconCalendar: {
    position: 'absolute',
    left: 58,
    bottom: 17
  },
  selectButton: {
    borderRadius: 10,

  },
  selectedDate: {
    paddingHorizontal: 10,
    paddingTop: 15,
    height: 50,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',

    color: '#000000'

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  // genderbox
  genderBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 330,
    padding: 10,
    marginTop: 10
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B1B1B1',
    marginHorizontal: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#f36d72', // Customize the color of the checked indicator
    borderColor: '#f36d72',     // Border color for selected
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  // order: {
  //   marginTop: 20,
  //   alignItems: "center",
  //   marginBottom: 60
  // }
})

export default UserProfile;