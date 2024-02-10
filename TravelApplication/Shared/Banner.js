import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import baseURL from "../assests/common/baseUrl";
import { SliderBox } from "react-native-image-slider-box";

var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}event`)
            .then((res) => {
                // Assuming res.data is an array of objects with an image property
                const imageUrls = res.data.map(item => item.image);
                setBannerData(imageUrls); // Set the bannerData state with the array of URLs
            })
        
    }, []);

    // console.log(JSON.stringify(bannerData,null,2))


    return (
      <View style={styles.container}>
        <SliderBox
          images={bannerData}
          autoplay={true}
          dotColor="#f36d72"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 10, // Your desired inactive dot width
            height: 10, // Your desired inactive dot height
          }}
          circleLoop
          ImageComponentStyle={{width:'95%',borderRadius:20}}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop:3,
    },
    
});

export default Banner;




