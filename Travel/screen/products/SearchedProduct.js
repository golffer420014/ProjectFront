import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Content , Left , Body , ListItem , Thumbnail , Text } from 'native-base'
import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';

let windowWidth = Dimensions.get('window').width


const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    const [user, setUser] = useState();

    useEffect(() => {
        axios.get`${baseURL}review`
        return () => {
            setUser()
        };
    }, []);

    console.log('this is', JSON.stringify('productsFiltered',productsFiltered, null, 2))

    return (
        // <Content style={{ width: windowWidth }}>
            <Content style={{ width: windowWidth }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => ( 
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("Product Detail", { item: item })
                        }}
                        key={item._id.$oid}
                        avatar
                    >
                        <Left>
                            <Thumbnail
                                source={{
                                    uri: item.image ?
                                        item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.location}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        ไม่พบ สถานที่ท่องเที่ยว
                    </Text>
                </View>
            )}
        </Content>
    );
};

export default SearchedProduct

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})