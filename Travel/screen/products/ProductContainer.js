

import React, { useState, useEffect } from 'react'
import { Container, Item, Header, Icon, Input } from 'native-base'
import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator, Keyboard } from 'react-native'


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


var { height } = Dimensions.get('window')


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

    useEffect(() => {

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


        }
    }, [])

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
        if (ctg === 'all' && province === 'all') {
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




    return (
        <>
            {loading == false ? (
                <Container >

                    <Header searchBar rounded style={{ backgroundColor: '#dcdcdc' }}>
                        <Item style={{ borderRadius: 20 }}>
                            <View style={{ paddingLeft: 10 }}>
                                <AntDesign name="search1" color={"red"} size={20} />
                            </View>
                            <Input
                                placeholder="Search"
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
                        <ScrollView>

                            <View style={styles.container}>
                                <View>
                                    <Banner />
                                </View>
                                <View>
                                    <CategoryFilter
                                        categories={categories}
                                        categoryFilter={changeCtg}
                                        productsCtg={productsCtg}
                                        active={active}
                                        setActive={setActive}
                                    />
                                </View>
                                    <View style={{ backgroundColor:'#f36d72' ,width:'100%',height:50}}>

                                </View>
                                {productsCtg.length > 0 ? (
                                    <ScrollView>
                                        <View style={styles.listContainer}>
                                            {productsCtg.map((item) => {
                                                return (

                                                    <ProductList
                                                        navigation={props.navigation}
                                                        key={item.id}
                                                        item={item}
                                                    />
                                                )
                                            })}
                                        </View>
                                    </ScrollView>
                                ) : (
                                    <View style={[styles.center, { height: height / 2 }]}>
                                        <Text style={{ fontSize: 25 }}>No products found!!</Text>
                                    </View>
                                )}


                            </View>

                        </ScrollView>
                    )}

                </Container>

            ) : (
                //loading
                <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
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
        backgroundColor: "gainsboro",
    },
    listContainer: {
        // height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        marginBottom: 50,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})