import { StyleSheet, Text, View } from 'react-native'
import React , {useState,useEffect} from 'react'
import axios from 'axios'



const TestApi = () => {

    const [data, setData] = useState()

    useEffect(() => {
        const API = "GxOgIxcml4oDKsgIqZcAJEzvChS1PmtFAjFx9azS)8OB2d5xd5f5cDNsT)ZWh(wRFNNj(Rzs9JDGjKwuonQNFRG=====2"
        axios
            .get(`https://tatapi.tourismthailand.org/tatapi/v5/attraction/P03000001`, {
                headers: {
                    Authorization: `Bearer ${API}`,
                    "Accept-Language": "TH"
                },
            })
            .then((res) => setData(res.data)) // แก้ไขจาก setData(res) เป็น setData(res.data)
    }, [])



  return (
    <View>
      <Text>TestApi</Text>
    </View>
  )
}

export default TestApi

const styles = StyleSheet.create({})