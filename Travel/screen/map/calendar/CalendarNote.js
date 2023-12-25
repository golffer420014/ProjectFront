import React from 'react';
import {StyleSheet, View, Dimensions, Text,TouchableOpacity} from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

export default function CalendarNote(props) {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  
  const sampleEvents = [
    {
      userID: '123',
      start: '2023-12-26 09:30:00',
      duration: '02:00:00',
      note: 'Schedule 1',
    },
    
    {
      userID: '123',
      start: '2023-12-27',
      note: 'กไฟกทวสทา',
    },
  ];

  const user = '123';

  const resultEvent = sampleEvents.filter(event => event.userID === user);



  // console.log(resultEvent);


  return (
    <View style={styles.container}>
      <WeeklyCalendar
        events={resultEvent}
        style={{height: '85%', backgroundColor: ''}}
        themeColor="#f36d72"
        titleStyle={{color: '#f36d72'}}
        // dayLabelStyle={{color: 'green'}}
        renderEvent={(event, j) => {
          return(
            <View key={j} style={{alignItems:'center',justifyContent:'center',height:65}}>
            <Text>{event.note}</Text>
            </View>
          )
        }}
      />
      <View style={{flexDirection:'row', width:screenWidth,justifyContent:'space-around'}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Note')}>
          <View style={[styles.btnLogin,{width:101}]}>
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
