import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  
} from "react-native";

import { AuthContext } from "../Components/contents";

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
    >
        <Image source={require("../assets/logo2.png")} style={styles.background}></Image>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: "center",
    width:null,
    height:null,
  },
});
