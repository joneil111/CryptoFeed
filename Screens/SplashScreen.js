import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { AuthContext } from "../Components/contents";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  //const [signinReady, setsigninReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      signIn();
    }, 4000);
  }, []);

  return (
    <ImageBackground
      style={styles2.background}
      source={require("../assets/logo.png")}
    ></ImageBackground>
  );
}

const styles2 = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
});
