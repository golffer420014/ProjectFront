import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import axios from "axios"
import baseURL from "../../assests/common/baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import FormContainer from "../../Shared/Form/FormContainer"

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (

        <View style={[styles.listEvent]}>
            <Image
                source={{ uri: props.item.image }}
                style={styles.imageItem}
                resizeMode="cover"
            />
            <EasyButton
                small
                style={{
                    backgroundColor: 'gray',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    borderRadius: 30,
                }}
                onPress={() => props.delete(props.item._id)}
            >
                <AntDesign name='delete' size={20} color='white' />
            </EasyButton>
            <EasyButton
                small
                style={{
                    backgroundColor: '#f36d72',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: 30,
                }}
            >
                <Text style={{ color: 'white' }}>{props.index + 1}</Text>
            </EasyButton>
        </View>
    )
}

const Event = () => {
    const [selectedImage, setSelectedImage] = useState();
    const [token, setToken] = useState();
    const [event, setEvent] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
            .get(`${baseURL}event`)
            .then((res) => setEvent(res.data))
            .catch((error) => alert("Error to get categories"))

        return () => {
            setEvent();
            setToken();
        }
    }, [])

    const addEvent = () => {
        const eventToAdd = {
            image: selectedImage
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .post(`${baseURL}event`, eventToAdd, config)
            .then((res) => {
                // รับรายการอีเวนต์เก่าและเพิ่มอีเวนต์ใหม่ลงไป
                setEvent([...event, res.data]);
            })
            .catch((error) => console.log(error));

        setSelectedImage();
    }

    const deleteEvent = (id) => {
        // console.log(id)

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .delete(`${baseURL}event/${id}`, config)
            .then((res) => {
                const newEvent = event.filter((item) => item.id !== id);
                setEvent(newEvent);
            })
            .catch((error) => alert("Error delete categories"));
    }


    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
            }
        });
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{
                    backgroundColor: '#ffff',
                    width: width,
                    height: width /1.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius:30,
                    borderBottomRightRadius:30,
                    marginBottom:20
                }}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: selectedImage }} resizeMode="cover" />
                        <TouchableOpacity onPress={openImagePicker} style={styles.imagePicker}>
                            <FontAwesome name='camera' color='white' />
                        </TouchableOpacity>
                    </View>
                    <EasyButton
                        large
                        main
                        style={{ marginTop: 15, borderRadius: 20, }}
                        onPress={() => addEvent()}
                    >
                        <Text style={{ color: 'white' }}>Add Event</Text>
                    </EasyButton>
                </View>
                <FlatList
                    data={event}
                    renderItem={({ item, index }) => (
                        <Item item={item} index={index} delete={() => deleteEvent(item.id)} /> //delete={() => deleteCategory(item.id)}
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    style={{backgroundColor:'#dfdfdf'}}
                />
            </View>
        </ScrollView>
    )
}

export default Event

const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#dfdfdf',
        paddingBottom:20
        
    },
    imageContainer: {
        width: 180,
        height: 180,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        marginTop: 10,
        // elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 10,
        bottom: 5,
        backgroundColor: "#f36d72",
        padding: 8,
        borderRadius: 100,
        elevation: 10
    },
    pickerContainer: {
        width: 160,
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 5
    },
    listEvent: {
        margin: 10,  // Added margin for better spacing
    },
    imageItem: {
        width: (width - 40) / 2,    // Adjust width to accommodate two images side by side
        height: 150,
        borderRadius: 10,
    }
})