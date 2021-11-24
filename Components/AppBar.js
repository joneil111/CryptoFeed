import * as React from "react";
import { Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <Appbar.Header
      style={{
        position: "absolute",

        left: 0,
        right: 0,
        top: 0,

        marginLeft: 10,

        marginRight: 10,

        borderWidth: 1,

        borderRadius: 10,

        backgroundColor: "blue",

        paddingTop: Platform.OS === "android" ? 10 : 0,
      }}
    >
      {<MaterialCommunityIcons name="newspaper" size={24} color="white" />}
      <Appbar.Content title="News" />
    </Appbar.Header>
  );
};

export default Header;
