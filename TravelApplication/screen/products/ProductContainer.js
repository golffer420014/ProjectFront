import React, {useState, useCallback} from 'react';
import {Container, Item, Header, Icon, Input} from 'native-base';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// base
import baseURL from '../../assests/common/baseUrl';
import axios from 'axios';

//screen
import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';

var {height} = Dimensions.get('window');

const ProductContainer = props => {
  const [products, setProduct] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [visibleItemCount, setVisibleItemCount] = useState(6);

  //category
  const [productsCtg, setProductsCtg] = useState([]);

  // console.log(productsCtg)
  // categort filter
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  //loading
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);

      //category
      setActive(-1);

      //product
      axios
        .get(`${baseURL}products`)
        .then(res => {
          setProduct(res.data);
          setProductsFiltered(res.data);
          // console.log(JSON.stringify(res.data,null,2))

          //category
          setProductsCtg(res.data);
          setInitialState(res.data);

          //loading
          setLoading(false);
        })
        .catch(err => {
          console.log('products call error');
        });

      //category
      axios
        .get(`${baseURL}category`)
        .then(res => {
          setCategories(res.data);
        })
        .catch(err => {
          console.log('category call error');
        });

      return () => {
        setProduct([]);
        setProductsFiltered([]);
        setFocus();

        //category
        setCategories([]);
        setActive();
        setInitialState();
        setLoading(true);
        setVisibleItemCount(6);
      };
    }, []),
  );

  const searchProduct = text => {
    setProductsFiltered(
      products.filter(i => i.name.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
    Keyboard.dismiss();
  };

  // category
  const changeCtg = (ctg, province) => {
    if (ctg === 'all' && province === 'ทั้งหมด') {
      setProductsCtg(initialState);
      setActive(true);
    } else {
      const filteredProducts = products.filter(item => {
        return (
          (ctg === 'all' || item.category.id === ctg) &&
          (province === 'ทั้งหมด' || item.provine === province)
        );
      });
      setProductsCtg(filteredProducts);
      setActive(true);
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <>
      {loading == false ? (
        <Container style={{backgroundColor: 'white'}}>
          <Header
            searchBar
            style={{
              backgroundColor: '#f5f5f5',
              paddingBottom: 8,
              borderBottomWidth: 3,
              borderColor: '#dfdfdf',
            }}>
            <Item
              style={{
                borderRadius: 20,
                marginTop: 10,
                paddingHorizontal: 10,
              }}>
              <View style={{paddingLeft: 10}}>
                <AntDesign name="search1" color={'red'} size={17} />
              </View>
              <Input
                placeholder="ค้นหา"
                onFocus={openList}
                onChangeText={text => searchProduct(text)}
              />
              {focus == true ? (
                <View style={{paddingRight: 10}}>
                  <AntDesign
                    name="close"
                    color={'red'}
                    size={20}
                    onPress={onBlur}
                  />
                </View>
              ) : null}
            </Item>
          </Header>

          {focus == true ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
              <View style={styles.container}>
                {/* <View style={{}}>
                  <Banner />
                </View> */}
                <View style={{backgroundColor: '#f5f5f5'}}>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>

                {productsCtg.length > 0 ? (
                  <LinearGradient
                    colors={['#fcb69f','#ff9a9e']} // ระบุสีที่คุณต้องการให้เป็นสีไล่สี
                    style={styles.listContainer}>
                    {productsCtg.slice(0, visibleItemCount).map(item => {
                      return (
                        <View
                          style={{width: '50%', height: null}}
                          key={item.id}>
                          <ProductList
                            navigation={props.navigation}
                            item={item}
                          />
                        </View>
                      );
                    })}
                    <View style={styles.plusItem}>
                      <TouchableOpacity
                        onPress={() =>
                          setVisibleItemCount(prevCount => prevCount + 6)
                        }>
                        <View
                          style={{
                            padding: 5,
                            borderRadius: 50,
                            backgroundColor: 'white',
                            borderWidth: 3,
                            borderColor: '#dfdfdf',
                          }}>
                          <FontAwesome
                            name="plus"
                            color={'#f36d72'}
                            size={20}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={[styles.listProduct, {top: 30}]}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        height: height,
                      }}>
                      <View style={{width: '50%'}}>
                        <Text style={{color: '#dfdfdf'}}>555</Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <View
                          style={{position: 'relative', top: 100, right: 100}}>
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: 20,
                            }}>
                            ไม่พบสถานที่ท่องเที่ยว
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        //loading
        <Container style={[styles.center, {backgroundColor: '#ffff'}]}>
          <ActivityIndicator size="large" color="#f36d72" />
        </Container>
      )}
    </>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  plusItem: {
    width: '100%',
    padding: 10,
    justifyContent: 'center', // จัดกลางแนวตั้ง
    alignItems: 'center', // จัดกลางแนวนอน
  },
  input: {
    borderWidth: 1, // Add a border
    borderColor: 'gray', // Border color
    borderRadius: 10, // Adjust the border radius as needed
    padding: 10, // Add padding to the input
    margin: 20, 
  },
  container: {
    flexWrap: 'wrap',
    backgroundColor: '#dfdfdf',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    top:-5
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listProduct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //justifyContent:'center', {} = horizo center
  },
});
