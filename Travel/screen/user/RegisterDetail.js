import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import React ,{useState,useEffect} from 'react'
import Input from '../../Shared/Form/Input';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
//noti
import Toast from 'react-native-toast-message'

import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';

const RegisterDetail = ({ route, navigation }) => {
    const { email, password } = route.params;
    const [fname, setFname] = useState("");
    const[lname,setLname] = useState("");
    const [address, setAddress] = useState("");
    // function Gender
    const [selectedGender, setSelectedGender] = useState('');

    // function Form Birth
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Birth');



    const register = () => {

        let user = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            address: address,
            birth: selectedDate,
            gender: selectedGender,
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
                        navigation.navigate("Login")
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

    console.log(address)


  return (
    <ScrollView>
          <View style={styles.container}>
              <TouchableOpacity
                  onPress={() => navigation.goBack()}

              >
                  <View style={{ padding: 10, backgroundColor: '#f36d72', borderRadius: 50, position: 'absolute', top: -40, left: -190 }}>
                      <FontAwesome name='angle-left' size={20} color='white' />
                  </View>
              </TouchableOpacity>

              <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 22, marginVertical: 20 }}>Create Account</Text>
              {/* fname */}
              <View style={[styles.input, { marginTop: 5 }]}>
                  <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>First Name</Text>
                  <Input
                      placeholder={"First Name"}
                      name={"fname"}
                      id={"fname"}
                      onChangeText={(text) => setFname(text.toLowerCase())}
                  />
                  <View style={styles.iconUser}>
                      <FontAwesome name='user' size={25} color='#f36d72' />
                  </View>
              </View>
              {/* lname */}
              <View style={[styles.input, { marginTop: 5 }]}>
                  <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Last Name</Text>
                  <Input
                      placeholder={"Last Name"}
                      name={"lname"}
                      id={"lname"}
                      onChangeText={(text) => setLname(text.toLowerCase())}
                  />
                  <View style={styles.iconUser}>
                      <FontAwesome name='user' size={25} color='#f36d72' />
                  </View>
              </View>
              {/* adress */}
              <View style={[styles.input, { marginTop: 5 }]}>
                  <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -140 }}>Adress</Text>
                  <Input
                      placeholder={"Adress"}
                      name={"adress"}
                      id={"adress"}
                      onChangeText={(text) => setAddress(text.toLowerCase())}
                  />
                  <View style={styles.iconUser}>
                      <FontAwesome name='address-card' size={20} color='#f36d72' />
                  </View>
              </View>

              <View style={styles.input}>
                  <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -145,marginBottom:10 }}>Birth</Text>
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

              <View>
                  <View style={styles.genderBox}>
                      <TouchableOpacity
                          style={[
                              styles.radioButton,
                              selectedGender === 'male' && styles.radioButtonSelected,
                          ]}
                          onPress={() => setSelectedGender('male')}
                      />
                      <Text style={styles.radioButtonLabel}>Male</Text>
                      <TouchableOpacity
                          style={[
                              styles.radioButton,
                              selectedGender === 'female' && styles.radioButtonSelected,
                          ]}
                          onPress={() => setSelectedGender('female')}
                      />
                      <Text style={styles.radioButtonLabel}>Female</Text>
                  </View>
              </View>

              
              {/* <View style={[styles.input, { marginTop: 5 }]}>
                  <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Gender</Text>
                  <Input
                      placeholder={"Birth"}
                      name={"birth"}
                      id={"birth"}
                      onChangeText={(text) => setBirth(text.toLowerCase())}
                  />
                  <View style={styles.iconUser}>
                      <FontAwesome name='user' size={25} color='#dfdfdf' />
                  </View>
              </View>


              <View style={[styles.input, { marginTop: 5 }]}>
                  <Text style={{ color: 'black', fontWeight: 'bold', position: 'relative', left: -128 }}>Gender</Text>
                  <Input
                      placeholder={"Gender"}
                      name={"gender"}
                      id={"gender"}
                      onChangeText={(text) => setGender(text.toLowerCase())}
                  />
                  <View style={styles.iconUser}>
                      <FontAwesome name='user' size={25} color='#dfdfdf' />
                  </View>
              </View> */}

              <TouchableOpacity
                  onPress={() => register()}
              >
                  <View style={styles.btnLogin}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Register</Text>
                  </View>
              </TouchableOpacity>

          </View>
    </ScrollView>
  )
}

export default RegisterDetail

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // paddingBottom: 200,
        paddingVertical: 50
    },
    input: {
        width: '100%',
        alignItems: 'center',
    },

    iconUser: {
        position: 'absolute',
        left: 60,
        bottom: 28
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
        marginTop: 10
    },
    //calendar
    inputCalendar: {
        width: 330,
        borderWidth:2,
        borderColor:"#dfdfdf",
        borderRadius:10,
        paddingLeft:45
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

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    // genderbox
    genderBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width:330,
        padding:10,
        marginTop:10
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

})