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

{/* <Item picker>
    <Picker
        mode="dropdown"
        style={{ width: 10 }}
        selectedValue={data.RECORDS}
        placeholder="Select your country"
        placeholderStyle={{ color: '#007aff' }}
        placeholderIconColor="#007aff"
        onValueChange={(e) => setProvine(e)}
    >
        {data.RECORDS.map((c) => {
            return <Picker.Item
                key={c.code}
                label={c.name_th}
                value={c.name_th}
            />
        })}
    </Picker>
</Item> */}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

export default connect(null, mapDispatchToProps)(ProductCard)


const styles = StyleSheet.create({
    container: {
        width: 182,
        height: 200,
        borderRadius: 20,
        elevation: 1,
        backgroundColor: 'white',
        marginLeft:10,
        marginTop:20,
    },
    imageContainer:{
        flex: 1,
        width:'auto',
        alignItems:'center',
        overflow: "hidden" ,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    image: {
        borderRadius:10,
        resizeMode: 'cover'
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
    },
    rating:{
        fontSize:15
    }
})

