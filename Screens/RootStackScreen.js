import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen.js';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{
        headerShown: false
      }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
