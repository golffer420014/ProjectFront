import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions , ScrollView } from 'react-native';
import { ListItem, Badge, Item, Picker } from 'native-base';

import ProductCard from './ProductCard'



const ProductList = (props) => {

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
                    marginBottom:10,
                    marginLeft:-3
                }}
                >
                    <ProductCard {...item} />
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default ProductList;