import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem, Badge, Item, Picker } from 'native-base';

const CategoryFilter = (props) => {
  const data = require('../../data/from.json');
  const [provine, setProvine] = useState('all'); // Initialize province with 'all'

    useEffect(() => {
        if (provine !== 'all') {
            props.categoryFilter('all', provine);
            props.setActive(-1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provine]);



  return (
    <View>
      <Item picker style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          selectedValue={provine}
          style={styles.picker}
          onValueChange={(value) => setProvine(value)}
        >
          {data.RECORDS.map((c) => (
            <Picker.Item
              key={c.code}
              label={c.name_th}
              value={c.name_th}
                  style={{
                      color: 'black',
                      textAlign:'center'
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
        <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
          <TouchableOpacity
            key={1}
            onPress={() => {
              props.categoryFilter('all', provine);
              props.setActive(-1);
            }}
          >
            <Badge
                          style={[styles.center, { margin: 5 },
                          props.active == -1 ? styles.active : styles.inactive
                          ]}
            >
              <Text style={{ color: 'white' }}>All</Text>
            </Badge>
          </TouchableOpacity>
          {props.categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                props.categoryFilter(item.id, provine);
                props.setActive(props.categories.indexOf(item));
              }}
            >
              <Badge
                      style={[styles.center,
                      { margin: 5 },
                      props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                      ]}
              >
                <Text style={{ color: 'white' }}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          ))}
        </ListItem>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#f36d72'
  },
  inactive: {
    backgroundColor: 'gray'
  },
  pickerContainer: {
    borderWidth: 1,
    position:'absolute',
    zIndex:99,
    backgroundColor:'#fff',
      bottom: -52,

  },

});

export default CategoryFilter;
