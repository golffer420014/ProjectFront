import { StyleSheet, Text, View , Dimensions , Button , TouchableOpacity } from 'react-native'
import React from 'react'
import { Container, Left,Right,H1, Body, ListItem, Thumbnail } from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions';
import CartItem from './CartItem'
var { height, width } = Dimensions.get("window");

const Cart = (props) => { 
  
  let total = 0;
  props.cartItems.forEach(cart => {
    return(total += cart.product.price)
  });

  return (
    <>
      {props.cartItems.length ?(
          <Container>
          <H1 style={{alignSelf:'center'}}>Cart</H1>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data)=>(
              <CartItem item={data}/>
            )}
            renderHiddenItem={(data) =>(
              <View style={styles.hiddenContainer}>
                <TouchableOpacity 
                style={styles.hiddenButton}
                onPress={() => props.removeFromCart(data.item)}
                >
                  <Text style={{color:'white'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            key={Math.random()} 
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />

          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
              {/* {totalPrice} */}
            </Left>
            <Right>
              <Button title='Clear'
                onPress={() => props.clearCart()}
              />
            </Right>
            <Right>
              <Button title='Checkout' onPress={() => props.navigation.navigae('Checkout')} />
            </Right>
          </View>

          </Container>
      ) : (
          <Container style={styles.emptyContainer}>
            <Text>Emty</Text>
          </Container>
      )}

     
    </>
  )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  }
}

// export default Cart
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem:{
    margin:10,
    alignItems:'center',
    flexDirection:'row'
  },
  body:{
    margin:10,
    alignItems:'center',
    flexDirection:'row'
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red'
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    backgroundColor: '#f36d72',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2
  }
})