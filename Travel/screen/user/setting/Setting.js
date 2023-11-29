import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Setting = props => {
  return (
    <View style={styles.container}>
      <View style={{width: 360}}>
        <Text style={styles.textHead}>Activity</Text>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Check in')}>
            <View style={styles.itemList}>
              <AntDesign name="carryout" size={22} color="#f36d72" />
              <Text>{'  '}</Text>
              <Text style={styles.text}>Check in</Text>
            </View>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    marginBottom: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  textHead: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  text: {
    color: 'black',
    marginVertical: 10,
    fontSize: 15,
  },
  box: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  itemList: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth:2,
    borderColor:'#dfdfdf'
  },
});
