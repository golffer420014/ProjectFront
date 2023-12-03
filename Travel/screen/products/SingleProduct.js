import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Left, Right, Container, H1} from 'native-base';
// import Toast from 'react-native-toast-message';
// import EasyButton from '../../Shared/StyledComponents/EasyButton'
// import TrafficLight from '../../Shared/StyledComponents/TrafficLight'

import TestApi from '../../Shared/TopTapProduct';

//redux
import {connect} from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

// libary
import tailwind from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopTapProduct from '../../Shared/TopTapProduct';
import AuthGlobal from '../../context/store/AuthGlobal';

const SingleProduct = props => {
  const item = props.route.params.item;
  const context = useContext(AuthGlobal);

  const navigation = useNavigation();

  // console.log(
  //   'this is',
  //   JSON.stringify(context.stateUser.isAuthenticated, null, 2),
  // );

  return (
    <View style={[tailwind`flex-1`]}>
      {/* header */}
      <Image
        style={{width: 'auto', height: hp(55), resizeMode: 'stretch'}}
        source={{
          uri: item.image
            ? item.image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />

      <SafeAreaView
        style={tailwind`flex-row 
                    justify-between 
                    items-center 
                    w-full 
                    absolute
                    `}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            tailwind`p-2 rounded-full m-4`,
            {backgroundColor: '#f47a7e'},
          ]}>
          <AntDesign name="arrowleft" color={'white'} size={wp(5)} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* content */}
      <View
        style={[
          tailwind`px-5 flex 
                    flex-1 
                    justify-between 
                    bg-white 
                    pt-8
                    -mt-14`,
          {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        ]}>
        <View showsVerticalScrollIndicator={false} style={tailwind`space-y-5`}>
          <View
            style={tailwind`flex-row justify-between items-start align-center `}>
            <Text
              style={[
                `
                         flex-1 
                         text-neutral-700`,
                {fontSize: wp(7), color: 'black', fontWeight: 'bold'},
              ]}>
              {item.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                tailwind`pt-1 mb-5 pr-2`,
                {fontSize: wp(5), color: 'gray'},
              ]}>
              <AntDesign name="star" color={'#f36d72'} size={wp(5)} />{' '}
              {item.rating}{' '}
            </Text>
            <Text
              style={[tailwind`pt-1 mb-5`, {fontSize: wp(5), color: 'gray'}]}>
              <FontAwesome name="map-marker" color={'#f36d72'} size={wp(5)} />{' '}
              {item.location}
            </Text>
          </View>

                {context.stateUser.isAuthenticated ? (
            <TouchableOpacity
            onPress={() => props.navigation.navigate('Check In', {item: item})}>
            <View style={styles.checkout}>
              {/* <FontAwesome name="flag-checkered" color={'white'} size={wp(5)} /> */}
              <Text style={{color: 'white', fontSize: wp(4)}}>Check In</Text>
            </View>
          </TouchableOpacity>
          ) : null}
          
        </View>

        <TopTapProduct {...item} />
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product =>
      dispatch(actions.addToCart({quantity: 1, product})),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 380,
    resizeMode: 'stretch',
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkout: {
    backgroundColor: '#f47a7e',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 999,
    top: -50,
    right: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
});
