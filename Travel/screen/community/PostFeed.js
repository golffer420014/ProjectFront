import { StyleSheet, Text, View, ScrollView ,Image, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../../Shared/Form/Input';
import InputFormProduct from '../../Shared/Form/InputFormProduct';

const PostFeed = (props) => {
  console.log(JSON.stringify(props, null, 2)) 
  const [fname, setFname] = useState();
  const[lname,setLname] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    if (props.route.params?.userProfile) {
      const { fname, lname, image } = props.route.params.userProfile;
      setFname(fname);
      setLname(lname);
      setImage(image);
    }
  }, [props.route.params?.userProfile]);


  return (
    <ScrollView style={{ backgroundColor: "white",  }}>
      <View style={styles.containerWrapper}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Image
              source={{ uri: image }}
              style={styles.imageProfile}
            />
            <View style={{ width: 5 }}></View>
            <View>
              <Text style={{ color: 'black' }}>{fname + ' ' + lname}</Text>
            </View>
          </View>
          <View style={styles.desc}>
            <TextInput
              style={styles.inputDesc}
              placeholder="คุณคิดอะไรอยู่"
              multiline={true}
              numberOfLines={4} // You can set the number of lines according to your need
              textAlignVertical="top"
              textAlign="left"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default PostFeed



const styles = StyleSheet.create({
  containerWrapper:{
  borderWidth:1,
  padding:20,
  width:'90%',
  alignSelf:'center'
  },
  container: {
    width: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageProfile:{
    backgroundColor: 'rgba(0,0,0,0.06)',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  header:{
    width:'100%',
    padding:10,
    flexDirection:'row',
  },
  desc:{
    width: '100%',
  },
  inputDesc:{
    height: 100,
    padding: 10,
    borderWidth:3,
    borderRadius:10,
    borderColor:'#dfdfdf',
  },
})