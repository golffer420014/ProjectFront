import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { Content , Left , Body , ListItem , Thumbnail , Text } from 'native-base'

let windowWidth = Dimensions.get('window').width


const SearchedProduct = (props) => {
    const { productsFiltered } = props;

    console.log('this is', JSON.stringify('productsFiltered',productsFiltered, null, 2))

    return (
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
                                    uri: item.imageProducts.myFile ?
                                        item.imageProducts.myFile : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
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
                        No products match the selected criteria
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