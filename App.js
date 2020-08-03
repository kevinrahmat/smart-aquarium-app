import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import auth from '@react-native-firebase/auth';

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

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
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
            initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

export default App;
