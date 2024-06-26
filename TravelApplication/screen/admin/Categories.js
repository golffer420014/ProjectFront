import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
  FlatList,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import axios from "axios"
import baseURL from "../../assests/common/baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import mime from 'mime'
import Toast from 'react-native-toast-message';
// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

var { width } = Dimensions.get("window")

const Item = (props) => {

  return (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: props.item.icon}}
          style={{width: 100, height: 80, borderRadius: 10}}
          resizeMode="stretch"
        />
        <Text style={{color: 'black', fontSize: 18, marginLeft: 10}}>
          {''}
        </Text>
        <Text style={{color: 'black', fontSize: 18, marginLeft: 10}}>
          {props.item.name}
        </Text>
      </View>

      <EasyButton
        large
        style={{backgroundColor: 'red', borderRadius: 10}}
        onPress={() => props.delete(props.item._id)}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
      </EasyButton>
    </View>
  );
}

const Categories = (props) => {

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [categoryNameType, setCategoryNameType] = useState("ประเภท");
  const [token, setToken] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const nameType = [{name: 'Search'}];


  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}category`)
      .then((res) => {
        setCategories(res.data);
        // console.log(JSON.stringify(res.data,null,2))
      })
      .catch((error) => alert("Error to load categories"))

    return () => {
      setCategories();
      setToken();
    }
  }, [])

  const addCategory = () => {
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('type', categoryNameType);

    if (selectedImage) {
      const newImageUri = "file:///" + selectedImage.split("file:/").join("");

      formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
      });
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    axios
      .post(`${baseURL}category`, formData, config)
      .then((res) => {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Create Category Success",
          text2: ""
        });
        setCategories([...categories, res.data])
        setSelectedImage()
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Can't Create Cantegory",
          text2: ""
        });
        console.log(error)
      });

    setCategoryName("");
  }

  const deleteCategory = (id) => {
    // console.log(id)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios
      .delete(`${baseURL}category/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error delete categories"));
  }

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };


  return (
    <View style={{position: 'relative', height: '100%'}}>
      {/* modal content */}
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

              {nameType.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setCategoryNameType(item.name);
                    setModalVisible(false);
                  }}>
                  <View style={styles.boxProvince}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>

      <View style={{marginBottom: 60}}>
        <FlatList
          data={categories}
          renderItem={({item, index}) => (
            <Item
              item={item}
              index={index}
              delete={() => deleteCategory(item.id)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={openImagePicker}>
          <View style={{padding: 7, borderRadius: 60}}>
            {selectedImage ? (
              <Image
                style={{width: 50, height: 50, borderRadius: 10}}
                source={{
                  uri: selectedImage,
                }}
              />
            ) : (
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#f36d72',
                  borderRadius: 60,
                }}>
                <FontAwesome6 name="images" size={20} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={{width: width / 4, borderWidth: 1, borderRadius: 10}}>
          <TextInput
            placeholder="ชื่อหมวดหมู่"
            value={categoryName}
            style={[
              styles.input,
              {paddingHorizontal: 10, color: 'black', fontSize: 20},
            ]}
            onChangeText={text => setCategoryName(text)}
            fontSize={15}
            placeholderTextColor={'black'}
          />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={{width: width / 4, borderWidth: 1, borderRadius: 10}}>
            <View
              style={[styles.input, {paddingHorizontal: 5, color: 'black'}]}>
              <Text style={{color: 'black', fontSize: 15}}>
                {categoryNameType}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <EasyButton
            medium
            style={{backgroundColor: '#f36d72', borderRadius: 10}}
            onPress={() => addCategory()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
}

export default Categories

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#f5f5f5',
    width: width,
    height: 80,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 10,
  },
  input: {
    height: 40,
    // borderColor: "red",
    // borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#ffff',
    alignItems:'center',
    justifyContent:'center'
  },
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
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
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#dfdfdf',
    padding: 5,
  },
  boxDate: {
    borderWidth: 2,
    width: 160,
    height: 45,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});