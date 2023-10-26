import React, { useState } from 'react';
import { TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { ListItem, Badge, Item, Picker } from 'native-base';

import ProductCard from './ProductCard';

var { width } = Dimensions.get("window");

const ProductList = (props) => {
    const data = require('../../data/from.json');
    const [provine, setProvine] = useState();

    const { item } = props;

    return (
        <ScrollView >
            <TouchableOpacity
                onPress={() =>
                    props.navigation.navigate("Product Detail", { item: item })
                }
            >
                <View
                    style={{
                        width: width / 2,
                        // backgroundColor: '#dfdfdf',
                        marginTop: 20,
                    }}
                >
                    <ProductCard {...item} />
                </View>
            </TouchableOpacity>
            {/* Render more products here */}
        </ScrollView>
    );
};

export default ProductList;
