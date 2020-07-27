import * as React from 'react';
import {View, Text} from 'react-native';
import database from '@react-native-firebase/database';

export default class DashboardScreen extends React.Component {
  componentDidMount() {
    database()
      .ref('/status')
      .on('value', (snapshot) => {
        console.log('Status data: ', snapshot.val());
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
        }}>
        <View style={{display: 'flex'}}>
          <View>
            <Text>80°</Text>
          </View>
          <View>
            <Text>80°</Text>
          </View>
        </View>
      </View>
    );
  }
}
