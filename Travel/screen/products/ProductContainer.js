import React, { useState, useCallback } from 'react'
import { Container, Item, Header, Icon, Input } from 'native-base'
import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator, Keyboard } from 'react-native'
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
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useFocusEffect } from '@react-navigation/native';


var { height } = Dimensions.get('window')
let windowWidth = Dimensions.get('window').width


const ProductContainer = (props) => {

    const [products, setProduct] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();

    //category
    const [productsCtg, setProductsCtg] = useState([])
    // categort filter
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);

    //loading
    const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {

            setFocus(false)

            //category
            setActive(-1)

            //product
            axios
                .get(`${baseURL}products`)
                .then(res => {
                    setProduct(res.data)
                    setProductsFiltered(res.data)

                    //category
                    setProductsCtg(res.data)
                    setInitialState(res.data)

                    //loading
                    setLoading(false)
                })
                .catch((err) => {
                    console.log('products call error')
                })

            //category
            axios
                .get(`${baseURL}category`)
                .then(res => {
                    setCategories(res.data)
                })
                .catch((err) => {
                    console.log('category call error')
                })

            return () => {
                setProduct([])
                setProductsFiltered([])
                setFocus()

                //category
                setCategories([])
                setActive()
                setInitialState()
                setLoading(true)


            }
        }, [])
    )

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
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
            const filteredProducts = products.filter((item) => {
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
                <Container >

                    <Header searchBar rounded style={{ backgroundColor: '#dcdcdc' }}>
                        <Item style={{ 
                            borderRadius: 20 ,
                             marginTop:10 ,
                              paddingHorizontal:10,
                              }}>
                            <View style={{ paddingLeft: 10 }}>
                                <AntDesign name="search1" color={"red"} size={17} />
                            </View>
                            <Input
                                placeholder="ค้นหา"
                                onFocus={openList}
                                onChangeText={(text) => searchProduct(text)}
                            />
                            {focus == true ? <View style={{ paddingRight: 10 }}>
                                <AntDesign name="close" color={"red"} size={20}
                                    onPress={onBlur}

                                />
                            </View> : null}
                        </Item>

                    </Header>

                    {focus == true ? (
                        <SearchedProduct
                            navigation={props.navigation}
                            productsFiltered={productsFiltered}
                        />
                    ) : (
                            <ScrollView style={{ backgroundColor: '#dfdfdf'  }}>

                            <View style={styles.container}>
                                <View>
                                    <Banner />
                                </View>
                                <View style={{ backgroundColor: '#dfdfdf'  }}>
                                    <CategoryFilter
                                        categories={categories}
                                        categoryFilter={changeCtg}
                                        productsCtg={productsCtg}
                                        active={active}
                                        setActive={setActive}
                                    />
                                </View>

                                {productsCtg.length > 0 ? (

                                        <View style={[styles.listProduct]}>
                                            {
                                                shuffleArray([...productsCtg]).map((item) => {
                                                    return (
                                                        <View style={{ width: '50%'  }} key={item.id}>
                                                            <ProductList
                                                                navigation={props.navigation}
                                                                item={item}
                                                            />
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>



                                ) : (
                                    <View style={[styles.listProduct]}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', height: height }}>
                                            <View style={{ width: '50%' }}>
                                                <Text style={{ color: '#dfdfdf' }}>555</Text>
                                            </View>
                                            <View style={{ width: '50%' }}>
                                                <View style={{ position: 'relative', top: 180, right: 100 }}>
                                                    <Text style={{
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                        fontSize: 20
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
                <Container style={[styles.center, { backgroundColor: '#dfdfdf' }]}>
                    <ActivityIndicator size="large" color='#f36d72' />
                </Container>
            )}

        </>

    );
}

export default ProductContainer

const styles = StyleSheet.create({
    input: {
        borderWidth: 1, // Add a border
        borderColor: 'gray', // Border color
        borderRadius: 10, // Adjust the border radius as needed
        padding: 10, // Add padding to the input
        margin: 20,
    },
    container: {
        flexWrap: "wrap",
        backgroundColor: "#dfdfdf",
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        height: height / 1.5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    listProduct: {
        backgroundColor: '#dfdfdf',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        //justifyContent:'center', {} = horizo center
    }
})