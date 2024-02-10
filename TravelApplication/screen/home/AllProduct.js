import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import baseURL from '../../assests/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';
import FormContainer from '../../Shared/Form/FormContainer';
import ProductList from '../products/ProductList';

const AllProduct = (props) => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useFocusEffect(
      useCallback(() => {
        // fetchData();

        
        axios
          .get(`${baseURL}products`)
          .then(res => {
            setProducts(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log('home call api proucts error');
            setLoading(true);
          });

        

        return () => {
          setLoading(true);
          setProducts([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []),
    );

     if (loading == true) {
       return (
         <View
           style={{
             flex: 1,
             justifyContent: 'center',
             alignItems: 'center',
             backgroundColor: '#ffff',
           }}>
           <ActivityIndicator size="large" color="#f36d72" />
         </View>
       );
     }


  return (
    <FormContainer>
      <ScrollView>
        <View style={styles.listContainer}>
          {products.map(
            item =>
              // กรองเฉพาะ items ที่มี category.name ไม่เป็น 'ที่พัก' และ 'อาหาร'
              !(
                item.category.name === 'ที่พัก' ||
                item.category.name === 'อาหาร'
              ) && (
                <View style={{width: '50%'}} key={item.id}>
                  <ProductList navigation={props.navigation} item={item} />
                </View>
              ),
          )}
        </View>
      </ScrollView>
    </FormContainer>
  );
}

export default AllProduct

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop:-10
    // backgroundColor: '#dfdfdf',
  },
});