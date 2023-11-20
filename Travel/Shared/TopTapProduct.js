/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AuthGlobal from '../context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../assests/common/baseUrl';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const initialLayout = { width: Dimensions.get('window').width };

// คอมโพเนนต์สำหรับ Description
const DescriptionRoute = (props) => (
  <ScrollView>
    <View style={{ flex: 1, backgroundColor: '#ffff', padding: 20, color: 'gainsboro', textAlign: 'center' }}>
      <Text style={{ fontSize: 15, color: 'black' }}>{props.description}</Text>
    </View>
  </ScrollView>
);

// คอมโพเนนต์สำหรับ Review
const ReviewRoute = ({ reviews, authReview, navigation, props, context, deleteComment }) => (

  <ScrollView style={{ backgroundColor: '#ffff' }}>

    {authReview == true ? (
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Product Review', { idProduct: props.id })}
        >
          <View style={{ padding: 5, backgroundColor: '#f47a7e', borderRadius: 50, marginTop: 8 }}>
            <FontAwesome name="plus" size={20} color='white' />
          </View>
        </TouchableOpacity>
      </View>

    ) :
      null

    }


    <View>
      {reviews.map((item) => (
        item.productId && item.productId.id === props.id &&
        (
          <View key={item.id} style={styles.reviewContainer}>

            <Image
              source={{ uri: item.userId.image }}
              style={styles.userImage}
            />

            <View style={styles.reviewTextContainer}>
              <Text style={styles.userName}>{item.userId.fname} {item.userId.lname}</Text>

              <View style={styles.starsContainer}>
                {Array.from({ length: Math.floor(item.rating) }, (_, index) => (
                  <FontAwesome key={index} name="star" style={styles.star} />
                ))}
                {/* Half star */}
                {item.rating % 1 !== 0 && (
                  <FontAwesome name="star-half-empty" style={styles.star} />
                )}
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Text style={styles.userReview}>{item.desc}</Text>
                {context.stateUser.user.userId == item.userId.id ? (
                  <TouchableOpacity
                  onPress={() => deleteComment(item.id)}
                  >
                    <View style={{ paddingRight: 5 }}>
                      <FontAwesome name="trash" size={15} color='black' />
                    </View>
                  </TouchableOpacity>

                ) :
                  null
                }

              </View>
            </View>
          </View>
        )
      ))}
    </View>
  </ScrollView>
);

// คอมโพเนนต์สำหรับ Location
const LocationRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
    <Text>สถานที่ของสินค้า...</Text>
  </View>
);




const TopTapProduct = (props) => {


  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'description', title: 'Description' },
    { key: 'review', title: 'Review' },
    { key: 'location', title: 'Location' },
  ]);
  const navigation = useNavigation();
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'description':
        return <DescriptionRoute description={props.description} />;
      case 'review':
        // Pass the reviews state and navigation object as props
        return <ReviewRoute deleteComment={deleteComment} context={context} props={props} reviews={reviews} authReview={authReview} navigation={navigation} />;
      case 'location':
        return <LocationRoute location={props.location} />;
      default:
        return null;
    }
  };


  const context = useContext(AuthGlobal)
  const [reviews, setReviews] = useState([])
  const [authReview, setAuthReview] = useState()
  const [token, setToken] = useState()

  useFocusEffect(
    useCallback(() => {
      // Fetch the latest reviews when the screen comes into focus
      if (context.stateUser.isAuthenticated == true) {
        setAuthReview(true)
      }
      AsyncStorage.getItem('jwt')
        .then(res => setToken(res))
      axios
        .get(`${baseURL}review`)
        .then((res) => {
          const reversedReviews = res.data.reverse();
          setReviews(reversedReviews);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log('review call error');
        });
    }, []) 
  );

  // console.log(context.stateUser.user.userId)
  // console.log(reviews)

  const deleteComment = (id) => {
    console.log(id);
    axios
      .delete(`${baseURL}review/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const updatedReviews = reviews.filter((item) => item.id !== id); // Use `reviews` instead of `review`
        setReviews(updatedReviews);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `Delete Succeeded`,
          // text2: "Please Login into your account",
        });
      })
      .catch((err) => console.log(err));
  }




  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#f47a7e' }}
          style={{ backgroundColor: 'white' }}
          labelStyle={{ color: 'gray', fontWeight: '500' }}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
    color: 'black'
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#f36d72",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 350,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold"
  },

})

export default TopTapProduct;
