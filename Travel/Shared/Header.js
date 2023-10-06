// import { StyleSheet, Text, View ,Image,SafeAreaView } from 'react-native'
// import React from 'react'


// const Header = () => {
//   return (
//       <SafeAreaView style={styles.header}>
//       <Image
//         // source={require('../assests/1223348.jpg')}
//         source={require('../assests/yiran-ding-URn7-JupQ6Q-unsplash.jpg')}
//         resizeMode='contain'
//         style={{height:50 }}
//       />
//       </SafeAreaView>
//   )
// }

// export default Header

// const styles = StyleSheet.create({
//     header:{
//         // width:'100%',
//         // flexDirection:'row',
//         // alignContent:'center',
//         // padding:20,
//         marginVertical:10,
//     }
// })

import { StyleSheet, Text, View , Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Text style={{textAlign:'center' , fontSize: 20, marginVertical:20}}>Header</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})