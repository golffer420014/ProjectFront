import { StyleSheet, Text, View, Image , TouchableOpacity ,Platform} from 'react-native'
import React, { useState } from 'react'
import { Item , Picker } from 'native-base'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import Toast from 'react-native-toast-message'
import Error from '../../Shared/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from '../../assests/common/baseUrl'
import axios from 'axios'

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
  const [provine, setProvine] = useState()
  const [location, setLocation] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [err, setErr] = useState()
  const [token, setToken] = useState()
  const [isFeatured, setIsFeatured] = useState(false)

  return (
    <FormContainer title="Add Product">
      <Image source={{uri:mainImage}}/>
      <TouchableOpacity>
        <Text>IMAGE</Text>
      </TouchableOpacity>
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Name</Text>
      </View>
      <Input
        placeholder="name"
        name="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Description</Text>
      </View>
      <Input
        placeholder="description"
        name="description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Location</Text>
      </View>
      <Input
        placeholder="location"
        name="location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Latitude</Text>
      </View>
      <Input
        placeholder="latitude"
        name="latitude"
        value={latitude}
        onChangeText={(text) => setLatitude(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Longitude</Text>
      </View>
      <Input
        placeholder="longitude"
        name="longitude"
        value={longitude}
        onChangeText={(text) => setLongitude(text)}
      />
      
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Provine</Text>
      </View>
      <Input
        placeholder="provine"
        name="provine"
        value={provine}
        onChangeText={(text) => setProvine(text)}
      />
      <View style={styles.label}>
        <Text style={{ fontWeight: 'bold', color: 'black' }}>Rating</Text>
      </View>
      <Input
        placeholder="rating"
        name="rating"
        value={rating}
        keyboardType={"numeric"}
        onChangeText={(text) => setRating(text)}
      />
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
  }
})