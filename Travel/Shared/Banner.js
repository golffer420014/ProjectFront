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
                setBannerData(res.data); // อัปเดตข้อมูลแบนเนอร์ด้วยข้อมูลที่ได้จาก API
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
                        style={{ height: width / 2.5 }}
                        showButtons={true}
                        autoplay={true}
                        autoplayTimeout={3}
                        activeDotColor="#f36d72"
                    // dotStyle={{ width: 20, height: 5 }}
                    // activeDotStyle={{ width: 20, height: 5 }}
                        howsPagination={false} // ตั้งค่า showsPagination เป็น false เพื่อซ่อนจุดควบคุม
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item} // ควรใช้ key ที่ไม่ซ้ำกัน
                                    style={styles.imageBanner}
                                    resizeMode="stretch"
                                    source={{ uri: item.image }} // เปลี่ยนเป็น item.image
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 10 }}></View>
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
        marginTop: 10,
    },
    imageBanner: {
        height: width / 2.5,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
    },
});

export default Banner;