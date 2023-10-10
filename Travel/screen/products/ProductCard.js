import { StyleSheet, Text, View, Dimensions, Image, Button ,ScrollView } from 'react-native'
import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions';


//Dimensions = เข้าถึงขนาดหน้าจอ
var { width } = Dimensions.get('window')

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props

    //  console.log('this is', JSON.stringify(props, null, 2))



    return (
        <ScrollView>
        <View style={styles.container}>
        
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                    uri: `data:image/jpeg;base64,${(props.image).toString('base64')}` ?
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
                    <View style={{marginBottom:10}}>
                        <Button
                            title={'Add'}
                            onPress={() =>{
                                props.addItemToCart(props)
                            }}
                         />
                    </View>
                ) : <Text>หมด</Text>}
            
        </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

export default connect(null, mapDispatchToProps)(ProductCard)


const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

