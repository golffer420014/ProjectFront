import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import baseURL from './assests/common/baseUrl';

function TestApi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}products`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Brands and Images</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.brandText}>Brand: {item.brand}</Text>
            <Text style={styles.imageText}>Images:</Text>
            <FlatList
              data={item.images}
              keyExtractor={(image, index) => index.toString()}
              renderItem={({ item: image, index }) => (
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  key={index}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItem: {
    marginBottom: 16,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 4,
  },
});

export default TestApi;
