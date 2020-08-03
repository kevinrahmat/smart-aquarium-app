import * as React from 'react';
import auth from '@react-native-firebase/auth';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  onChangeText({field, value}) {
    this.setState({
      [field]: value,
    });
  }
  handleLogin() {
    const {email, password} = this.state;

    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  }
  render() {
    const {navigation} = this.props;
    const {email, password} = this.state;
    return (
      <KeyboardAvoidingView style={style.container}>
        <View style={{marginBottom: 100}}>
          <Text style={style.headline}>Hello,</Text>
          <Text style={style.headline}>Welcome Back</Text>
        </View>
        <View>
          <View style={{marginBottom: 24}}>
            <Text style={style.label}>Email</Text>
            <TextInput
              onChangeText={(value) =>
                this.onChangeText({value, field: 'email'})
              }
              placeholder="email"
              style={style.field}
              value={email}
            />
          </View>
          <View style={{marginBottom: 16}}>
            <Text style={style.label}>Password</Text>
            <TextInput
              onChangeText={(value) =>
                this.onChangeText({value, field: 'password'})
              }
              placeholder="password"
              secureTextEntry={true}
              style={style.field}
              value={password}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Button
              title="Login"
              color="#212121"
              style={style.submitBtn}
              onPress={this.handleLogin.bind(this)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.register}>Doesn't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[style.register, {fontWeight: 'bold'}]}>
                {' '}
                Register here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 55,
  },
  headline: {
    fontSize: 32,
    fontWeight: '500',
    color: '#464646',
  },
  label: {
    marginBottom: 8,
  },
  register: {
    fontSize: 12,
    color: '#464646',
  },
  field: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#212121',
    color: 'white'
  },
});
