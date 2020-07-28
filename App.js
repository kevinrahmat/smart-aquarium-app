import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  MonitoringScreen,
  ControllerScreen,
  LoginScreen,
  RegisterScreen,
} from './src/modules';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Monitoring"
          component={MonitoringScreen}
          options={{
            tabBarLabel: 'Monitoring',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./src/assets/monitoring.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Controller"
          component={ControllerScreen}
          options={{
            tabBarLabel: 'Monitoring',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./src/assets/controlling.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
