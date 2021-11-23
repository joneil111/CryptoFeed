import React from "react";
import { Text, View, StyleSheet } from "react-native";
import NewsScreen from "../NewsScreen";

const HelloWorldApp = () => {
  return (
    <View style={styles.container}>
      <NewsScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HelloWorldApp;
