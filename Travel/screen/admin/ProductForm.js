import { StyleSheet, Text, View, Image , TouchableOpacity ,Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Item , Picker } from 'native-base'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import Toast from 'react-native-toast-message'
import Error from '../../Shared/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from '../../assests/common/baseUrl'
import axios from 'axios'

import data from '../../data/from.json'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const ProductForm = (props) => {

  const [pickerValue,setPickerValue] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [rating, setRating] = useState()
  const [category, setCategory] = useState()
  const [categories, setCategories] = useState([])
  const [mainImage, setMainImage] = useState()
  const [image, setImage] = useState()
  const [province, setProvince] = useState()
  const [location, setLocation] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [err, setErr] = useState()
  const [token, setToken] = useState()
  const [isFeatured, setIsFeatured] = useState(false)

  useEffect(()=>{
    axios
    .get(`${baseURL}category`)
    .then((res) =>setCategories(res.data))
    .catch((err) => alert('error load category'))


    return() => {
      setCategories([])
      setProvince()
    }

  },[])

  // console.log(province)
  // console.log(category)

  return (
    <FormContainer title="Add Product">
      <Image source={{uri:mainImage}}/>
      <TouchableOpacity>
        <Text>IMAGE</Text>
      </TouchableOpacity>
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Name</Text>
      </View>
      <Input
        placeholder="ชื่อ"
        name="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Description</Text>
      </View>
      <Input
        placeholder="รายละเอียดสถานที่"
        name="description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Location</Text>
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
      <View style={{flexDirection:"row" , marginLeft:26 }}>

        <View style={[styles.inputContainer ]}>
          <View style={[styles.label,{marginLeft:5}]}>
            <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Latitude</Text>
          </View>
          <Input
            placeholder="ละติจูติ"
            name="latitude"
            value={latitude}
            onChangeText={(text) => setLatitude(text)}
          />
        </View>

        <View style={[styles.inputContainer,]}>
          <View style={[styles.label, { marginLeft: 10 }]}>
            <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Longitude</Text>
          </View>
          <Input
            placeholder="ลองจิจูด"
            name="longitude"
            value={longitude}
            onChangeText={(text) => setLongitude(text)}
          />
        </View>

      </View>



      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Rating</Text>
      </View>
      <Input
        placeholder="คะแนน สถานที่"
        name="rating"
        value={rating}
        keyboardType={"numeric"}
        onChangeText={(text) => setRating(text)}
      />


        {/*  */}
        {/* cat & province */}
        {/*  */}
        <View style={{flexDirection:'row'}}>
        <View>
          <View style={[styles.label, { marginBottom: 10 }]}>
            <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Category</Text>
          </View>
          <Item picker style={styles.pickerContainer}>
            <Picker
              mode="dialog"
              style={{ width: undefined }}
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
            <Text style={{ fontWeight: 'bold', color: '#f36d72' }}>Province</Text>
          </View>
          <Item picker style={styles.pickerContainer}>
            <Picker
              mode='dialog'
              style={{ width: undefined }}
              selectedValue={province}
              placeholderStyle={{ color: "#007aff" }}
              placeholderIconColor="#007aff"
              onValueChange={(e) => [setProvince(e)]}
            >
              {data.RECORDS.map((c) => {
                return <Picker.Item key={c.id} label={c.name_th} value={c.name_th} />
              })}
            </Picker>
          </Item>
        </View>
        </View>
        


      <View>
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>
    </FormContainer>
  )
}

export default ProductForm

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10
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
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20
  },
  pickerContainer:{
    width:160,
    backgroundColor:'white',
    borderRadius:20,
    marginLeft:5
  },

  inputContainer: {
    width: 200,
    borderRadius: 20,
    marginHorizontal:-17
  },
})