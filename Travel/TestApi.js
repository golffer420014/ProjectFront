import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Item, Picker } from 'native-base'

// import Provine from './data/from.json'
// console.log(JSON.stringify(Provine.RECORDS, null, 2))

const TestApi = () => {

  const data = require('./data/from.json')

  const [provine,setProvine] = useState()

  // useEffect(()=>{
  //   setProvine(Provine.RECORDS)
  // },[])

  return (
    <View >
      <Text>dwadwa</Text>
      {/* {provine.RECORDS.map(item => (
        <Text style={{ color: 'red' }} key={item.id}>{item.name_th}</Text>
      ))} */}

      <Item picker>
        <Picker
          mode="dropdown"
          style={{ textAlign:'center' }}
          selectedValue={provine}
          placeholder="Select your country"
          onValueChange={(e) => setProvine(e)}
        >
          {data.RECORDS.map((c) => {
            return <Picker.Item
              key={c.code}
              label={c.name_th}
              value={c.name_th}
            />
          })}
        </Picker>
      </Item>
    </View>
  )
}

export default TestApi

const styles = StyleSheet.create({})