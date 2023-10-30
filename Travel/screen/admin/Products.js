import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Header, Item, Container, Input } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// api call
import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListItem from './ListItem'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import Toast from 'react-native-toast-message'

var { height, width } = Dimensions.get("window")


const Products = (props) => {

  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // GET Token
      AsyncStorage.getItem('jwt')
        .then((res) => {
          setToken(res)
        })
        .catch((err) => console.log('get token error'))

      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProductList(res.data)
          setProductFilter(res.data)
          setLoading(false)
        })
        .catch((err) => console.log('get products error'))

      return () => {
        // เมื่อหน้านี้หยุดทำงานจะคืนค่า state เป็นว่าง
        setProductList()
        setProductFilter()
        setLoading(true)
      }

    }, [])
  )

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList)
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const product = productFilter.filter((item) => item.id !== id)
        setProductFilter(product)
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `Delete Succeeded`,
          // text2: "Please Login into your account",
        });
      })
      .catch((err) => console.log(err))
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton
          main
          medium
          onPress={() => props.navigation.navigate('Event')}
        >
          <MaterialIcons name='event' size={20} color='white' />
          <Text style={styles.buttonText}>Event</Text>
        </EasyButton>

        <EasyButton
          main
          medium
          onPress={() => props.navigation.navigate('ProductForm')}
        >
          <FontAwesome name='plus' size={20} color='white' />
          <Text style={styles.buttonText}>Product</Text>
        </EasyButton>

        <EasyButton
          main
          medium
          onPress={() => props.navigation.navigate('Categories')}
        >
          <FontAwesome name='plus' size={20} color='white' />
          <Text style={styles.buttonText}>Category</Text>
        </EasyButton>


      </View>
      <View style={{
        backgroundColor: '#DFDFDF' }}>
        <View style={{ backgroundColor: '#DFDFDF', paddingHorizontal: 20, marginBottom: 10 }}>
          <Item style={{ borderRadius: 20, backgroundColor: '#ffff',paddingHorizontal:7 }}>
            <View style={{ paddingLeft: 10 }}>
              <FontAwesome name="search" color={"#f36d72"} size={17} />
            </View>
            <Input
              placeholder="Search"
              //onFocus={openList}
              keyboardType='ascii-capable'
              onChangeText={(text) => searchProduct(text)}
            />

          </Item>

        </View>
      </View>
      {loading ? (
        <View style={{height:width/.8 , justifyContent:'center'}}>
          <ActivityIndicator size='large' color='#f36d72' />
        </View>
      ) : (
        <View >
          <View elevation={1} style={styles.containerHeader}>
              <Text style={[styles.centeredTextLeft, { paddingLeft: 0 }]}>Image</Text>
              <Text style={[styles.centeredTextLeft,{paddingLeft:30}]}>Name</Text>
              <Text style={[styles.centeredTextLeft, { paddingLeft: 5 }]}>Province</Text>
            <Text style={styles.centeredTextRight}>Category</Text>
          </View>
          <FlatList
            data={productFilter}
            renderItem={({ item, index }) => (
              <View>
                <ListItem
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  delete={deleteProduct}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  containerHeader: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ffff',
    borderBottomWidth:1,
    borderColor:'#dfdfdf',
    Bottom:5
  },
  centeredTextLeft: {
    // paddingLeft: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  centeredTextRight: {
    // paddingRight: 14,
    fontWeight: 'bold',
    color: 'black'
  },

  container: {
    marginBottom: 160,
    backgroundColor: '#DFDFDF'
  },
  buttonContainer: {
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-evenly',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 10
  },
  buttonText: {
    marginLeft: 4,
    color: 'white'
  }
})