import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions , ScrollView } from 'react-native';
import { ListItem, Badge, Item, Picker } from 'native-base';

import ProductCard from './ProductCard'

import { Text } from 'react-native-svg';

var { width } = Dimensions.get("window");

const ProductList = (props) => {


    const data = require('../../data/from.json')

    const [provine, setProvine] = useState()


    const { item } = props;
    return (
        <View >
            
            <TouchableOpacity
                onPress={() =>
                    props.navigation.navigate("Product Detail", { item: item })
                }
            >

                <View style={{
                    // backgroundColor: '#dfdfdf',
                    marginBottom:10
                }}
                >
                    <ProductCard {...item} />
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default ProductList;