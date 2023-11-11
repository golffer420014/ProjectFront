import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions,StyleSheet, Image,TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AuthGlobal from '../context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../assests/common/baseUrl';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

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
const ReviewRoute = ({ reviews, authReview, navigation, props }) => (
  
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

              <Text style={styles.userReview}>{item.desc}</Text>
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
        return <ReviewRoute props={props} reviews={reviews} authReview={authReview} navigation={navigation} />;
      case 'location':
        return <LocationRoute location={props.location} />;
      default:
        return null;
    }
  };


  const context = useContext(AuthGlobal)
  const [reviews, setReviews] = useState([])
  const [authReview, setAuthReview] = useState()

  useEffect(() => {
    axios
      .get(`${baseURL}review`)
      .then(res => {
        setReviews(res.data)

      })
      .catch((err) => {
        console.log('review call error')
      })

    if (context.stateUser.isAuthenticated == true) {
      setAuthReview(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          style={{ backgroundColor: 'white'}}
          labelStyle={{ color: 'gray',fontWeight:'500'  }}
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
