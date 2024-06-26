/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions ,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Item, Picker } from 'native-base'
import Input from '../../Shared/Form/InputFormProduct'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import Toast from 'react-native-toast-message'
import Error from '../../Shared/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from '../../assests/common/baseUrl'
import axios from 'axios'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import mime from "mime";

import data from '../../data/from.json'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

var { width } = Dimensions.get('window');
const ProductForm = (props) => {

  const [pickerValue, setPickerValue] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [rating, setRating] = useState()
  const [category, setCategory] = useState()
  const [categories, setCategories] = useState([])
  const [mainImage, setMainImage] = useState()
  const [image, setImage] = useState()
  const [provine, setprovine] = useState()
  const [location, setLocation] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [err, setErr] = useState()
  const [token, setToken] = useState()
  const [item, setItem] = useState();


  useEffect(() => {

    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setName(props.route.params.item.name);
      setDescription(props.route.params.item.description);
      setLocation(props.route.params.item.location);
      setLatitude(props.route.params.item.latitude);
      setLongitude(props.route.params.item.longitude);
      setRating(props.route.params.item.rating);
      setCategory(props.route.params.item.category._id);
      setprovine(props.route.params.item.provine);
    }

    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res)
      })
      .catch((err) => console.log('cant get token'))

    axios
      .get(`${baseURL}category`)
      .then((res) => setCategories(res.data))
      .catch((err) => alert('error load category'))


    return () => {
      setCategories([])
      setprovine()
    }

  }, [])

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
        setMainImage(imageUri);
        setImage(imageUri)
      }
    });
  };

  const addProduct = () => {
    if (
      name == "" ||
      description == "" ||
      location == "" ||
      latitude == "" ||
      longitude == "" ||
      rating == "" ||
      provine == "" ||
      category == "" ||
      image == null
    ) {
      setErr('มีบางช่องยังว่างอยู่ !!')
    }else{
      let formData = new FormData();

      const newImageUri = "file:///" + image.split("file:/").join("");

      formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
      });
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("rating", rating);
      formData.append("category", category);
      formData.append("provine", provine);

      const config = {
        Headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
      if (item !== null) {
        axios
          .put(`${baseURL}products/${props.route.params.item.id}`, formData, config)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Product successfuly updated",
                text2: ""
              });
              setTimeout(() => {
                props.navigation.navigate("Products");
              }, 500)
            }
          })
          .catch((error) => {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Updated error",
              text2: "Please try again"
            })
          })
      } else {
        axios
          .post(`${baseURL}products`, formData, config)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "New Product added",
                text2: ""
              });
              setTimeout(() => {
                props.navigation.navigate("Products");
              }, 500)
            }
          })
          .catch((error) => {
            console.log('error create',error)
            // Toast.show({
            //   topOffset: 60,
            //   type: "error",
            //   text1: "Add product error",
            //   text2: "Please try again"
            // })
          })
      } 

    }

    


    
  }

  



  // console.log(props.route.params.item.image)



  return (
    <ScrollView>
      <View style={styles.viewContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={openImagePicker} style={styles.imagePicker}>
          {/* <Text style={{ color:'#f36d72'}}>IMAGE</Text> */}
          <FontAwesome name='camera' color='white' />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Name</Text>
      </View>
        <Input
        placeholder="ชื่อ"
        name="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Description</Text>
      </View>
        <Input
        placeholder="รายละเอียดสถานที่"
        name="description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Location</Text>
      </View>
        <Input
        placeholder="อำเภอ จังหวัด"
        name="location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      {/*  */}
      {/* lati & longti */}
      {/*  */}
      <View style={{ flexDirection: "row", marginLeft: 26 }}>

        <View style={[styles.inputContainer]}>
          <View style={[styles.label, { marginLeft: 5 }]}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Latitude</Text>
          </View>
            <Input
            placeholder="ละติจูติ"
            name="latitude"
            value={latitude}
            keyboardType={"numeric"}
            onChangeText={(text) => setLatitude(text)}
          />
        </View>

        <View style={[styles.inputContainer,]}>
          <View style={[styles.label, { marginLeft: 10 }]}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Longitude</Text>
          </View>
            <Input
            placeholder="ลองจิจูด"
            name="longitude"
            value={longitude}
            keyboardType={"numeric"}
            onChangeText={(text) => setLongitude(text)}
          />
        </View>

      </View>



      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Rating</Text>
      </View>
        <Input
        placeholder="คะแนน สถานที่"
        name="rating"
        value={rating}
        keyboardType={"numeric"}
        onChangeText={(text) => setRating(text)}
      />


      {/*  */}
      {/* cat & provine */}
      {/*  */}
      <View style={{ flexDirection: 'row' }}>
        <View>
          <View style={[styles.label, { marginBottom: 10 }]}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Category</Text>
          </View>
          <Item picker style={styles.pickerContainer}>
            <Picker
                mode="dropdown"
              style={{ width: undefined,color:'black' }}
              placeholder="Select your Category"
              selectedValue={pickerValue}
              placeholderStyle={{ color: "#007aff" }}
              placeholderIconColor="#007aff"
              onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
            >
              {categories.map((c) => {
                return <Picker.Item key={c.id} label={c.name} value={c.id} />
              })}
            </Picker>
          </Item>
        </View>

        <View>
          <View style={[styles.label, { marginBottom: 10 }]}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Provine</Text>
          </View>
          <Item picker style={styles.pickerContainer}>
            <Picker
              mode='dropdown'
              style={{ width: undefined ,color:'black'}}
              selectedValue={provine}
              placeholderStyle={{ color: "#007aff" }}
              placeholderIconColor="#007aff"
              onValueChange={(e) => [setprovine(e)]}
            >
                {data.RECORDS.slice(1).map((c) => {
                return <Picker.Item key={c.id} label={c.name_th} value={c.name_th} />
              })}
            </Picker>
          </Item>
        </View>
      </View>

      {err ? <Error message={err} /> : null}

      <View style={styles.buttonContainer}>
        <EasyButton
          large
          main
         onPress={() => addProduct()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>


    </View>
    </ScrollView>
  )
}

export default ProductForm

const styles = StyleSheet.create({
  viewContainer:{
    paddingBottom: 400,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop:20,
  },

  container:{
    marginBottom: 400,
    // width: width,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  label: {
    width: "80%",
    marginTop: 10,
    left:10
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: {
    color: "white"
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#dfdfdf",
    elevation: 10
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor:'white'
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "#f47a7e",
    padding: 8,
    borderRadius: 100,
    elevation: 20
  },
  pickerContainer: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 5,
    borderColor: "#dfdfdf",
  },

  inputContainer: {
    width: 200,
    borderRadius: 20,
    marginHorizontal: -17,
  },
})