import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";

import Market from "./Market";
import News from "./News";
import Home from "./Home";
import NewsScreen from "../NewsScreen";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = (navigation) => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor="#fff"
    shifting={true}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#009387",
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
