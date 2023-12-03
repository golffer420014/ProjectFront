import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import FormContainer from '../../Shared/Form/FormContainer';
import Banner from '../../Shared/Banner';
import ProductList from '../products/ProductList';
import AuthGlobal from '../../context/store/AuthGlobal';
const windowWidth = Dimensions.get('window').width;

const Home = props => {
  const context = useContext(AuthGlobal);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [userImage, setUserImage] = useState([]);
  const idUser = context.stateUser.user.userId;
  const [ctg,setCtg] = useState([])
  const [changCtg, setChangCtg] = useState('ที่พัก');

  const [productCtg, setProductCtg] = useState([]);

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
            setUserImage(res.data);
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
        setUserImage([]); // หรืออะไรที่เหมาะสมกับข้อมูล userImage ของคุณ
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* header */}
      <View style={styles.header}>
        {!context.stateUser.isAuthenticated ? (
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
        ) : (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('User', {screen: 'User Profile'})
            }>
            <Image
              source={{
                uri: userImage ? userImage.image : '../../assests/user.png',
              }}
              style={{width: 35, height: 35, borderRadius: 50}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}

        <Text style={[styles.textDF, {fontSize: 25, fontWeight: 'bold'}]}>
          Home
        </Text>
        <Text>{'        '}</Text>
      </View>

      {/* event */}
      <View
        style={{height: 210, alignItems: 'center', justifyContent: 'center'}}>
        <Banner />
      </View>

      {/* ctg */}
      <View style={{flexDirection: 'row', width: '95%'}}>
        {ctg.slice(4).map(item => (
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
        ))}
      </View>

      {/* product ctg */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} // ซ่อน indicator ในแนวนอน
        indicatorStyle={{backgroundColor: 'red'}} // ตั้งค่าสี indicator
        style={{backgroundColor: '#dfdfdf', paddingTop: 15, borderRadius: 10}}>
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
            <Text
              style={[styles.textDF, {color: '#f47a7e', fontWeight: 'bold'}]}>
              View All
            </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: -35,
    marginBottom: 5,
    padding: 10,
    borderBottomWidth: 3,
    borderColor: '#dfdfdf',
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
    backgroundColor:'#dfdfdf',
    
  },
  bestProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom:20,
    width:'100%',
    alignItems:'center',
    paddingHorizontal:20
  },
  ctgFiltered: {
    alignItems: 'center',
    marginVertical: 20,
    marginRight: 10,
    padding:5
  },
});
