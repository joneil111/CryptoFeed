import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { AuthContext } from "./Components/contents";
import Home from "./Screens/Home";
import RootStackScreen from "./Screens/RootStackScreen";
import Tabscreen from "./Screens/TabScreen";
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
export default function App() {
  
  // state to control if splash is loading
  const initialLoginState = {
    isLoading: true,
  };
  //create context for sign in
  const authContext = React.useMemo(
    () => ({
      //when sign in called dispatch login state
      signIn: async (leave) => {
        if (leave !== true) {
          dispatch({ type: "LOGIN" });
        }
      },
    }),
    []
  );
  //controlls login state. This format allows for later implementation of Sign in and sign out screens
  const loginReducer = (prevstate, action) => {
    switch (action.type) {
      //when case called set loading to false
      case "LOGIN":
        return {
          isLoading: false,
        };
    }
  };

  //set loginstate
  const [loginstate, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  return (
    //creating context provider for autoContext
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/*if isloading is true then show splash else tab screen */}
        {!loginstate.isLoading ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="CryptoFeed"
              component={Tabscreen}
              options={{
                headerStyle: {
                  backgroundColor: "#659db4",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
