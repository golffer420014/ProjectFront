

import React, { useState, useEffect } from 'react'
import { Container, Item, Header, Icon, Input } from 'native-base'
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native'


// base
import baseURL from '../../assests/common/baseUrl';
import axios from 'axios';

//screen
import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

var { height } = Dimensions.get('window')


const ProductContainer = (props) => {

    const [products, setProduct] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();

    //category
    const [productsCtg, setProductsCtg] = useState([])

    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);

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
            .catch((err)=>{
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
    };

    // category
    const changeCtg = (ctg) => {
        {
            ctg === 'all'
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) => i.category.id === ctg),
                        setActive(true)
                    ),
                ]
        }

    }


    return (

        <Container >

            <Header searchBar rounded style={{ backgroundColor: '#f36d72' }}>
                <Item>
                    <Icon name="emoji-happy" />
                    <Input
                        placeholder="Search"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
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




    )
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
        marginBottom: 20
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})