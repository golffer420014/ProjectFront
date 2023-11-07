import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";
import baseURL from "../assests/common/baseUrl";

var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        axios
            .get(`${baseURL}event`)
            .then((res) => {
                setBannerData(res.data.slice(0, 2)); // อัปเดตข้อมูลแบนเนอร์ด้วยข้อมูลที่ได้จาก API
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width /2 }}
                        showButtons={false}
                        autoplayTimeout={3}
                        autoplay={true}
                        activeDotColor="white"
                        dotStyle={{ width: 10, height: 10,  }}
                        activeDotStyle={{ width: 10, height: 10 }}
                    >
                        {bannerData.map((item,index) => {
                            return (
                                <Image
                                    key={item.id} // ควรใช้ key ที่ไม่ซ้ำกัน
                                    style={styles.imageBanner}
                                    resizeMode="stretch"
                                    source={{
                                        uri: item.image 
                                    }} // เปลี่ยนเป็น item.image
                                />
                            );
                        })}
                    </Swiper>
                    {/* <View style={{ height: 10 }}></View> */}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gainsboro",
    },
    swiper: {
        width: width,
        alignItems: "center",
        padding:10
    },
    imageBanner: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 5,
    },
});

export default Banner;