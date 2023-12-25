import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Dimensions, Text,TouchableOpacity,ActivityIndicator} from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import AuthGlobal from '../../../context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../../../assests/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Select } from '@gluestack-ui/themed';

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

export default function CalendarNote(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);
  

  useEffect(() => {
    // AsyncStorage.getItem('jwt')
    // .then(res => setToken(res))
    axios.get(`${baseURL}calendar-note`).then(res => {
      setData(res.data);
      setLoading(false)
      // console.log(JSON.stringify(res.data, null, 2));
    });
  }, []);

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
  console.log('const sampleEvents', JSON.stringify(sampleEvents, null, 2));

  // console.log(resultEvent);

  if(loading){
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
      <WeeklyCalendar
        events={data}
        style={{height: '85%', backgroundColor: ''}}
        themeColor="#f36d72"
        titleStyle={{color: '#f36d72'}}
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
      <View
        style={{
          flexDirection: 'row',
          width: screenWidth,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Note')}>
          <View style={[styles.btnLogin, {width: 101}]}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
              Delete Note
            </Text>
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
    width:100,
    height: 44,
    padding: 10,
    alignItems: 'center', // center x
    justifyContent: 'center', //center y
    borderRadius: 10,
    marginTop: 15,

  },
});
