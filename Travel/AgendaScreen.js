import React, {useState} from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
// import Typography from '../components/Typography';

const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const AgendaScreen = () => {
  const [items, setItems] = useState({});
  const selectedDate = Object.keys(items);
  const check = '2024-01-19';

  const result = selectedDate.some(item => item === check);

  if (result) {
    console.log('ok');
  } else {
    console.log('not found');
  }

//   console.log(JSON.stringify(selectedDate, null, 2));


  const loadItems = day => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name:strTime,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = item => {
     const date = item.date;
     const items = [
       {date: '2023-07-20', text: '2132'},
    //    {date: '2023-07-21', text: '2133'},
     ];

    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 50}}
      onPress={() => console.log(1)}
      >
          <View>
            {items.map((item) => (
             <View>
                <Text>{item.text}</Text>
             </View>
            ))}
          </View>
      </TouchableOpacity>
    );
  };
  const today = new Date();
  

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AgendaScreen;
