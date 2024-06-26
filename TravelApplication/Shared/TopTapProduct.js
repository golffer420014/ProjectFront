/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AuthGlobal from '../context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../assests/common/baseUrl';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MapView, {
  Callout,
  enableLatestRenderer,
  Marker,
} from 'react-native-maps';
import EasyButton from './StyledComponents/EasyButton';

const initialLayout = {width: Dimensions.get('window').width};

// คอมโพเนนต์สำหรับ Description
const DescriptionRoute = props => (
  <ScrollView>
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffff',
        padding: 10,
        color: 'gainsboro',
        textAlign: 'center',
      }}>
      <Text style={{fontSize: 15, color: 'black'}}>{props.description}</Text>
    </View>
  </ScrollView>
);

// คอมโพเนนต์สำหรับ Review
const ReviewRoute = ({
  reviews,
  authReview,
  navigation,
  props,
  context,
  deleteComment,
}) => (
  <ScrollView style={{backgroundColor: '#f5f5f5'}}>
    {authReview == true ? (
      <View style={{alignItems: 'center',marginVertical:20}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Product Review', {idProduct: props.id})
          }>
          <View
            style={{
              padding: 5,
              backgroundColor: '#f47a7e',
              borderRadius: 10,
              width:200,
              alignItems:"center"
            }}>
            <FontAwesome name="plus" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    ) : null}

    <View>
      {reviews.length > 0 ? (
        <View>
          {reviews.map(
            item =>
              item.productId &&
              item.productId.id === props.id &&
                <View key={item.id} style={styles.reviewContainer}>
                  <Image
                    source={{uri: item.userId.image ? item.userId.image : ''}}
                    style={styles.userImage}
                  />

                  <View style={styles.reviewTextContainer}>
                    <Text style={styles.userName}>
                      {item.userId.fname} {item.userId.lname}
                    </Text>

                    <View style={styles.starsContainer}>
                      {Array.from(
                        {length: Math.floor(item.rating)},
                        (_, index) => (
                          <FontAwesome
                            key={index}
                            name="star"
                            style={styles.star}
                          />
                        ),
                      )}
                      {/* Half star */}
                      {item.rating % 1 !== 0 && (
                        <FontAwesome
                          name="star-half-empty"
                          style={styles.star}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.userReview}>{item.desc}</Text>
                      {context.stateUser.user.userId == item.userId.id ? (
                        <TouchableOpacity
                          onPress={() => deleteComment(item.id)}>
                          <View style={{paddingRight: 5}}>
                            <FontAwesome name="trash" size={15} color="black" />
                          </View>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                </View>,
          )}
        </View>
      ) : null}
    </View>
  </ScrollView>
);

// คอมโพเนนต์สำหรับ Location
const LocationRoute = ({items, mapNavigate}) => (
  <View style={{flex: 1, alignItems: 'center'}}>
    <MapView
      style={{width: '100%', height: '100%'}}
      initialRegion={{
        latitude: items.length > 0 ? items[0].latitude : 0,
        longitude: items.length > 0 ? items[0].longitude : 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
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
  </View>
);

const TopTapProduct = props => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'description', title: 'Description'},
    {key: 'review', title: 'Review'},
    {key: 'location', title: 'Location'},
  ]);
  const navigation = useNavigation();
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'description':
        return <DescriptionRoute description={props.description} />;
      case 'review':
        // Pass the reviews state and navigation object as props
        return (
          <ReviewRoute
            deleteComment={deleteComment}
            context={context}
            props={props}
            reviews={reviews}
            authReview={authReview}
            navigation={navigation}
          />
        );
      case 'location':
        return (
          <LocationRoute
            items={items}
            navigation={navigation}
            mapNavigate={mapNavigate}
          />
        );
      default:
        return null;
    }
  };

    const mapNavigate = (latitude, longitude) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url);
    };


  const context = useContext(AuthGlobal);
  const [reviews, setReviews] = useState([]);
  const [authReview, setAuthReview] = useState();
  const [token, setToken] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
      // Fetch the latest reviews when the screen comes into focus
      if (context.stateUser.isAuthenticated == true) {
        setAuthReview(true);
      }
      AsyncStorage.getItem('jwt').then(res => setToken(res));
      axios
        .get(`${baseURL}review`)
        .then(res => {
          const reversedReviews = res.data.reverse();
          setReviews(reversedReviews);
          // console.log(res.data);
        })
        .catch(err => {
          console.log('review call error');
        });

      axios.get(`${baseURL}products`).then(res => {
        const itemsWithDouble = res.data.map(item => ({
          ...item,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        }));

        // Check for valid coordinates and matching id before setting items
        const validItems = itemsWithDouble.filter(
          item =>
            !isNaN(item.latitude) &&
            !isNaN(item.longitude) &&
            item.id === props.id,
        );

        if (props) {
          setLoading(false);
        }

        setItems(validItems);
      });
    }, []),
  );

  // console.log(context.stateUser.user.userId)
  // console.log(reviews)

  const deleteComment = id => {
    console.log(id);
    axios
      .delete(`${baseURL}review/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        const updatedReviews = reviews.filter(item => item.id !== id); // Use `reviews` instead of `review`
        setReviews(updatedReviews);
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: `Delete Succeeded`,
          // text2: "Please Login into your account",
        });
      })
      .catch(err => console.log(err));
  };

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
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#f47a7e'}}
          style={{backgroundColor: 'white'}}
          labelStyle={{color: 'gray', fontWeight: '500'}}
          activeColor={'#f47a7e'}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  postReview: {
    width: '60%',
    marginTop: 20,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dfdfdf',
  },

  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#f47a7e',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom:30
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: 'black',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Position this container absolutely if needed, but not the stars themselves
    position: 'absolute',
    right: 0,
  },
  star: {
    color: '#f36d72',
    fontSize: 13,
    marginRight: 1, // Adjust as necessary for spacing between stars
    // Do not use position: 'absolute' here for individual stars
  },
  userReview: {
    color: '#333',
    marginTop: 5,
  },
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
    width: 350,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnPressMap: {
    backgroundColor: '#f47a7e',
    zIndex: 999,
    position: 'absolute',
    right: 0,
    top: 10,
    padding: 10,
  },
});

export default TopTapProduct;
