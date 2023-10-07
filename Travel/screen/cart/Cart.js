import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { connect } from 'react-redux'

const Cart = (props) => { 
  return (
    <View style={{flex:1}}>
      {props.cartItems.map((x) =>{
        return(
            <Text>{x.product.name}</Text>  
        )
      })}
    </View>
  )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    };
};

// export default Cart
export default connect(mapStateToProps,null)(Cart);

const styles = StyleSheet.create({})