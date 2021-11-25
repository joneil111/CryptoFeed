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
  const [isLoading, setisloading] = React.useState(true);
  const [userToken, setuserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (leave) => {
        // setuserToken("fgkl");
        // setisloading(false);

        if (leave !== true) {
          dispatch({ type: "LOGIN" });
        }
        //console.log('user token',username);
      },
    }),
    []
  );

  const loginReducer = (prevstate, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          isLoading: false,
        };
    }
  };

  const [loginstate, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!loginstate.isLoading ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="DigiCoin"
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
