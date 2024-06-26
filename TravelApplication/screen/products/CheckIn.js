import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Input from '../../Shared/Form/Input';

// noti
import Toast from 'react-native-toast-message';

// api
import baseURL from '../../assests/common/baseUrl';
import axios from 'axios';

// image
import mime from 'mime';

//user
import AuthGlobal from '../../context/store/AuthGlobal';

const CheckIn = props => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);
  const userId = context.stateUser.user.userId;
  const productId = props.route.params.item.id;
  const [image, setImage] = useState();
  const [desc, setDesc] = useState();
  const [provine, setProvine] = useState();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [selectedDate, setSelectedDate] = useState('01-01-2023');

  // function Form Birth
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  console.log('productid', JSON.stringify(productId, null, 2));

  const hideCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    hideCalendar();
  };
  const showCalendar = () => {
    setCalendarVisible(true);
  };

  // console.log('this is', JSON.stringify(props.route.params.item, null, 2));

  useEffect(() => {
    const {provine, name, location} = props.route.params.item;
    setLocation(location);
    setName(name);
    setProvine(provine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 4000,
      maxWidth: 4000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
      }
    });
  };

  const handleConfirm = () => {
    if (!image) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please select image',
        text2: 'try again',
      });
    } else if (!desc) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please text in description',
        text2: 'try again',
      });
    } else {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('productId', productId);
      formData.append('image', image);
      formData.append('desc', desc);
      formData.append('date', selectedDate);
      formData.append('productName', name);
      formData.append('province', provine);
      // formData.append('location', location);

      const newImageUri = 'file:///' + image.split('file:/').join('');

      formData.append('image', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      });

      // console.log(JSON.stringify(formData,null,2))
      console.log(formData);

      axios
        .post(`${baseURL}check-in`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.status === 200) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Check in Succeeded',
              text2: 'check your profile',
            });
            setTimeout(() => {
              navigation.goBack();
            }, 500);
          }
        })
        .catch(err => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: image}} />
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.imagePicker}>
            {/* <Text style={{ color:'#f36d72'}}>IMAGE</Text> */}
            <FontAwesome name="camera" color="white" size={15} />
          </TouchableOpacity>
        </View>

        {/* fname */}
        <View style={[styles.input, {marginTop: 5}]}>
          <Text
            style={{
              color: 'black',
              position: 'relative',
              fontWeight: 'bold',
              left: -127,
              fontSize: 15,
            }}>
            Description
          </Text>
          <TextInput
            placeholder={'แสดงความคิดเห็นของคุณ'}
            name={'description'}
            id={'description'}
            placeholderTextColor={'black'}
            onChangeText={text => setDesc(text)}
            onSubmitEditing={() => handleConfirm()}
            returnKeyType="next"
            style={styles.inputform}
          />
        </View>

        <View style={styles.input}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              position: 'relative',
              left: -145,
              marginBottom: 10,
            }}>
            Date
          </Text>
          <TouchableOpacity onPress={showCalendar}>
            <View style={styles.inputCalendar}>
              <Text style={styles.selectedDate}>{selectedDate}</Text>
              <Modal
                isVisible={isCalendarVisible}
                onBackdropPress={hideCalendar}>
                <View style={styles.modalContent}>
                  <Calendar
                    onDayPress={handleDayPress}
                    theme={{
                      selectedDayBackgroundColor: 'blue',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: 'red',
                      arrowColor: '#f36d72',
                      // ... คุณสามารถเพิ่มการกำหนดค่าอื่นๆ สำหรับ theme ที่นี่
                    }}
                    markedDates={{
                      [selectedDate]: {
                        selected: true,
                        selectedColor: '#f36d72',
                      },
                    }}
                  />
                </View>
              </Modal>
            </View>
          </TouchableOpacity>
        </View>

        {/* name */}
        <View style={styles.formDetail}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Name
          </Text>
          <View style={styles.detailValue}>
            <Text style={styles.textValue}>{name}</Text>
          </View>
        </View>

        {/* Province */}
        <View style={styles.formDetail}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Province
          </Text>
          <View style={styles.detailValue}>
            <Text style={styles.textValue}>{provine}</Text>
          </View>
        </View>

        {/* Location */}
        {/* <View style={styles.formDetail}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Location
          </Text>
          <View style={styles.detailValue}>
            <Text style={styles.textValue}>{location}</Text>
          </View>
        </View> */}

        <TouchableOpacity onPress={() => handleConfirm()}>
          <View style={styles.btnLogin}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Confirm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  //   image selected
  imageContainer: {
    width: 150,
    height: 150,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#dfdfdf',
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: 'white',
  },
  imagePicker: {
    position: 'absolute',
    right: 3,
    bottom: 5,
    backgroundColor: '#f47a7e',
    padding: 8,
    borderRadius: 100,
  },
  //calendar
  inputCalendar: {
    width: 330,
    borderWidth: 2,
    borderColor: '#dfdfdf',
    borderRadius: 10,
    paddingLeft: 10,
  },
  iconCalendar: {
    position: 'absolute',
    left: 58,
    bottom: 17,
  },
  selectButton: {
    borderRadius: 10,
  },
  selectedDate: {
    paddingHorizontal: 10,
    paddingTop: 15,
    height: 50,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',

    color: '#000000',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  //   input
  input: {
    width: '100%',
    alignItems: 'center',
  },
  inputform: {
    width: '80%',
    height: 60,
    backgroundColor: '#ffff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: '#dfdfdf',
    color: 'black',
  },
  //   formDetail
  formDetail: {
    width: 330,
    marginBottom: 10,
  },

  detailValue: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#dfdfdf',
  },
  textValue: {
    color: 'black',
    fontSize: 17,
  },
  //   btn
  btnLogin: {
    backgroundColor: '#f36d72',
    width: 330,
    height: 44,
    padding: 10,
    alignItems: 'center', // center x
    justifyContent: 'center', //center y
    borderRadius: 10,
    marginTop: 10,
  },
});
