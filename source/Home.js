import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';

import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import Styles from './Style';
import moment from 'moment';

export default class Home extends Component {
  entryTime() {
    let dateTime = new Date();
    let date = moment(dateTime).format('YYYY-MM-DD');
    let time = moment(dateTime).format('HH mm')
    console.log(time)
    let entryTime = {entryTime: time}
    Alert.alert('Set')
  }

  leaveTime() {
    let dateTime = new Date();
    let date = moment(dateTime).format('YYYY-MM-DD');
    let time = moment(dateTime).format('HH:mm')
    let leaveTime = {leaveTime: time}
    AsyncStorage.mergeItem(date, JSON.stringify(leaveTime), (err, res) => {
      console.log(err, res);
      AsyncStorage.getAllKeys((err, res) => {
        AsyncStorage.getItem(res[1], (err, res) => console.log(err, res))
      })
    });
  }

  render() {
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
          containerStyle={[Styles.buttonContainer, {marginTop: 100}]}
          buttonStyle={Styles.buttonStyle}
          onPress={() => this.leaveTime()}
        />
      </View>
    );
  }
}
