import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Button,
    Modal,
} from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-toast-message'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'

//button
import EasyButton from '../../Shared/StyledComponents/EasyButton'

var { height, width } = Dimensions.get("window")

const ListItem = (props) => {

    const [modalVisible, setModalVisible] = useState(false)


    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableHighlight
                            underlayColor="#E8E8E8"
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{
                                alignSelf: 'flex-end',
                                position: 'absolute',
                                top: 5,
                                right: 10,
                            }}
                        >
                            <FontAwesome name='close' size={20} />
                        </TouchableHighlight>
                        <EasyButton
                            medium
                            secondary
                            onPress={() => [
                                props.navigation.navigate("ProductForm", { item: props }),
                                setModalVisible(false)
                            ]}
                        >
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton
                            medium
                            danger
                            onPress={() => [props.delete(props.id) , setModalVisible(false)]}
                            
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>

                    </View>
                </View>

            </Modal>
            <TouchableOpacity
                onPress={() =>
                    props.navigation.navigate("Product Detail", { item: props })
                }
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, { backgroundColor: props.index % 2 == 0 ? "white" : '#dfdfdf' }]}
            >
                <Image
                    source={{
                        uri: props.image ?
                            props.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                    }}
                    resizeMode='stretch'
                    style={styles.image}
                />
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.provine}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.category.name}</Text>
                {/* <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.category.name}</Text>   */}
            </TouchableOpacity>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        // width: width
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        borderRadius: 50,
        width: width / 5,
        // height: 'auto',
        height: 50,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#f36d72",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width:100,
        marginVertical:10,
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
    },
})