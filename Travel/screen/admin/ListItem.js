import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Button,
} from 'react-native'
import React from 'react'

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'

var { height, width } = Dimensions.get("window") 

const ListItem = (props) => {
    return (
        <View>
            <TouchableOpacity
            // onPress={}
            style={[styles.container, { backgroundColor:props.index % 2 == 0 ? "white" : 'gainsboro' }]}
            >
            <Image
                    source={{
                        uri: props.image ?
                            props.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                    }}
                    resizeMode='contain'
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
        // padding: 5,
        // width: width
        justifyContent:'space-between',
        alignItems:'center'
    },
    image: {
        borderRadius: 50,
        width: width / 6,
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
        shadowColor: "#000",
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
    }
})