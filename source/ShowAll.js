import React from 'react';
import { View, Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default class ShowAll extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data.length);

    return (
      <View>
        <View
          style={{
            height: 60,
            backgroundColor: '#558B2F',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Icon
            name="arrowleft"
            type="antdesign"
            color="white"
            iconStyle={{ marginLeft: 15 }}
            onPress={() => this.props.updateState({ showAlltime: false })}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#90A4AE',
            margin: 10,
            marginBottom: 0,
            padding: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{ flex: 3 }}>Date</Text>
          <Text style={{ flex: 2 }}>Entry time</Text>
          <Text style={{ flex: 2 }}>Leave time</Text>
          <Text style={{ flex: 2 }}>Working hour</Text>
        </View>
        {data.map((item, index) => {
          var timeStart = new Date(item.date + ' ' + item.time.entryTime);
          var timeEnd = new Date(item.date + ' ' + item.time.leaveTime);

          console.log(timeStart, timeEnd);

          var hourDiff = timeEnd - timeStart;
          console.log(hourDiff);
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: '#CFD8DC',
                borderTopWidth: 0,
                padding: 5,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{ flex: 3 }}>{item.date}</Text>
              <Text style={{ flex: 2 }}>{item.time.entryTime}</Text>
              <Text style={{ flex: 2 }}>{item.time.leaveTime}</Text>
              <Text style={{ flex: 2 }}>{moment(hourDiff).hours}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
