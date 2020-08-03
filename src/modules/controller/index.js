import * as React from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

export default class ControllerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  handleChangeStatus(data) {
    database()
      .ref('/status')
      .update({
        ...data,
      })
      .then(() => console.log('Data updated.'));
  }

  handleLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  componentDidMount() {
    database()
      .ref('/')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        this.setState({data});
      });
  }

  render() {
    const {data} = this.state;
    const {
      status = {},
      temperature = {},
      turbidity = {},
      sensor = '{"temperature":0,"turbidity":0}',
    } = data || {};

    const {
      temperature: temperature_current_value,
      turbidity: turbidity_current_value,
    } = JSON.parse(sensor);

    const {
      auto_mode = false,
      heater = false,
      pump = false,
      vlc = false,
    } = status;
    const {
      min_value: turbidity_min_value = 0,
      status: turbidity_status = false,
    } = turbidity;
    const {
      min_value: temperature_min_value = 0,
      status: temperature_status = false,
    } = temperature;

    return (
      <View style={style.container}>
        <View style={style.content}>
          <TouchableOpacity
            onPress={this.handleChangeStatus.bind(this, {
              auto_mode: !auto_mode,
            })}
            style={[
              style.card,
              {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#60BB64',
              },
            ]}>
            <View>
              <Text
                style={[
                  style.title,
                  {
                    color: 'white',
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                Mode
              </Text>
              <Text style={[style.subTitle, {color: 'white'}]}>
                {auto_mode ? 'Auto' : 'Manual'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[style.content, style.height1]}>
          <TouchableOpacity
            onPress={this.handleChangeStatus.bind(this, {
              pump: !pump,
            })}
            style={[
              style.card,
              {alignItems: 'center', justifyContent: 'center', marginRight: 20},
              pump
                ? {backgroundColor: '#60BB64'}
                : {borderWidth: 1, borderColor: '#F14D49'},
            ]}>
            <Text
              style={[
                style.title,
                {marginBottom: 10},
                pump ? {color: 'white'} : {color: '#F14D49'},
              ]}>
              Pump Status{' '}
            </Text>
            <Text
              style={[
                style.subTitle,
                pump ? {color: 'white'} : {color: '#F14D49'},
              ]}>
              {pump ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleChangeStatus.bind(this, {
              heater: !heater,
            })}
            style={[
              style.card,
              {alignItems: 'center', justifyContent: 'center'},
              heater
                ? {backgroundColor: '#60BB64'}
                : {borderWidth: 1, borderColor: '#F14D49'},
            ]}>
            <Text
              style={[
                style.title,
                {marginBottom: 10},
                heater ? {color: 'white'} : {color: '#F14D49'},
              ]}>
              Heater Status{' '}
            </Text>
            <Text
              style={[
                style.subTitle,
                heater ? {color: 'white'} : {color: '#F14D49'},
              ]}>
              {heater ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[style.content, style.height1]}>
          <View
            style={[style.card, {marginRight: 20, backgroundColor: '#498CF1'}]}>
            <View style={{maxWidth: 100}}>
              <Text style={[style.title, {color: 'white'}]}>
                Minimum Temperature
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[style.subTitle, {color: 'white'}]}>
                {temperature_min_value}°C
              </Text>
            </View>
          </View>
          <View style={[style.card, {backgroundColor: '#B149F1'}]}>
            <View style={{maxWidth: 80}}>
              <Text style={[style.title, {color: 'white'}]}>
                Maximum Turbidity
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[style.subTitle, {color: 'white', alignSelf: 'center'}]}>
                {turbidity_min_value} NTU
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Button
            style={style.submitBtn}
            title="Logout"
            onPress={this.handleLogout.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  inCardList: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 14,
  },
  subTitle: {
    fontSize: 34,
  },
});
