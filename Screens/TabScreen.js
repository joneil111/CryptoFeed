import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import { createStackNavigator } from '@react-navigation/stack';

import Market from "./Market";
import News from "./News";
import Home from "./Home";
import NewsScreen from "../NewsScreen";
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
			headerStyle: { backgroundColor: '#E9F0FB' },
			headerTintColor: '#5B628F',
			headerTitleStyle: { fontWeight: 'bold' }
			}}>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ title: 'Home' }}/>
			<Stack.Screen
				name="Details"
				component={DetailsScreen}
				options={{ title: 'Historic CryptoCurrency' }} />
		</Stack.Navigator>
	);
}

const TabNavigator = (navigation) => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor="#fff"
    shifting={true}
    style={{ borderRadius: 10 }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#1b73b3",
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="News"
      component={NewsScreen}
      options={{
        tabBarLabel: "News",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <AntDesign name="infocirlceo" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Market"
      component={Market}
      options={{
        tabBarLabel: "Market",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <AntDesign name="linechart" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function Tabscreen() {
  return <TabNavigator />;
}
