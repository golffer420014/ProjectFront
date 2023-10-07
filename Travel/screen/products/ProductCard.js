import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native'
import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions';


//Dimensions = เข้าถึงขนาดหน้าจอ
let windowWidth = Dimensions.get('window').width 

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props


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

            {countInStock > 0 ?(
                    <View style={{marginTop:10}}>
                        <Button
                            title={'Add'}
                            onPress={() =>{
                                props.addItemToCart(props)
                            }}
                         />
                    </View>
                ) : <Text>หมด</Text>}
            
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}



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

export default connect(null, mapDispatchToProps)(ProductCard)
