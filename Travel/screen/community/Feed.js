import { StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import baseURL from '../../assests/common/baseUrl'
import { Image } from 'react-native'


import AntDesign from 'react-native-vector-icons/AntDesign'
import PostFeed from './PostFeed'


const Feed = (props) => {

    const [feed, setFeed] = useState([])


    useEffect(() => {
        axios
            .get(`${baseURL}products`)
            .then((res) => setFeed(res.data))
    }, []);


    return (
        <View style={styles.mainView}>
            <Text style={styles.Heading}>Community</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Post Feed')}>
                <View style={styles.textInputView} >
                    <Text style={styles.textInput}>
                        What you thing?
                </Text>
                </View>
            </TouchableOpacity>

            <ScrollView>
                {feed.map((item, index) => {
                    return (
                        <View style={styles.mainPostView}>

                            <View style={styles.postView}>
                                <View style={styles.postBox}>
                                    <View style={styles.imageView}>
                                        <Image
                                            source={require('../../assests/1223348.jpg')}
                                            style={styles.image}
                                        />
                                        <View style={styles.titleView}>
                                            <Text style={styles.postName}>{item.name}</Text>
                                            <Text style={styles.postTitle}>{item.description}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <AntDesign name="edit" size={20} />
                                    </View>

                                </View>
                                <Image
                                    source={require('../../assests/1223348.jpg')}
                                    style={styles.coverImage}
                                />
                            </View>
                        </View>
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    Heading: {
        fontSize: 32,
        marginTop: 10,
        marginLeft: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    textInputView: {
        display: 'flex',
        alignItems: 'center'
    },

    textInput: {
        height: 40,
        width: '90%',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,
        marginVertical: 20,
    },
    mainPostView: {
        width: '100%',
        // backgroundColor:'gray'
    },
    postBox: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:'center'
    },
    postView: {
        width: '100%',
        alignItems: "center",
        marginVertical: 20,
    },
    image:{
        backgroundColor:'rgba(0,0,0,0.06)',
        width:50,
        height:50,
        borderRadius:50,
    },
    imageView:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    postName:{
        fontSize:16,
        fontWeight:'bold'
    },
    postTitle:{
        fontSize:11,
        color:'#989898'
    },
    titleView:{
        marginLeft:15
    },
    coverImage:{
        width:'90%',
        height:200,
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginTop:20,
        borderRadius:10
    }
})