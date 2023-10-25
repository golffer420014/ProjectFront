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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provine]);

  // console.log(provine)


  return (
    <View>
      <Item picker style={styles.pickerContainer}>
        <Picker
          mode="dialog"
          selectedValue={provine}
          style={styles.picker}
          onValueChange={(value) => setProvine(value)}
        >
          {data.RECORDS.map((c) => (
            <Picker.Item
              key={c.id}
              label={c.name_th}
              value={c.name_th}
              style={{
                color: 'black',
                textAlign: 'center'
              }}
            />
          ))}
        </Picker>
      </Item>
      <ScrollView
        bounces={true}
        horizontal={true}
        style={{ backgroundColor: '#ffffff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
      >
        <ListItem style={{ marginBottom: 0, padding: 0, borderRadius: 0 }}>
          <TouchableOpacity
            key={1}
            onPress={() => {
              props.categoryFilter('all', provine);
              props.setActive(-1);
            }}
          >
            <View
              style={[styles.all,
              { marginHorizontal:10  },
              ]}
            >
              <Image
                source={require('../../assests/all.png')}
                style={[props.active == -1 ? styles.ALLactive : styles.ALLinactive ,
                  { width: 50, height: 50, borderRadius: 30,}
                 ]}
              />
              <Text style={[styles.all, { margin: 5, fontWeight: 'bold' },
              props.active == -1 ? styles.active : styles.inactive
              ]} >All</Text>
            </View>
              {/* <Text style={[styles.all, { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive
              ]}>All</Text> */}
          </TouchableOpacity>
          {props.categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                props.categoryFilter(item.id, provine);
                props.setActive(props.categories.indexOf(item));
              }}
            >
              <View
                style={[styles.center,
                { marginHorizontal:10 },
                props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                ]}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 50, height: 50, borderRadius: 30 }}
                />
                <Text style={[styles.center,
                { margin: 5,fontWeight:'bold' },
                props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                ]}>{item.name}</Text>
              </View>
              
            </TouchableOpacity>
          ))}
        </ListItem>
      </ScrollView>
    </View>
  );
};




const styles = StyleSheet.create({
  all:{
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
    bottom: -60,
    right: 20,
    width:200,
    // borderRadius: 30,
    // borderColor:'#f36d72'
    
  },


});

export default CategoryFilter;
