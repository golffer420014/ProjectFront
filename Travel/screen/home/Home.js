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
import LinearGradient from 'react-native-linear-gradient';

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
      <LinearGradient
        colors={['#ff9a9e', '#fcb69f']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
        start={{x: 0, y: 0}} // จุดเริ่มต้น (บนซ้าย)
        end={{x: 1, y: 0}}
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
                style={{width: 35, height: 35, borderRadius: 50}}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg?w=826&t=st=1701900865~exp=1701901465~hmac=3b8a68ca724e3f41bc6281bb47fdcc4bf7ac8c8e953371ff40943de928078287',
              }}
              style={{width: 40, height: 40, borderRadius: 20}}
              resizeMode="cover"
            />
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
                    style={{width: 40, height: 40, borderRadius: 50}}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>

              <View style={{width: 10}}></View>
              <View
                style={{
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={[{fontWeight: 'bold', color: 'white', fontSize: 17}]}>
                  Hi, {user.fname}
                </Text>
                <Text style={[{fontWeight: 'bold', color: 'white'}]}>
                  {user.address}
                </Text>
              </View>
            </View>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg?w=826&t=st=1701900865~exp=1701901465~hmac=3b8a68ca724e3f41bc6281bb47fdcc4bf7ac8c8e953371ff40943de928078287',
              }}
              style={{width: 45, height: 45, borderRadius: 20}}
              resizeMode="cover"
            />
          </View>
        )}
        <View
          style={{height: 210, alignItems: 'center', justifyContent: 'center'}}>
          <Banner />
        </View>
      </LinearGradient>

      {/* event */}

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
        style={{backgroundColor: '#f5f5f5', paddingTop: 15}}>
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
        <LinearGradient
          colors={['#ff9a9e', '#fcb69f']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
          start={{x: 0, y: 0}} // จุดเริ่มต้น (บนซ้าย)
          end={{x: 1, y: 0}}
          style={styles.bestProduct}>
          <Text style={[{fontSize: 20, color: 'white', fontWeight: 'bold'}]}>
            Best of Thailand
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('All Product')}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#f5f5f5',
                padding: 10,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={[styles.textDF, {color: 'white', fontWeight: 'bold'}]}>
                View All
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>

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
    alignItems: 'center',
    // height:100
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingBottom: 5,
  },
  textDF: {
    color: 'black',
    fontSize: 17,
    // fontWeight:'bold'
  },
  textActive: {
    color: '#f47a7e',
    fontSize: 17,
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
    width: '95%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 25,
    alignSelf: 'center',
  },
  ctgFiltered: {
    alignItems: 'center',
    marginVertical: 20,
    marginRight: 10,
    padding: 5,
  },
});
