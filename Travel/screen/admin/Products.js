import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions , TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Header, Item, Container , Input } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// api call
import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListItem from './ListItem'

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

  return (
    <View>
      <View>
        <Header searchBar rounded style={{ backgroundColor: '#dcdcdc' }}>
          <Item style={{ borderRadius: 20 }}>
            <View style={{ paddingLeft: 10 }}>
              <FontAwesome name="search" color={"#f36d72"} size={20} />
            </View>
            <Input
              placeholder="ค้นหา"
            //onFocus={openList}
              keyboardType='ascii-capable'
            onChangeText={(text) => searchProduct(text)}
            />

          </Item>

        </Header>
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size='large' color='#f36d72' />
        </View>
      ) : (
        <View>
          <View style={styles.container}>
            <Text style={styles.centeredTextLeft}>รูป</Text>
            <Text style={{
              fontWeight: 'bold',
              color: 'black'
            }}>ชื่อ</Text>
            <Text style={{
              fontWeight: 'bold',
              color: 'black'
            }}>จังหวัด</Text>
            <Text style={styles.centeredTextRight}>หมวดหมู่</Text>
          </View>
          <FlatList
            data={productFilter}
            renderItem={({ item, index }) => (
              <View>
                <ListItem
                  {...item}
                  navagation={props.navagation}
                  index={index}
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  centeredTextLeft: {
    paddingLeft: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  centeredTextRight: {
    paddingRight: 14,
    fontWeight: 'bold',
    color: 'black'
  },
})