import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions , ScrollView } from 'react-native';
import { ListItem, Badge, Item, Picker } from 'native-base';

import ProductCard from './ProductCard'

import { Text } from 'react-native-svg';

var { width } = Dimensions.get("window");

const ProductList = (props) => {





    const { item } = props;
    return (
        <View>
            
            <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() =>
                    props.navigation.navigate("Product Detail", { item: item })
                }
            >

                <View style={{
                    width: width / 2,
                    backgroundColor: 'gainsboro',
                    position: 'relative'
                }}
                >
                    <ProductCard {...item} />
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default ProductList;