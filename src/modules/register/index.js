import * as React from 'react';
import {View, Text, Button} from 'react-native';

export default class RegisterScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Register Screen</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  }
}
