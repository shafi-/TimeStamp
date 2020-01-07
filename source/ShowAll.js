import React from 'react';
import { View, Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class ShowAll extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data.length);

    return (
      <View>
        <View></View>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            margin: 10,
            justifyContent: 'space-between',
          }}>
          <Text>Date</Text>
          <Text>Entry time</Text>
          <Text>Leave time</Text>
        </View>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              margin: 10,
              justifyContent: 'space-between',
            }}>
            <Text>{item.date}</Text>
            <Text>{item.time.entryTime}</Text>
            <Text>{item.time.leaveTime}</Text>
          </View>
        ))}
      </View>
    );
  }
}
