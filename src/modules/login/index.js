import * as React from 'react';
import {View, Text, TextInput} from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View>
          <Text>Hello</Text>
          <Text>Welcome Back</Text>
        </View>
        <View>
          <Text>Email</Text>
          <TextInput
            style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
            onChangeText={(text) => onChangeText(text)}
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            style={{height: 40, width: 250, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => onChangeText(text)}
          />
          <Text>Forgot Password?</Text>
        </View>
      </View>
    );
  }
}
