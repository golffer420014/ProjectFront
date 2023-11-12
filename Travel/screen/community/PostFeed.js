import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Item, Picker } from 'native-base'

import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime'

// noti
import Toast from 'react-native-toast-message';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

//province json
import allProvince from '../../data/from.json'
import { useNavigation } from '@react-navigation/native';

const PostFeed = (props) => {
  const [token, setToken] = useState()
  const [id, setId] = useState()
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [image, setImage] = useState();
  const [imagePost, setImagePost] = useState();
  const [province, setProvince] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [desc, setDesc] = useState()

  const navigate = useNavigation()

  console.log('edit', JSON.stringify(desc, null, 2))

  useEffect(() => {
    if (props.route.params?.item) {
      AsyncStorage.getItem('jwt')
        .then(res => setToken(res))
      setFname(props.route.params.item.userId.fname);
      setLname(props.route.params.item.userId.lname);
      setImage(props.route.params.item.userId.image);
      setDesc(props.route.params.item.desc)
      setProvince(props.route.params.item.province)
      setImagePost(props.route.params.item.image)
      setId(props.route.params.item.id);
    } else {
      AsyncStorage.getItem('jwt')
        .then(res => setToken(res))
      const { fname, lname, image, id } = props.route.params.userProfile;
      setFname(fname);
      setLname(lname);
      setImage(image);
      setId(id);
    }
  }, [props.route.params?.userProfile, props.route.params?.item]);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 4000,
      maxWidth: 4000,
    };


    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImagePost(imageUri)

      }
    });
  };
  const PostBtn = async () => {

    if ((imagePost == null || imagePost === '') && (desc == null || desc === '')) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please fill form or image",
        text2: "Please try again",
      });
    } else if (props.route.params.item) {
      const formData = new FormData();

      formData.append("userId", id);
      formData.append("desc", desc || '');
      formData.append("province", province || '');


      if (imagePost) {
        const newImageUri = "file:///" + imagePost.split("file:/").join("");

        formData.append("image", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop()
        } || imagePost);
      }
 



      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }

      await axios
        .put(`${baseURL}community/${props.route.params.item.id}`, formData, config)

        .then((res) => {
          if (res.status === 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Updated Succeeded",
              text2: "Please Login into your account",
            });
            setTimeout(() => {
              navigate.goBack()
            }, 500)
          }
        })
        .catch((err) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        })
    } else {
      const formData = new FormData();

      formData.append("userId", id);
      formData.append("desc", desc || '');
      formData.append("province", province || '');


      if (imagePost) {
        const newImageUri = "file:///" + imagePost.split("file:/").join("");

        formData.append("image", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop()
        });
      }
      // let post = {
      //   userId: id,
      //   image: imagePost,
      //   desc: desc,
      //   province: province
      // }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }

      await axios
        .post(`${baseURL}community`, formData, config)

        .then((res) => {
          if (res.status === 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Post Succeeded",
              text2: "Please Login into your account",
            });
            setTimeout(() => {
              navigate.goBack()
            }, 500)
          }
        })
        .catch((err) => {
          console.log(err)
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        })
    }


  }


  return (
    <ScrollView style={{ backgroundColor: "white", }}>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView>
            <View style={styles.modalView}>
              <TouchableHighlight
                underlayColor="#E8E8E8"
                onPress={() => {
                  setModalVisible(false)
                }}
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  top: 10,
                  right: 15,
                }}
              >
                <FontAwesome name='close' color='#f47a7e' size={20} />
              </TouchableHighlight>
              {allProvince.RECORDS.map((item, index) => (
                index !== 0 ?
                  <TouchableOpacity key={index} onPress={() => {
                    setProvince(item.name_th);
                    setModalVisible(false);
                  }}>
                    <View style={styles.boxProvince}>
                      <Text style={styles.textStyle}>{item.name_th}</Text>
                    </View>
                  </TouchableOpacity>
                  : null
              ))}

            </View>
          </ScrollView>
        </View>

      </Modal>

      <View style={styles.containerWrapper}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Image
              source={{ uri: image }}
              style={styles.imageProfile}
            />
            <View style={{ width: 10 }}></View>
            <View>
              <Text style={{ color: 'black' }}>{fname + ' ' + lname}</Text>
              <Text style={{ color: 'black' }}>{province ? province : ''}</Text>
            </View>
            <TouchableOpacity onPress={() => PostBtn()} style={styles.postBtn}>
              <AntDesign name='sharealt' color='white' size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.desc}>
            <TextInput
              style={styles.inputDesc}
              placeholder="คุณคิดอะไรอยู่"
              multiline={true}
              numberOfLines={4} // You can set the number of lines according to your need
              textAlignVertical="top"
              textAlign="left"
              value={desc} // Bind the TextInput value to the state
              onChangeText={(text) => setDesc(text)} // Update the state on text change
            />
          </View>

        </View>
        <LinearGradient
          colors={['#ff9a9e', '#fcb69f']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
          start={{ x: 0, y: 0 }} // จุดเริ่มต้น (บนซ้าย)
          end={{ x: 1, y: 0 }} // จุดสิ้นสุด (บนขวา)
          style={styles.pickerContainer}
        >


          <TouchableOpacity onPress={openImagePicker} style={styles.imagePicker}>
            <FontAwesome name='camera' color='#f47a7e' size={15} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.imagePicker}>
            <Entypo name='location' color='#f47a7e' size={15} />
          </TouchableOpacity>
        </LinearGradient>

        {imagePost ? (
          <View>
            <TouchableOpacity onPress={() => setImagePost(null)} style={[styles.postBtn, { zIndex: 1 }]}>
              <AntDesign name='close' color='white' size={20} />
            </TouchableOpacity>
            <Image
              source={{ uri: imagePost ? imagePost : '' }}
              style={styles.imagePost}
            />
          </View>
        ) :
          null
        }
      </View>

    </ScrollView>
  )
}
export default PostFeed



const styles = StyleSheet.create({
  containerWrapper: {
    borderWidth: 3,
    borderStyle: 'dashed',
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: '#fcb69f',
    borderRadius: 20,
    paddingBottom: 110
  },
  container: {
    width: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageProfile: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  header: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  postBtn: {
    position: 'absolute',
    backgroundColor: '#ff886a',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 10,
    top: 10,
    right: 10
  },
  desc: {
    width: '100%',
  },
  inputDesc: {
    height: 100,
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#fcb69f',
  },
  pickerContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row'
  },
  imagePicker: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    marginRight: 5
  },
  imagePost: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  },
  textStyle: {
    color: "black",
    fontSize: 15,
    paddingVertical: 5,
  },
  boxProvince: {
    width: 260,
    justifyContent: 'center',
    borderWidth: 3,
    marginVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#dfdfdf'
  },
})