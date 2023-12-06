import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  ImageBackground,
  
} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import FormContainer from '../../Shared/Form/FormContainer';
import Banner from '../../Shared/Banner';
import ProductList from '../products/ProductList';
import AuthGlobal from '../../context/store/AuthGlobal';
var {width} = Dimensions.get('window');


const Home = props => {
  const context = useContext(AuthGlobal);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const idUser = context.stateUser.user.userId;
  const [ctg, setCtg] = useState([]);
  const [changCtg, setChangCtg] = useState('ที่พัก');

  // console.log(JSON.stringify(products, null, 2));

  // console.log(context.stateUser.user.userId);
  // console.log(`${baseURL}${context.stateUser.user.userId}`);

  // const fetchData = useCallback(async () => {
  //   try {
  //     // เริ่มโหลดข้อมูล
  //     const response = await axios.get(`${baseURL}products`);

  //     // เก็บข้อมูลใน state
  //     setProducts(response.data);

  //     // ปิดการโหลด
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // ตรวจจับและจัดการข้อผิดพลาดได้ตามความเหมาะสม
  //     setLoading(false);
  //   }
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // fetchData();

      if (context.stateUser.isAuthenticated) {
        axios
          .get(`${baseURL}users/${idUser}`)
          .then(res => {
            setUser(res.data);
            // console.log(res.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching user image:', error);
            setLoading(true);
          });
      }

      axios
        .get(`${baseURL}products`)
        .then(res => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log('home call api proucts error');
          setLoading(true);
        });

      axios
        .get(`${baseURL}category`)
        .then(res => {
          setCtg(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log('home call api proucts error');
          setLoading(true);
        });

      return () => {
        setLoading(true);
        setProducts([]);
        setUser([]); // หรืออะไรที่เหมาะสมกับข้อมูล userImage ของคุณ
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.stateUser.isAuthenticated]),
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
      {/* header */}
      <ImageBackground
        source={require('../../assests/logoapp.png')}
        resizeMode="stretch"
        style={styles.header}>
        {!context.stateUser.isAuthenticated ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              width: width,
              // width:370,
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('User', {screen: 'User Profile'})
              }>
              <Image
                source={require('../../assests/user.png')}
                style={{width: 50, height: 50, borderRadius: 50}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {/* <Image
              source={require('../../assests/1223348.jpg')}
              style={{width: 50, height: 50, borderRadius: 20}}
              resizeMode="cover"
            /> */}
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              width: width,
              // width:370,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('User', {screen: 'User Profile'})
                }>
                <View
                  style={{
                    borderWidth: 5,
                    borderRadius: 50,
                    borderColor: '#dfdfdf',
                  }}>
                  <Image
                    source={{
                      uri: user ? user.image : user.image,
                    }}
                    style={{width: 50, height: 50, borderRadius: 50}}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>

              <View style={{width: 10}}></View>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}>
                <Text style={[styles.textDF, {fontWeight: 'bold'}]}>
                  Hi, {user.fname}
                </Text>
                <Text style={[styles.textDF]}>{user.address}</Text>
              </View>
            </View>
            {/* <Image
              source={require('../../assests/1223348.jpg')}
              style={{width: 50, height: 50, borderRadius: 20}}
              resizeMode="cover"
            /> */}
          </View>
        )}
      </ImageBackground>

      {/* event */}
      <View
        style={{height: 210, alignItems: 'center', justifyContent: 'center'}}>
        <Banner />
      </View>

      {/* ctg */}
      <View style={{flexDirection: 'row', width: '95%'}}>
        {ctg.map(
          item =>
            (item.name === 'ที่พัก' || item.name === 'อาหาร') && (
              <TouchableOpacity
                onPress={() => setChangCtg(item.name)}
                key={item.id}>
                <View
                  style={[
                    styles.ctgFiltered,
                    item.name === changCtg ? styles.activeCtg : null,
                  ]}>
                  {/* <Image
                source={{uri: item.icon}}
                style={{width: 50, height: 50, borderRadius: 50}}
              /> */}
                  <Text
                    style={
                      item.name === changCtg ? styles.textActive : styles.textDF
                    }>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ),
        )}
      </View>

      {/* product ctg */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} // ซ่อน indicator ในแนวนอน
        indicatorStyle={{backgroundColor: 'red'}} // ตั้งค่าสี indicator
        style={{backgroundColor: '#f5f5f5', paddingTop: 15, borderRadius: 10}}>
        {products.map(item => {
          // กรองรายการที่มี item.category.name เท่ากับ 'ทะเล' เท่านั้น
          if (item.category.name === changCtg) {
            return (
              <View style={{paddingEnd: 10}} key={item.id}>
                {/* แสดง ProductList สำหรับรายการที่ผ่านการกรอง */}
                <ProductList navigation={props.navigation} item={item} />
              </View>
            );
          } else {
            // ถ้าไม่ตรงเงื่อนไข ไม่ต้องแสดงอะไรเลย
            return null;
          }
        })}
      </ScrollView>

      {/* best of */}
      <ScrollView style={{width: '100%'}}>
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
            <TouchableOpacity
              onPress={() => props.navigation.navigate('All Product')}>
              <Text
                style={[styles.textDF, {color: '#f47a7e', fontWeight: 'bold'}]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          {products
            .sort((a, b) => b.rating - a.rating) // เรียงลำดับตาม rating มากไปน้อย
            .slice(0, 6) // เลือกเพียง 6 รายการ
            .map(item => (
              <View style={{width: '50%'}} key={item.id}>
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
    alignItems: 'center',
    height:100
  },
  textDF: {
    color: 'black',
    // fontWeight:'bold'
  },
  textActive: {
    color: '#f47a7e',
  },
  activeCtg: {
    borderBottomWidth: 3,
    borderRadius: 10,
    borderColor: '#f47a7e',
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
    backgroundColor: '#f5f5f5',
  },
  bestProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ctgFiltered: {
    alignItems: 'center',
    marginVertical: 20,
    marginRight: 10,
    padding: 5,
  },
});
