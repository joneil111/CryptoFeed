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
      style={styles.background}
      source={require("../assets/logo.png")}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
