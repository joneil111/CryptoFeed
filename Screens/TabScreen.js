import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Market from "./Market";
import Home from "./Home";
import NewsScreen from "../NewsScreen";
import DetailsScreen from './DetailsScreen';
import LiveScreen from   './LiveScreen';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#1b73b3" },
        headerTintColor: "#EEE",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{ title: "Home" }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Historic CryptoCurrency" }}
      />
    </Stack.Navigator>
  );
}
function LiveStack() {
	return (
		<Stack.Navigator
			initialRouteName="Live"
			screenOptions={{
				headerStyle: { backgroundColor: '#082133' },
				headerTintColor: '#EEE',
				headerTitleStyle: { fontWeight: 'bold' }
			}}>
			<Stack.Screen
				name="Live"
				component={LiveScreen}
				options={{ title: 'Live Currency' }} />
		</Stack.Navigator>
	);
}

function NewsStack() {
	return (
		<Stack.Navigator
			initialRouteName="News"
			screenOptions={{
				headerStyle: { backgroundColor: '#155A8B' },
				headerTintColor: '#EEE',
				headerTitleStyle: { fontWeight: 'bold' }
			}}>
			<Stack.Screen
				name="News"
				component={NewsScreen}
				options={{ title: 'News' }} />
		</Stack.Navigator>
	);
}

function MarketStack() {
	return (
		<Stack.Navigator
			initialRouteName="Market"
			screenOptions={{
				headerStyle: { backgroundColor: '#0F4165' },
				headerTintColor: '#EEE',
				headerTitleStyle: { fontWeight: 'bold' }
			}}>
			<Stack.Screen
				name="Market"
				component={Market}
				options={{ title: 'Market' }} />
		</Stack.Navigator>
	);
}

const TabNavigator = (navigation) => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor="#fff"
    shifting={true}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#1b73b3",
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="News"
      component={NewsStack}
      options={{
        tabBarLabel: "News",
        tabBarColor: "#155A8B",
        tabBarIcon: ({ color }) => (
          <Entypo name="news" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Market"
      component={MarketStack}
      options={{
        tabBarLabel: "Market",
        tabBarColor: "#0F4165",
        tabBarIcon: ({ color }) => (
          <AntDesign name="linechart" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Live"
      component={LiveStack}
      options={{
        tabBarLabel: "Live",
        tabBarColor: "#082133",
        tabBarIcon: ({ color }) => (
          <AntDesign name="earth" color={color} size={23} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function Tabscreen() {
  return <TabNavigator />;
}
