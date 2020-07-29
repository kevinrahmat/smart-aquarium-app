import * as React from 'react';
import {Image} from 'react-native';
// import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {
  MonitoringScreen,
  ControllerScreen,
  LoginScreen,
  RegisterScreen,
} from './src/modules';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
    };
  }
  handleLogin () {
    this.setState({
      isLoggedIn: true,
    });
  }
  render() {
    const {isLoggedIn} = this.state;
    return (
      <NavigationContainer>
        {isLoggedIn ? (
          <>
            <Tab.Navigator>
              <Tab.Screen
                name="Monitoring"
                component={MonitoringScreen}
                options={{
                  tabBarLabel: 'Monitoring',
                  tabBarIcon: ({color, size}) => (
                    <Image source={require('./src/assets/monitoring.png')} />
                  ),
                }}
              />
              <Tab.Screen
                name="Controller"
                component={ControllerScreen}
                options={{
                  tabBarLabel: 'Controlling',
                  tabBarIcon: ({color, size}) => (
                    <Image source={require('./src/assets/controlling.png')} />
                  ),
                }}
              />
            </Tab.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Home">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    );
  }
}
