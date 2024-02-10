import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import AuthGlobal from '../../../context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../../../assests/common/baseUrl';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function CalendarNote(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);

  const [selectedDate, setSelectedDate] = useState('กดเลือกวันที่ต้องการลบ');
  const [token, setToken] = useState();
  const [idProduct, setIdProduct] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  // console.log(idProduct);

  useEffect(() => {
    AsyncStorage.getItem('jwt').then(res => setToken(res));
    axios.get(`${baseURL}calendar-note`).then(res => {
      // Sort the array based on the 'start' property
      const sortedData = res.data.sort(
        (a, b) => new Date(a.start) - new Date(b.start),
      );

      setData(sortedData);
      setLoading(false);
    });
  }, []);



  const handleDelete = () => {
    let formdata = {
      date: selectedDate,
    };

    // console.log(formdata);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}calendar-note/${idProduct}`, config) // replace 'yourItemId' with the actual item ID you want to delete
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Delete Note Succeeded',
            text2: 'Please check your calendar note',
          });
          setTimeout(() => {
            props.navigation.navigate('Map');
          }, 500);
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };

  const sampleEvents = [
    {
      userId: '123',
      start: '2023-12-26 09:30:00',
      duration: '02:00:00',
      note: 'Schedule 1',
    },

    {
      userId: '123',
      start: '2023-12-26 12:30:00',
      duration: '02:00:00',
      note: 'Schedule 2',
    },
  ];
  // console.log(JSON.stringify(sampleEvents,null,2));

  const user = '123';
  const usercurr = context.stateUser.user.userId;

  const resultEvent = sampleEvents.filter(event => event.userId === user);

  const test = data.filter(event => event.userId === usercurr);
  // console.log('const sampleEvents', JSON.stringify(sampleEvents, null, 2));

  // console.log(resultEvent);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffff',
        }}>
        <ActivityIndicator size="large" color="#f36d72" />
      </View>
    );
  }

  

  return (
    <View style={styles.container}>
      {/* modal content */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <ScrollView>
            <View style={styles.modalView}>
              <TouchableHighlight
                underlayColor="#E8E8E8"
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  top: 10,
                  right: 15,
                }}>
                <FontAwesome name="close" color="#f47a7e" size={20} />
              </TouchableHighlight>

              {test.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setSelectedDate(item.start);
                    setIdProduct(item.id);
                    setModalVisible(false);
                  }}>
                  <View style={styles.boxProvince}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      วันที่ : {item.start.substring(0, 10)}
                    </Text>
                    <Text style={{color: 'black', fontSize: 18}}>
                      เวลา : {item.start.substring(10)}
                    </Text>
                    <Text style={{color: 'black', fontSize: 18}}>
                      โน๊ต : {item.note}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* calendar note */}

      <WeeklyCalendar
        events={test}
        style={{height: '90%', backgroundColor: ''}}
        themeColor="#f36d72"
        // titleStyle={{color: 'black'}}
        // dayLabelStyle={{color: 'green'}}
        // renderEvent={(event, j) => {
        //   return (
        //     <View
        //       key={j}
        //       style={{
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         height: 65,
        //       }}>
        //       <Text>{event.note}</Text>
        //     </View>
        //   );
        // }}
      />

      {/* footer */}

      <View
        style={{
          flexDirection: 'row',
          width: screenWidth,
          justifyContent: 'space-around',
          height: 60,
          alignItems: 'center',
          gap: -15,
        }}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          {selectedDate == 'กดเลือกวันที่ต้องการลบ' ? (
            <View
              style={[styles.btnLogin, {width: 101, backgroundColor: 'gray'}]}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Delete Note
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleDelete()}>
              <View style={[styles.btnLogin, {width: 101}]}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                  Delete Note
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.boxDate}>
            <Text style={{color: 'black'}}>{selectedDate}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Note')}>
          <View style={styles.btnLogin}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Add Note
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#f36d72',
    width: 100,
    height: 44,
    padding: 10,
    alignItems: 'center', // center x
    justifyContent: 'center', //center y
    borderRadius: 10,
  },

  //   modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#f36d72',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxProvince: {
    width: 260,
    justifyContent: 'center',
    borderWidth: 3,
    marginVertical: 3,
    borderRadius:10,
    paddingHorizontal: 10,
    borderColor: '#dfdfdf',
    padding: 5,

  },
  boxDate: {
    borderWidth: 2,
    width: 160,
    height: 45,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
