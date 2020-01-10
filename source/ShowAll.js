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
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{ flex: 3 }}>Date</Text>
          <Text style={{ flex: 2 }}>Entry time</Text>
          <Text style={{ flex: 2 }}>Leave time</Text>
          <Text style={{ flex: 3 }}>Working hour</Text>
        </View>
        {data.map((item, index) => {
          var timeStart = moment(
            item.date + item.time.entryTime,
            'YYYY-MM-DD hh:mm',
          ).format('ddd MMM DD YYYY HH:mm:ss Z');
          var timeEnd = moment(
            item.date + item.time.leaveTime,
            'YYYY-MM-DD hh:mm',
          ).format('ddd MMM DD YYYY HH:mm:ss Z');

          // console.log(timeStart.getHours(), timeEnd.getHours());

          // var hourDiff = moment(timeEnd).diff(timeStart, 'hours');
          var minDiff = moment(timeEnd).diff(timeStart, 'minutes');
          var hourDiff = Math.floor(minDiff / 60);
          minDiff = minDiff - hourDiff * 60;
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: index % 2 == 0 ? '#ECEFF1' : '#E0E0E0',
                borderTopWidth: 0,
                padding: 5,
                paddingVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{ flex: 3 }}>{item.date}</Text>
              <Text style={{ flex: 2 }}>{item.time.entryTime}</Text>
              <Text style={{ flex: 2 }}>{item.time.leaveTime}</Text>
              {!!item.time.leaveTime && (
                <Text style={{ flex: 3 }}>
                  {hourDiff} Hours {minDiff} minutes
                </Text>
              )}
              {!item.time.leaveTime && <View style={{flex: 3}} />}
            </View>
          );
        })}
      </View>
    );
  }
}
