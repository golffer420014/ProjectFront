import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import MapView, {
  Callout,
  enableLatestRenderer,
  Marker,
} from 'react-native-maps';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import baseURL from '../../assests/common/baseUrl';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

enableLatestRenderer();

const TestMap = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);



  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}products`)
        .then(res => {
          const itemsWithDouble = res.data.map(item => ({
            ...item,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          }));

          // Check for valid coordinates before setting items
          const validItems = itemsWithDouble.filter(
            item => !isNaN(item.latitude) && !isNaN(item.longitude),
          );

          setItems(validItems);

          setLoading(false);
        })
        .catch(err => {
          setLoading(true);
          console.log(err);
        });

      return () => {
        setItems([]);
        setLoading(true);
      };
    }, []),
  );

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

  const go = (latitude, longitude) => {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude, // Use items[0].longitude here
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    // setRegion({
    //   ...region,
    //   latitude: latitude,
    //   longitude: longitude, // Use items[0].longitude here
    // });
  };

  const renderItem = ({item}) => {
    if (item.category.name !== 'อาหาร' && item.category.name !== 'ที่พัก') {
      return (
        <View style={styles.listItem}>
          <View
            style={{
              backgroundColor: '#f36d72',
              paddingVertical: 5,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              {item.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => go(item.latitude, item.longitude)}>
            <Image
              source={{uri: item.image}}
              style={{width: 300, height: 150}}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      // Return null for items with category 'อาหาร' or 'ที่พัก' to exclude them
      return null;
    }
  };

  const mapNavigate = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };


  return (
    <View style={{flex: 1}}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: items[0].latitude,
          longitude: items[0].longitude, // Use items[0].longitude here
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {/* code ส่วนที่ แก้ไข icon หมุด */}
        {/* {items.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}>
            <View style={{top: -20,left:15, paddingTop: 30,paddingRight:15}}>
              <Entypo name="pin" size={30} color="#f36d72" />
            </View>
          </Marker>
        ))} */}

        {/* code ส่วนที่ใช้หมุดของแพคเกจ */}
        {items.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}>
            <Callout
              onPress={() => mapNavigate(marker.latitude, marker.longitude)}>
              <View style={styles.modalPin}>
                <EasyButton medium main onPress={() => console.log('e')}>
                  <Text style={{color: 'white'}}>Navigate</Text>
                </EasyButton>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.listView}>
        <FlatList
          horizontal={true}
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default TestMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listView: {
    position: 'absolute',
    bottom: 0,
  },
  listItem: {
    padding: 5,
  },
  modalPin: {
    padding: 5,
    flexDirection: 'row',
  },
});
