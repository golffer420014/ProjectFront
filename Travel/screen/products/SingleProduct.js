import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, ScrollView, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
// import Toast from 'react-native-toast-message';
// import EasyButton from '../../Shared/StyledComponents/EasyButton'
// import TrafficLight from '../../Shared/StyledComponents/TrafficLight'

//redux
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions';

// libary
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import TabViewExample from '../../Shared/TabViewExample';

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');
    const [availabilityText, setAvailabilityText] = useState("")

    const navigation = useNavigation()

    // console.log('this is', JSON.stringify(item, null, 2))



    return (
        <View style={[tailwind`flex-1` ]}>
            {/* header */}
            <Image
                source={require('../../assests/1223348.jpg')}
                style={{ width: wp(100), height: hp(55) }}
            />
            <SafeAreaView style={
                tailwind
                    `flex-row 
                    justify-between 
                    items-center 
                    w-full 
                    absolute
                    `}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[
                        tailwind`p-2 rounded-full m-4`,
                        { backgroundColor: 'rgba(255,255,255,0.5)' }
                    ]}

                >
                    <AntDesign name="arrowleft" color={'white'} size={wp(5)} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* content */}
            <View style={[
                tailwind
                    `px-5 flex 
                    flex-1 
                    justify-between 
                    bg-white 
                    pt-8
                    -mt-14`,
                {
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                }
            ]}>

                <View
                    showsVerticalScrollIndicator={false}
                    style={tailwind`space-y-5`}
                >
                    <View
                        style={tailwind`flex-row justify-between items-start align-center `}
                    >
                        <Text style={[
                            `
                         flex-1 
                         text-neutral-700`,
                        { fontSize: wp(7) , color:'black' , fontWeight:'bold' }]
                        }>
                            {item.name}
                        </Text>
                        <Text style={[tailwind`pt-2`,{ fontSize: wp(5) }]}>
                            {item.rating}{' '}
                            <AntDesign name="star" color={'#f36d72'} size={wp(5)} />
                        </Text>

                    </View>
                    <Text style={[tailwind`pt-1 mb-5`, { fontSize: wp(5) }]}>
                        <FontAwesome name="map-marker" color={'#f36d72'} size={wp(5)} />
                        {' '}
                        {item.name}
                    </Text>

                    {/* <View
                        style={tailwind`pt-5`}
                    >
                        <Text style={{ fontSize: wp(5), color: 'black', fontWeight: 'bold' }}>
                            Description
                        </Text>
                        <Text style={{ color: 'gray', fontSize:15 }}>
                            {item.description}
                        </Text>

                    </View> */}



                </View>
                <TabViewExample {...item} />


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

export default connect(null, mapDispatchToProps)(SingleProduct)

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})