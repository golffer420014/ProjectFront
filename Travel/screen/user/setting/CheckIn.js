import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../../assests/common/baseUrl';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../../context/store/AuthGlobal';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const CheckIn = () => {
  const [item, setItem] = useState([]);
  const [token, setToken] = useState();

  const context = useContext(AuthGlobal);
  console.log(context)

  // console.log(JSON.stringify(context.stateUser.user.userId, null, 2));
  console.log(JSON.stringify(item, null, 2));

  // Use useFocusEffect to fetch data when the component is focused
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('jwt').then(res => {
        setToken(res);
      });
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

  const deleteItem = id => {
    axios
      .delete(`${baseURL}check-in/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        const updatedReviews = item.filter(item => item.id !== id); // Use `reviews` instead of `review`
        setItem(updatedReviews);
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: `Delete Succeeded`,
          text2: 'Check in',
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{width: 360}}>
          {item
            .filter(item => item.userId === context.stateUser.user.userId)
            .map(filteredItem => (
              <View style={styles.itemWrapper} key={filteredItem.id}>
                <Image
                  source={{uri: filteredItem.image}}
                  style={{width: '100%', height: 150, borderRadius: 10}}
                  resizeMode="cover"
                />
                <View style={{width: '100%', paddingVertical: 10}}>
                  <Text style={styles.textDF}>
                    Name: {filteredItem.productName}
                  </Text>
                  <Text style={styles.textDF}>
                    Province: {filteredItem.province}
                  </Text>
                  <Text style={styles.textDF}>
                    Description: {filteredItem.desc}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.textDF}>Date: {filteredItem.date}</Text>
                    <TouchableOpacity
                      onPress={() => deleteItem(filteredItem.id)}>
                      <Entypo name="trash" color="black" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
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
    fontSize: 16,
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
    borderRadius: 20,
    marginBottom: 10,
  },
});
