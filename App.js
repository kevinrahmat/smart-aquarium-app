
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardScreen, ControllerScreen, LoginScreen, RegisterScreen } from './src/modules';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Controller" component={ControllerScreen} />
        <Tab.Screen name="Account" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;