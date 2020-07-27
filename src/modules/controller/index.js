import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

export default class ControllerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    database()
      .ref('/')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        console.log('Status data: ', data);
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
          <View style={style.card}>
            <View style={[style.inCardList]}>
              <Text>Auto Mode </Text>
              <Text>{auto_mode ? 'Auto' : 'Manual'}</Text>
            </View>
          </View>
        </View>
        <View style={[style.content, style.height1]}>
          <View style={[style.inCardList, {marginRight: 20}]}>
            <Text>Pump Status </Text>
            <Text>{pump ? 'On' : 'Off'}</Text>
          </View>
          <View style={[style.inCardList]}>
            <Text>Heater Status </Text>
            <Text>{heater ? 'On' : 'Off'}</Text>
          </View>
        </View>
        <View style={[style.content, style.height1]}>
          <View style={[style.card, {marginRight: 20}]}>
            <Text>{temperature_current_value}°</Text>
          </View>
          <View style={style.card}>
            <Text>{turbidity_current_value} NTU</Text>
          </View>
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
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    padding: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});