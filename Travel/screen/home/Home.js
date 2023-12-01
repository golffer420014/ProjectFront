import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView,Dimensions} from 'react-native';
import React ,{useState,useCallback, useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native'; 
import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import FormContainer from '../../Shared/Form/FormContainer';
import Banner from '../../Shared/Banner';
import ProductList from '../products/ProductList';
import AuthGlobal from '../../context/store/AuthGlobal';
  const windowWidth = Dimensions.get('window').width;

const Home = props => {
   const context = useContext(AuthGlobal);
  const [loading,setLoading] = useState(true)
  const [products, setProducts] = useState([]);
  const [user,setUser] = useState()

  // console.log(user)



  const fetchData = useCallback(async () => {
    try {
      // เริ่มโหลดข้อมูล
      const response = await axios.get(`${baseURL}products`);

      // เก็บข้อมูลใน state
      setProducts(response.data);

      // ปิดการโหลด
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // ตรวจจับและจัดการข้อผิดพลาดได้ตามความเหมาะสม
      setLoading(false);
    }
  }, []);

    useFocusEffect(
      useCallback(() => {
        fetchData();

        return(
          setLoading(true),
          setProducts([])
        )
      }, []),
    );

    // console.log(products)

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

  return (
    <FormContainer>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('User', {screen: 'Login'})}>
          <Image
            source={require('../../assests/user.png')}
            style={{width: 35, height: 35, borderRadius: 50}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={[styles.textDF, {fontSize: 25, fontWeight: 'bold'}]}>
          Home
        </Text>
        <Text> </Text>
      </View>
      <View
        style={{height: 210, alignItems: 'center', justifyContent: 'center'}}>
        <Banner />
      </View>

      <ScrollView style={{width: '90%', paddingBottom: 10}}>
        <View style={styles.bestProduct}>
          <Text style={[styles.textDF, {fontSize: 20, fontWeight: 'bold'}]}>
            Best of Thailand
          </Text>
          <View
            style={{
              borderWidth: 3,
              borderColor: '#dfdfdf',
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={[styles.textDF, {color: '#f47a7e', fontWeight: 'bold'}]}>
              View All
            </Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          {products
            .sort((a, b) => b.rating - a.rating) // เรียงลำดับตาม rating มากไปน้อย
            .slice(0, 10) // เลือกเพียง 10 รายการ
            .map(item => (
              <View style={{width: '50%', height: null}} key={item.id}>
                <ProductList navigation={props.navigation} item={item} />
              </View>
            ))}
        </View>
      </ScrollView>
    </FormContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: -35,
    marginBottom: 5,
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderColor: '#dfdfdf',
  },
  textDF: {
    color: 'black',
    // fontWeight:'bold'
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    top: -5,
    marginLeft: -6,
  },
  bestProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
