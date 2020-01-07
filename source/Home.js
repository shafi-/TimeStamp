import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';

import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import Styles from './Style';
import ShowAll from './ShowAll';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlltime: false,
      data: [],
    };
  }

  entryTime() {
    let dateTime = new Date();
    let date = moment(dateTime).format('YYYY-MM-DD');
    let time = moment(dateTime).format('HH mm');
    // console.log(time);
    let entryTime = { entryTime: time };
    Alert.alert(
      'Set entry time',
      'Are sure to set current time as entry time?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.setItem(
              date,
              JSON.stringify(entryTime),
              (err, res) => {
                if (!err) {
                  alert(
                    moment(dateTime).format('hh:mma') +
                      ' has been set as your entry time',
                  );
                }
              },
            );
          },
        },
      ],
    );
  }

  leaveTime() {
    let dateTime = new Date();
    let date = moment(dateTime).format('YYYY-MM-DD');
    let time = moment(dateTime).format('HH:mm');
    let leaveTime = { leaveTime: time };
    Alert.alert(
      'Set Leave time',
      'Are sure to set current time as leave time?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.mergeItem(
              date,
              JSON.stringify(leaveTime),
              (err, res) => {
                if (!err) {
                  alert(
                    moment(dateTime).format('hh:mma') +
                      ' has been set as your leave time',
                  );
                }
              },
            );
          },
        },
      ],
    );
  }

  updateState(obj) {
    this.setState(obj);
  }

  async showAlltime() {
    var data = [];
    const res = await AsyncStorage.getAllKeys();
    if (res.length > 0) {
      data = await Promise.all(
        res.map(async date => ({
          date,
          time: await AsyncStorage.getItem(date),
        })),
      );
      data = data.map(dateInfo => ({
        date: dateInfo.date,
        time: JSON.parse(dateInfo.time),
      }));
      this.setState({ data, showAlltime: true });
    }
  }

  render() {
    const { showAlltime, data } = this.state;

    if (!showAlltime) {
      return (
        <View style={Styles.container}>
          <Button
            title="IN"
            containerStyle={Styles.buttonContainer}
            buttonStyle={Styles.buttonStyle}
            onPress={() => this.entryTime()}
          />
          <Button
            title="OUT"
            containerStyle={[Styles.buttonContainer, { marginTop: 80 }]}
            buttonStyle={Styles.buttonStyle}
            onPress={() => this.leaveTime()}
          />

          <Button
            title="Show previous times"
            containerStyle={[Styles.buttonContainer, { marginTop: 80 }]}
            buttonStyle={Styles.buttonStyle}
            onPress={() => this.showAlltime()}
          />
        </View>
      );
    }

    return <ShowAll data={data} updateState={this.updateState.bind(this)} />;
  }
}
