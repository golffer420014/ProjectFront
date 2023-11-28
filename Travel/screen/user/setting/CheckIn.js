import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../../assests/common/baseUrl';

const CheckIn = () => {
  const [item, setItem] = useState([]);

  // Use useFocusEffect to fetch data when the component is focused
  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}check-in`)
        .then(res => {
          //  console.log(res.data);
          const reversedData = res.data.reverse();
          setItem(reversedData);
        })
        .catch(error => {
          console.log(error);
        });
      return () => {
        setItem([]);
      };
    }, []),
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{width: 360}}>
          {item.map(item => (
            <View style={styles.itemWrapper}>
              <Image
                source={{uri: item.image}}
                style={{width: '100%', height: 150}}
              />
              <View style={{width:'100%',paddingVertical:10}}>
                <Text style={styles.textDF}>Name: {item.productName}</Text>
                <Text style={styles.textDF}>Province: {item.province}</Text>
                <Text style={styles.textDF}>Description: {item.desc}</Text>
                <Text style={styles.textDF}>Date: {item.date}</Text>
              </View>
              {/* <TouchableOpacity></TouchableOpacity> */}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    marginBottom: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  textDF: {
    color: 'black',
    fontSize:16
  },
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
    borderRadius:20
  },
});
