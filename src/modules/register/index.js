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
      name: '',
      email: '',
      password: '',
      password_verification: '',
    };
  }
  onChangeText({field, value}) {
    this.setState({
      [field]: value,
    });
  }
  handleRegister() {
    const {email, password, password_verification} = this.state;

    if (email && password) {
      if (password === password_verification) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            Alert.alert('User account created & signed in!');
          })
          .catch((error) => {
            Alert.alert('Error', error.message);
          });
      } else {
        Alert.alert('Error', "Password not match");
      }
    }
  }
  render() {
    const {navigation} = this.props;
    const {email, password, name, password_verification} = this.state;
    return (
      <KeyboardAvoidingView style={style.container}>
        <View style={{marginBottom: 20}}>
          <Text style={style.headline}>Welcome,</Text>
          <Text style={style.headline}>Smart Aquarium</Text>
        </View>
        <View>
          <View style={{marginBottom: 24}}>
            <Text style={style.label}>Name</Text>
            <TextInput
              onChangeText={(value) =>
                this.onChangeText({value, field: 'name'})
              }
              placeholder="name"
              style={style.field}
              value={name}
            />
          </View>
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
          <View style={{marginBottom: 16}}>
            <Text style={style.label}>Password verification</Text>
            <TextInput
              onChangeText={(value) =>
                this.onChangeText({value, field: 'password_verification'})
              }
              placeholder="password verification"
              secureTextEntry={true}
              style={style.field}
              value={password_verification}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Button
              title="Register"
              color="#212121"
              style={style.submitBtn}
              onPress={this.handleRegister.bind(this)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.register}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[style.register, {fontWeight: 'bold'}]}>
                {' '}
                Login here
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
  submitBtn: {},
});
