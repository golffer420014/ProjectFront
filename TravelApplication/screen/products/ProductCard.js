import { StyleSheet, Text, View, Dimensions, Image, Button ,ScrollView } from 'react-native'
import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions';

//icon
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'


//Dimensions = เข้าถึงขนาดหน้าจอ
var { width } = Dimensions.get('window')

const ProductCard = (props) => {
    const { name, rating, location, image } = props

    //  console.log('this is', JSON.stringify(props, null, 2))



    return (
        <View style={styles.container}>
        
                <View style={styles.imageContainer}>
                
                    <Image
                        style={[styles.image, { width: 200, height: '100%' }]}
                        // source={require('../../assests/1223348.jpg')}
                        source={{
                            uri: image ?
                                image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                    /> 
                
                    
            </View>
            <View style={styles.details}>
                <View style={{  justifyContent: 'space-between'}}>
                    <Text style={styles.title} numberOfLines={1}>
                        {name}
                    </Text>
                    <View style={{ flexDirection: 'row' , alignItems:'center' }}>
                        <Text style={styles.rating} numberOfLines={1}>
                            {rating} {''}
                        </Text>
                        <AntDesign name='star' color='#f36d72' size={15}/>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' , alignItems:'center'}}>
                    <Entypo name='location-pin' color='#f36d72' size={18} />
                    <Text style={styles.location} numberOfLines={1}>
                        {location}
                    </Text>
                </View>
                
            </View>
            
            
        </View>
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
    width: 180,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginBottom:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // สำหรับ Android
    },
    imageContainer:{
        flex: 1,
        width:'auto',
        alignItems:'stretch',
        overflow: "hidden" ,
        borderRadius: 10,
    },
    image: {
        resizeMode: 'stretch'
    },
    details:{
        paddingHorizontal:10,
        paddingVertical:10
    },
    title:{
        fontWeight:'bold',
        color:'black',
        fontSize:15,
        marginBottom:2
    },
    location:{
        color:'black'
    },
    rating:{
        fontSize:15,
        color:'black'
    }
})

