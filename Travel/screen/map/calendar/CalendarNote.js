import React from 'react';
import {StyleSheet, View, Dimensions, Text,TouchableOpacity} from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

export default function CalendarNote() {
  const sampleEvents = [
    {
      userID: '123',
      start: '2023-12-26 09:30:00',
      duration: '02:00:00',
      note: 'Schedule 1',
    },
    {
      userID: '1234',
      start: '2023-12-26 11:30:00',
      duration: '10:00:00',
      note: 'Schedule 2',
    },
  ];

  const user = '123';

  const resultEvent = sampleEvents.filter(event => event.userID === user);

  console.log(resultEvent);

  return (
    <View style={styles.container}>
      <WeeklyCalendar
        events={resultEvent}
        style={{height: '100%'}}
        themeColor="#f36d72"
        // titleStyle={{color: 'blue'}}
        // dayLabelStyle={{color: 'green'}}
      />
      <View>
        <TouchableOpacity
        // onPress={() => handleSubmit()}
        >
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
    justifyContent: 'center',
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
