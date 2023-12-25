import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import React, {useState, useCallback, useContext, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../../Shared/Form/Input';
import AuthGlobal from '../../../context/store/AuthGlobal';
import Toast from 'react-native-toast-message';
import baseURL from '../../../assests/common/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NewNote = props => {
  const context = useContext(AuthGlobal);
  // console.log(JSON.stringify(context.stateUser.user.userId, null, 2));

  useEffect(() => {
    // ฟังก์ชันเพื่อดึงวันที่ปัจจุบัน
    AsyncStorage.getItem('jwt').then(res => setToken(res));

    const getCurrentDate = () => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}`;
      return formattedDate;
    };

    // ตั้งค่า selectedDate เป็นวันปัจจุบัน
    setSelectedDate(getCurrentDate());
  }, []); // พาสเป็น dependencies เปล่า เพื่อให้ useEffect ทำงานเพียงครั้งเดียวเมื่อ component ถูกโหลด

  // function Form Birth
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [start, setStart] = useState('08:00:00');
  const resultStart = selectedDate + ' ' + start;
  const [end, setEnd] = useState('03:00:00');
  const [note, setNote] = useState('');
  const [token, setToken] = useState();
  const userId = context.stateUser.user.userId;

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    hideCalendar();
  };
  const showCalendar = () => {
    setCalendarVisible(true);
  };

  // console.log(activity);

  const handleConfirm = () => {
    //   const formData = new FormData();
    //   formData.append('userId', userId);
    //   formData.append('start', resultStart);
    //   formData.append('duration', end);
    //   formData.append('note', note);

    // console.log(formData);

    let formData = {
      userId: `${context.stateUser.user.userId}`,
      start: resultStart,
      duration: end,
      note: note,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}calendar-note`, formData, config)
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Add Note Succeeded',
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
          text1: 'Something went wrong ',
          text2: 'Please try again',
        });
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* date */}
        {/* <View style={{gap: 10}}>
          <Text style={[styles.textTitle]}>วันที่</Text>
          <TextInput
            style={styles.inputPlantText}
            placeholder="YYYY-MM-DD"
            value={activity.start}
            onChangeText={handleDateChange}
          />
        </View> */}

        <View>
          <Text style={styles.textTitle}>เลือกวันที่</Text>
          <TouchableOpacity onPress={showCalendar} style={styles.selectButton}>
            <View style={styles.inputCalendar}>
              <Text style={styles.selectedDate}>{selectedDate}</Text>
              <Modal
                isVisible={isCalendarVisible}
                onBackdropPress={hideCalendar}>
                <View style={styles.modalContent}>
                  <Calendar
                    onDayPress={handleDayPress}
                    theme={{
                      selectedDayBackgroundColor: 'blue',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: 'red',
                      arrowColor: '#f36d72',
                      // ... คุณสามารถเพิ่มการกำหนดค่าอื่นๆ สำหรับ theme ที่นี่
                    }}
                    markedDates={{
                      [selectedDate]: {
                        selected: true,
                        selectedColor: '#f36d72',
                      },
                    }}
                  />
                </View>
              </Modal>
            </View>
          </TouchableOpacity>
        </View>

        {/* plant */}
        <View style={{gap: 10}}>
          <View style={styles.boxPlantTime}>
            <View>
              <Text style={styles.textTitle}>ประทับเวลา</Text>
              <TextInput
                style={styles.inputPlantTime}
                placeholder="08:00:00"
                value={start}
                onChangeText={text => setStart(text)}
              />
            </View>
            <View>
              <Text style={styles.textTitle}>ใช้เวลา</Text>
              <TextInput
                style={styles.inputPlantTime}
                value={end}
                placeholder="02:00:00"
                onChangeText={text => setEnd(text)}
              />
            </View>
          </View>
          <Text style={[styles.textTitle]}>คำบรรยาย</Text>
          <TextInput
            style={styles.inputPlantText}
            placeholder="ออกเดินทางจากบ้านไปที่พักพัทยา"
            value={note}
            onChangeText={text => setNote(text)}
          />
        </View>
        <TouchableOpacity onPress={() => handleConfirm()}>
          <View style={styles.btnLogin}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Confirm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewNote;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 400,
    width: screenWidth,
    height: screenHeight,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  //text
  textDF: {
    color: 'black',
  },
  textTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },

  //calendat
  inputCalendar: {
    width: 330,
    borderWidth: 2,
    borderColor: '#dfdfdf',
    borderRadius: 10,
  },
  iconCalendar: {
    position: 'absolute',
    left: 58,
    bottom: 17,
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

    color: '#000000',
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

  //plant time
  boxPlantTime: {
    width: 330,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputPlantTime: {
    borderWidth: 2,
    borderColor: '#dfdfdf',
    borderRadius: 10,
    width: 160,
    paddingHorizontal: 10,
    color: 'black',
  },

  inputPlantText: {
    borderWidth: 2,
    borderColor: '#dfdfdf',
    borderRadius: 10,
    width: 330,
    paddingHorizontal: 10,
    color: 'black',
    marginTop: -5,
  },

  btnLogin: {
    backgroundColor: '#f36d72',
    width: 330,
    height: 44,
    padding: 10,
    alignItems: 'center', // center x
    justifyContent: 'center', //center y
    borderRadius: 10,
    marginTop: 15,
  },
});
