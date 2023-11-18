import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Modal,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import mime from 'mime';

//province json
import allProvince from '../../data/from.json';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
//
import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPost = props => {
  //   console.log(JSON.stringify(props.route.params.userProfile, null, 2));

  useFocusEffect(
    useCallback(() => {
      if (props.route.params?.item) {
        AsyncStorage.getItem('jwt').then(res => setToken(res));
        setUserID(props.route.params.item.userId.id);
        setFnameUser(props.route.params.item.userId.fname);
        setLnameUser(props.route.params.item.userId.lname);
        setUserImage(props.route.params.item.userId.image);
        setDesc(props.route.params.item.desc);
        setProvince(props.route.params.item.province);
        setImagePost(props.route.params.item.image);
        setIdPost(props.route.params.item.id);
      } else {
        setToken(props.route.params.token);
        setFnameUser(props.route.params.userProfile.fname);
        setUserID(props.route.params.userProfile.id);
        setLnameUser(props.route.params.userProfile.lname);
        setUserImage(props.route.params.userProfile.image);
      }

        return () => {
          setImagePost(null);
        };
    }, []
    ),
  );




  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [fnameUser, setFnameUser] = useState();
  const [lnameUser, setLnameUser] = useState();
  const [userImage, setUserImage] = useState();
  const [imagePost, setImagePost] = useState(null);
  const [desc, setDesc] = useState('');
  const [province, setProvince] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  //edit
  const [idPost, setIdPost] = useState();

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
        setImagePost(imageUri);
      }
    });
  };

  const PostBtn =  () => {
    if (imagePost != null || desc != null) {
      const formData = new FormData();

      formData.append('desc', desc);
      formData.append('province', province);
      formData.append('userId', userID);

      if (imagePost) {
        const newImageUri = 'file:///' + imagePost.split('file:/').join('');
        formData.append('image', {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split('/').pop(),
        });
      }

      console.log(formData);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

       axios
        .post(`${baseURL}community`, formData, config)

        .then(res => {
          if (res.status === 200) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'โพสสำเร็จ',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Feed');
            }, 500);
          }
        })
        .catch(err => {
          console.log(err);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });
    } else {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please fill in form',
        text2: 'Please try again',
      });
    }
  };

  const EditBtn = () => {
      const formData = new FormData();
      formData.append('userId', userID);
      formData.append('desc', desc);
      formData.append('province', province);

      if (imagePost) {
        // มีรูปภาพใหม่ให้ส่ง
        const newImageUri = 'file:///' + imagePost.split('file:/').join('');

        formData.append('image', {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split('/').pop(),
        });
      }

      // รหัสส่วนที่เหลือของการส่งคำขอ PUT อยู่ที่นี่
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .put(`${baseURL}community/${idPost}`, formData, config)
        .then(res => {
          if (res.status === 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'Updated Succeeded',
              text2: '',
            });
            setTimeout(() => {
              props.navigation.navigate('Feed');
            }, 500);
          }
        })
        .catch(err => {
          console.log(err);
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'เลือกนูปภาพอีกครั้ง',
            text2: 'Please try again',
          });
        });
  };

  return (
    <ScrollView style={{marginBottom: 20}}>
      <View style={styles.container}>
        {/* profile */}
        <View style={styles.profile}>
          <Image source={{uri: userImage}} style={styles.imageProfile} />
          <Text>{'  '}</Text>
          <Text style={styles.textStyle}>{fnameUser}</Text>
          <Text>{'  '}</Text>
          <Text style={styles.textStyle}>{lnameUser}</Text>
          <View style={styles.province}>
            <FontAwesome name="map-marker" size={20} color="#f47a7e" />
            <Text>{'  '}</Text>
            <Text style={styles.textStyle}>{province}</Text>
          </View>
        </View>

        {/* desc */}
        <View style={styles.desc}>
          <TextInput
            style={styles.inputDesc}
            placeholder="คุณคิดอะไรอยู่"
            multiline={true}
            numberOfLines={4} // You can set the number of lines according to your need
            textAlignVertical="top"
            textAlign="left"
            value={desc} // Bind the TextInput value to the state
            onChangeText={text => setDesc(text)} // Update the state on text change
          />
        </View>

        {/* Activity */}
        <LinearGradient
          colors={['#ff9a9e', '#fcb69f']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
          start={{x: 0, y: 0}} // จุดเริ่มต้น (บนซ้าย)
          end={{x: 1, y: 0}} // จุดสิ้นสุด (บนขวา)
          style={styles.pickerContainer}>
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.imagePicker}>
            <FontAwesome name="camera" color="#f47a7e" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.imagePicker}>
            <Entypo name="location" color="#f47a7e" size={20} />
          </TouchableOpacity>
        </LinearGradient>

        {/* image post */}
        {!imagePost ? null : (
          <View>
            <Image
              source={{uri: imagePost}}
              style={{
                width: 370,
                height: 250,
                borderRadius: 10,
                marginBottom: 5,
              }}
              resizeMode="cover"
            />
          </View>
        )}

        {/* btn Post */}
        {/*  */}
        {!props.route.params.item ? (
          <TouchableOpacity onPress={() => PostBtn()}>
            <View style={styles.btnLogin}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Confirm
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => EditBtn()}>
            <View style={styles.btnLogin}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Modal Province */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <ScrollView>
              <View style={styles.modalView}>
                <TouchableHighlight
                  underlayColor="#E8E8E8"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    top: 10,
                    right: 15,
                  }}>
                  <FontAwesome name="close" color="#f47a7e" size={20} />
                </TouchableHighlight>
                {allProvince.RECORDS.map((item, index) =>
                  index !== 0 ? (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setProvince(item.name_th);
                        setModalVisible(false);
                      }}>
                      <View style={styles.boxProvince}>
                        <Text style={styles.textStyle}>{item.name_th}</Text>
                      </View>
                    </TouchableOpacity>
                  ) : null,
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profile: {
    padding: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fcb69f',
    borderRadius: 10,
  },
  imageProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
  province: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    width: '90%',
  },
  imagePicker: {
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 50,
    marginRight: 5,
  },
  //   modal
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
  },
  boxProvince: {
    width: 260,
    justifyContent: 'center',
    borderWidth: 3,
    marginVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#dfdfdf',
  },
  //   desc
  desc: {
    width: '90%',
    marginTop: 5,
  },
  inputDesc: {
    height: 100,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    // borderColor: '#dfdfdf',
    borderColor: '#fcb69f',
    fontSize: 20,
  },
  // btn
  btnLogin: {
    backgroundColor: '#fea39e',
    width: 150,
    height: 44,
    padding: 10,
    alignItems: 'center', // center x
    justifyContent: 'center', //center y
    borderRadius: 10,
    marginTop: 10,
  },
});
