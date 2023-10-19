/* eslint-disable no-dupe-keys */
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import tailwind from 'twrnc'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const PostFeed = () => {

  const navigation = useNavigation()


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
              <Text style={styles.postName}>Name</Text>
              <Text style={styles.postName}>Location</Text>
            </View>
          </View>
          
        </View>

      </View>
      <View style={styles.TextInput}>
        <TextInput
          placeholder='ความในใจ...'
        />
      </View>
      <View style={styles.upload}>
          <View>
            
          </View>
      </View>
    </View>
  )
}

export default PostFeed

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffff'
  },
  postView: {
    width: '100%',
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  postBox: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleView: {
    marginLeft: 15
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  TextInput:{
    width:'90%',
    borderWidth: 1, // Add a border to the TextInput
    borderColor: 'gray', // Border color
    borderRadius: 4, // Add rounded corners
    padding: 8, // Add padding inside the TextInput
    fontSize: 16, // Set the font size
    alignSelf:'center',
    height:200,
    borderRadius:10
  }
})