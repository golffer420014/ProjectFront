import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, Modal, ScrollView, TouchableOpacity,TextInput } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'
import { Image } from 'react-native'

//icon
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

//auth
import AuthGlobal from '../../context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage'

//shared
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import Toast from 'react-native-toast-message';


const Feed = (props) => {
  const context = useContext(AuthGlobal);

  const [dataFeed, setDataFeed] = useState([]);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [user, setUser] = useState();

  console.log(user)

  // console.log(JSON.stringify(user.fname,null,2))

  const fetchPosts = () => {
    axios
      .get(`${baseURL}community`)
      .then(res => {
        const reversedData = [...res.data].reverse();
        setDataFeed(reversedData);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
      if (context.stateUser.user.userId) {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`)
          .then(res => {
            setUser(res.data);
          })
          .catch(error => console.log(error));
      }

      return () => {
        setLoading(true);
        setDataFeed([]);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const postCommu = () => {
    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`, {
            headers: {Authorization: `Bearer ${res}`},
          })
          .then(user => {
            props.navigation.navigate('New Post', {
              userProfile: user.data,
              token: res,
            });
          });
      })
      .catch(error => console.log(error));
  };

  const deletePost = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}community/${selectedPostId}`, config)

      .then(res => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Delete Succeeded',
            text2: 'Please Login into your account',
          });
          fetchPosts();
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
  };

  const likePost = postId => {
    const userid = context.stateUser.user.userId;

    // ค้นหาโพสต์ที่ต้องการ 'like' หรือ 'dislike'
    const post = dataFeed.find(post => post.id === postId);

    // ตรวจสอบว่าโพสต์ถูก 'like' โดยผู้ใช้ปัจจุบันหรือไม่
    const isLiked = post.likes.includes(userid);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      likes: userid,
    };

    // ถ้าโพสต์ยังไม่ถูก 'like', ส่งคำขอ 'like'
    if (!isLiked) {
      axios
        .put(`${baseURL}community/likePost/${postId}`, body, config)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            // อัปเดต dataFeed ด้วยข้อมูลใหม่
            setDataFeed(
              dataFeed.map(item =>
                item.id === postId
                  ? {...item, likes: [...item.likes, userid]}
                  : item,
              ),
            );
          }
        })
        .catch(error => {
          console.log('Error liking post: ', error.response?.data);
        });
    } else {
      // ถ้าโพสต์ถูก 'like' แล้ว, ส่งคำขอ 'dislike'
      axios
        .put(`${baseURL}community/DislikePost/${postId}`, body, config)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            // อัปเดต dataFeed โดยลบ userId ออกจาก array ของ likes
            setDataFeed(
              dataFeed.map(item =>
                item.id === postId
                  ? {...item, likes: item.likes.filter(id => id !== userid)}
                  : item,
              ),
            );
          }
        })
        .catch(error => {
          console.log('Error disliking post: ', error.response?.data);
        });
    }
  };

  if (loading == true) {
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
  // console.log(JSON.stringify(dataFeed.image,null,2));

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 18,
          paddingBottom:5,
          backgroundColor: '#dfdfdf',
          width: '100%',
        }}>
        {context.stateUser.isAuthenticated == true ? (
          <TouchableOpacity onPress={() => postCommu()}>
            <View
              style={{
                backgroundColor: '#ffff',
                padding: 10,
                borderRadius: 30,
                top: -7,
                width: 370,
                alignItems: 'center',
                // borderWidth:3,
                // borderColor:'#dfdfdf',
              }}>
              <Text style={{color: 'black', fontSize: 15,fontWeight:'bold'}}>คุณคิดอะไรอยู่</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView style={{height: null}}>
        {dataFeed.map((item, index) => {
          return (
            <View style={styles.itemWrapper}>
              <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.userId.image}}
                    style={{width: 35, height: 35, borderRadius: 50, top: -9}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.itemName}>
                      {item.userId.fname} {item.userId.lname}
                    </Text>
                  </View>
                </View>
                {context.stateUser.user.userId != item.userId.id ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPostId(item.id); // ตั้งค่า id ของโพสต์ที่เลือก
                      setModalVisible(true); // แสดง modal
                    }}>
                    <View style={{top: -10}}>
                      <Entypo
                        name="dots-three-horizontal"
                        size={20}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{paddingHorizontal: 10, top: -15}}>
                {!context.stateUser.isAuthenticated ? (
                  <View>
                    {item.image !== '' && (
                      <Image
                        source={{uri: item.image}}
                        style={{height: 300, width: '100%', borderRadius: 10}}
                        resizeMode="stretch"
                      />
                    )}
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => likePost(item.id)}>
                    {item.image !== '' && (
                      <Image
                        source={{uri: item.image}}
                        style={{height: 300, width: '100%', borderRadius: 10}}
                        resizeMode="cover"
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.descWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.like}>
                    <TouchableOpacity onPress={() => likePost(item.id)}>
                      <FontAwesome
                        name={
                          item.likes.includes(context.stateUser.user.userId)
                            ? 'heart'
                            : 'heart-o'
                        }
                        size={20}
                        color={
                          item.likes.includes(context.stateUser.user.userId)
                            ? 'red'
                            : 'black'
                        }
                      />
                    </TouchableOpacity>
                    {item.likes && item.likes.length > 0 && (
                      <Text style={{color: 'black', fontSize: 17}}>
                        {item.likes.length}
                      </Text>
                    )}
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <FontAwesome name="map-marker" size={20} color="black" />
                    <Text style={[styles.itemName]}>{'  '}</Text>
                    <Text style={[styles.itemName]}>{item.province}</Text>
                  </View>
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={[styles.itemName]}>{item.desc}</Text>
                </View>
              </View>

              {/* modal */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableHighlight
                      underlayColor="#E8E8E8"
                      onPress={() => {
                        setModalVisible(false);
                      }}
                      style={{
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        top: 5,
                        right: 10,
                      }}>
                      <AntDesign name="close" size={20} />
                    </TouchableHighlight>
                    <EasyButton
                      medium
                      secondary
                      onPress={() => {
                        // กรองเฉพาะข้อมูลที่มี userId ตรงกับ userId ของ user จาก context
                        const filteredData = dataFeed.filter(
                          item => item.id === selectedPostId,
                        );

                        // เช็คว่ามีข้อมูลหลังจากกรองหรือไม่ ถ้ามีก็ส่ง item แรกที่ผ่านการกรอง
                        if (filteredData.length > 0) {
                          props.navigation.navigate('New Post', {
                            item: filteredData[0],
                          });
                        } else {
                          console.log('No matching data found');
                        }

                        // ปิด modal
                        setModalVisible(false);
                      }}>
                      <Text style={styles.textStyle}>Edit</Text>
                    </EasyButton>
                    <EasyButton
                      medium
                      danger
                      onPress={() => {
                        deletePost();
                        // ปิด modal
                        setModalVisible(false);
                      }}>
                      <Text style={styles.textStyle}>Delete</Text>
                    </EasyButton>
                  </View>
                </View>
              </Modal>
            </View>
          );
        })}
        {/* {dataFeed ? (
          <View>
            <Text style={{color:'black'}}>ff</Text>
          </View>
        ) : null} */}
      </ScrollView>
    </View>
  );
}

export default Feed

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 50,
  },
  itemWrapper: {
    borderRadius: 10,
    width: 370,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: '#dfdfdf',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    marginTop: 25,
  },
  itemName: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
  descWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 10,
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
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  Heading: {
    color: 'black',
    padding: 10,
    fontSize: 30,
    marginBottom: -10,
  },
  like: {
    flexDirection: 'row',
    width: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});