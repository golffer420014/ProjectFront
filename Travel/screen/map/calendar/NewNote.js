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
import React, {useState, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../../Shared/Form/Input';
import AuthGlobal from '../../../context/store/AuthGlobal';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NewNote = () => {
  const context = useContext(AuthGlobal);
  // console.log(JSON.stringify(context.stateUser.user.userId, null, 2));
  const [activity, setActivity] = useState({
    userID: context.stateUser.user.userId,
    start: '',
    note: '',
  });

  console.log(activity);

  const handleNoteChange = value => {
    setActivity(prevActivity => ({
      ...prevActivity,
      note: value,
    }));
  };

  const handleDateChange = value => {
    setActivity(prevActivity => ({
      ...prevActivity,
      start: value,
    }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* date */}
        <View style={{gap: 10}}>
          <Text style={[styles.textTitle]}>วันที่</Text>
          <TextInput
            style={styles.inputPlantText}
            placeholder="YYYY-MM-DD"
            value={activity.start}
            onChangeText={handleDateChange}
          />
        </View>
        {/* plant */}
        <View style={{gap: 10}}>
          <Text style={[styles.textTitle]}>คำบรรยาย</Text>
          <TextInput
            style={styles.inputPlantText}
            placeholder="ไปเที่ยวพัทยากับเพื่อน"
            value={activity.note}
            onChangeText={handleNoteChange}
          />
        </View>
        <TouchableOpacity
        //  onPress={() => register()}
        >
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
    marginBottom: 20,
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
  inputPlant: {
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
    marginTop: -10,
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
