import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'

//TouchableOpacity = กล่องที่สามารถกดได้
//Dimensions = เข้าถึงขนาดหน้าจอ

let windowWidth = Dimensions.get('window').width

const ProductList = (props) => {
    const {item} = props

    return (
        <TouchableOpacity style={{width:'50%'}}
        onPress={() => 
        props.navigation.navigate('Product Detail', { item : item})
        }
        >
            <View style={{ width: windowWidth / 2, backgroundColor: 'gainsboro' }}>
                <ProductCard {...item }/> 
            </View>
        </TouchableOpacity>
    )
}

export default ProductList

const styles = StyleSheet.create({})