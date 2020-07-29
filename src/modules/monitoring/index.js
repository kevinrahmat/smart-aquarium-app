import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

export default class MonitoringScreen extends React.Component {
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
        <View style={[style.content, style.height1]}>
          <View
            style={[style.card, {marginRight: 20, backgroundColor: '#498CF1'}]}>
            <View style={{maxWidth: 100}}>
              <Text style={[style.title, {color: 'white'}]}>
                Current Temperature
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[style.subTitle, {color: 'white'}]}>
                {temperature_current_value}°C
              </Text>
            </View>
          </View>
          <View style={[style.card, {backgroundColor: '#B149F1'}]}>
            <View style={{maxWidth: 60}}>
              <Text style={[style.title, {color: 'white'}]}>
                Current Turbidity
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[style.subTitle, {color: 'white', alignSelf: 'center'}]}>
                {turbidity_current_value} NTU
              </Text>
            </View>
          </View>
        </View>

        <View style={style.content}>
          <View style={[style.card, { justifyContent: 'space-between' }]}>
            <View style={style.inCardList}>
              <Text>Minimum Temperature </Text>
              <Text style={{ fontWeight: 'bold' }}>{temperature_min_value}°</Text>
            </View>
            <View style={style.inCardList}>
              <Text>Maximum Turbidity </Text>
              <Text style={{ fontWeight: 'bold' }}>{turbidity_min_value} NTU</Text>
            </View>
          </View>
        </View>

        <View style={[style.content, {marginBottom: 0, flex: 1.5}]}>
          <View style={style.card}>
            <View style={[style.inCardList, {marginBottom: 20}]}>
              <Text>Controller Mode </Text>
              <Text style={{ fontWeight: 'bold' }}>{auto_mode ? 'Auto' : 'Manual'}</Text>
            </View>
            <View style={[style.inCardList, {marginBottom: 20}]}>
              <Text>VLC Status </Text>
              <Text style={{ fontWeight: 'bold' }}>{vlc ? 'Working' : 'Not Working'}</Text>
            </View>
            <View style={[style.inCardList, {marginBottom: 20}]}>
              <Text>Pump Status </Text>
              <Text style={{ fontWeight: 'bold' }}>{pump ? 'Working' : 'Not Working'}</Text>
            </View>
            <View style={[style.inCardList]}>
              <Text>Heater Status </Text>
              <Text style={{ fontWeight: 'bold' }}>{heater ? 'Working' : 'Not Working'}</Text>
            </View>
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
    fontSize: 14,
    fontWeight: 'normal',
  },
  subTitle: {
    fontSize: 32,
    fontWeight: '100',
  },
});
