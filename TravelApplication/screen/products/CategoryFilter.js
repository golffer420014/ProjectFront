import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem, Badge, Item, Picker } from 'native-base';

const CategoryFilter = (props) => {
  const data = require('../../data/from.json');
  const [provine, setProvine] = useState('ทั้งหมด'); // Initialize province with 'ทั้งหมด'

  useEffect(() => {
    if (provine !== 'all') {
      props.categoryFilter('all', provine);
      props.setActive(-1);
    }
    if (props.categories.length > 0) {
      props.categoryFilter(props.categories[0].id, provine);
      props.setActive(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provine]);

  // console.log(provine)

  console.log(JSON.stringify(props.categories.name,null,2));

  return (
    <View style={{height: 180, top: 10}}>
      <View style={styles.pickerContainer}>
        <Item picker>
          <Picker
            mode="dropdown"
            selectedValue={provine}
            style={styles.picker}
            onValueChange={value => setProvine(value)}>
            {data.RECORDS.map(c => (
              <Picker.Item
                key={c.id}
                label={c.name_th}
                value={c.name_th}
                style={{
                  color: 'black',
                  textAlign: 'center',
                  backgroundColor: '#ffff',
                }}
              />
            ))}
          </Picker>
        </Item>
      </View>

      <ScrollView
        bounces={true}
        horizontal={true}
        style={{
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor:'#dfdfdf'
        }}>
        <ListItem
          style={{
            marginBottom: 0,
            padding: 0,
            borderRadius: 0,
            borderWidth: 0,
          }}>
          {props.categories.map(
            item =>
              (item.type === 'Search') &&
               (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    props.categoryFilter(item.id, provine);
                    props.setActive(props.categories.indexOf(item));
                  }}>
                  <View
                    style={[
                      styles.center,
                      {marginHorizontal: 10},
                      props.active == props.categories.indexOf(item)
                        ? styles.active
                        : styles.inactive,
                    ]}>
                    <Image
                      source={{uri: item.icon}}
                      style={{width: 50, height: 50, borderRadius: 30}}
                    />
                    <Text
                      style={[
                        styles.center,
                        {margin: 5, fontWeight: 'bold'},
                        props.active == props.categories.indexOf(item)
                          ? styles.active
                          : styles.inactive,
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
          )}
        </ListItem>
      </ScrollView>
    </View>
  );
};




const styles = StyleSheet.create({
  all: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: '#f36d72',

  },
  inactive: {
    color: 'black',
  },

  ALLactive: {
    backgroundColor: '#f36d72',

  },
  ALLinactive: {
  },

  pickerContainer: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: '#ffff',
    bottom: 10,
    left: 20,
    width: 200,
    // borderRadius: 30,
    // borderColor:'#f36d72'

  },


});

export default CategoryFilter;
