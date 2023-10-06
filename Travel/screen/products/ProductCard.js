import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native'
import React from 'react'

//Dimensions = เข้าถึงขนาดหน้าจอ

let windowWidth = Dimensions.get('window').width

const ProductCard = (props) => {
    const { name, price, image, countInstock } = props

    return (
        <View style={styles.container}>
        
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                    uri: image ?
                        image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                }}
            />
            <View style={styles.card} />
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name
                }
            </Text>
            <Text style={styles.price}>${price}</Text>

            
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        width: windowWidth / 2 - 20,
        height: windowWidth / 1.7,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: windowWidth / 2 - 30 - 30,
        height: windowWidth / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -20
    },
    card: {
        marginBottom: 10,
        height: windowWidth / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: windowWidth / 2 - 20 - 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})