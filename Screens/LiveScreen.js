import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const LiveScreen = ({ navigation }) => {
  const apiData = [];
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch(
      "http://api.coinlayer.com/live?access_key=e93826fbcfb3e74d8064a30ebea86df5&expand=1"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        Object.keys(responseJson.rates).map((key, value) => {
          let tempData = {
            key: "",
            rate: "",
            high: "",
            low: "",
            vol: "",
            change: "",
            change_pct: "",
          };
          tempData.key = key;
          tempData.rate = responseJson.rates[key].rate
            ? responseJson.rates[key].rate.toFixed(3)
            : null;
          tempData.high = responseJson.rates[key].high
            ? responseJson.rates[key].high.toFixed(2)
            : null;
          tempData.low = responseJson.rates[key].low
            ? responseJson.rates[key].low.toFixed(2)
            : null;
          tempData.vol = responseJson.rates[key].vol
            ? responseJson.rates[key].vol.toFixed(3)
            : null;
          tempData.change = responseJson.rates[key].change
            ? responseJson.rates[key].change.toFixed(3)
            : null;
          tempData.change_pct = responseJson.rates[key].change_pct
            ? responseJson.rates[key].change_pct.toFixed(3)
            : null;
          apiData.push(tempData);
        });
        setIsLoading(false);
        setFilteredDataSource(apiData);
        setMasterDataSource(apiData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.key ? item.key.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <SafeAreaView style={styles.cardBody}>
          <View>
            <Text style={styles.cardTitle}>{item.key}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: 10,
            }}
          >
            <View style={[styles.subCard]}>
              <View style={styles.subCardInfo}>
                <Text style={styles.titleDescription}>Rate:</Text>
                {item.rate === null ? (
                  <Text style={styles.titleDescription}>null</Text>
                ) : (
                  <Text style={styles.titleDescription}>{item.rate}</Text>
                )}
              </View>
              <View style={styles.subCardInfo}>
                <Text style={styles.titleDescription}>Volume:</Text>
                {item.vol === null ? (
                  <Text style={styles.titleDescription}>null</Text>
                ) : (
                  <Text style={styles.titleDescription}>{item.vol}</Text>
                )}
              </View>
            </View>
            <View style={{ width: 10 }} />
            <View style={styles.subCard}>
              <View style={styles.subCardInfo}>
                <Text style={styles.titleDescription}>High:</Text>
                {Math.sign(item.high) === -1 || item.high === null ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.titleDescription}>{item.high}</Text>
                    <MaterialCommunityIcons
                      name="arrow-down"
                      color="red"
                      size={16}
                    />
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.titleDescription}>{item.high}</Text>
                    <MaterialCommunityIcons
                      name="arrow-up"
                      color="green"
                      size={16}
                    />
                  </View>
                )}
              </View>
              <View style={styles.subCardInfo}>
                <Text style={styles.titleDescription}>Low:</Text>
                {Math.sign(item.low) === -1 || item.low === null ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.titleDescription}>{item.low}</Text>
                    <MaterialCommunityIcons
                      name="arrow-down"
                      color="red"
                      size={16}
                    />
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.titleDescription}>{item.low}</Text>
                    <MaterialCommunityIcons
                      name="arrow-up"
                      color="green"
                      size={16}
                    />
                  </View>
                )}
              </View>
              <View style={styles.subCardInfo}>
                <Text style={styles.titleDescription}>Change:</Text>
                {Math.sign(item.change) === -1 || item.change === null ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.titleDescription}>0{item.change}</Text>
                    <MaterialCommunityIcons
                      name="arrow-down"
                      color="red"
                      size={16}
                    />
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.titleDescription}>0{item.change}</Text>
                    <MaterialCommunityIcons
                      name="arrow-up"
                      color="green"
                      size={16}
                    />
                  </View>
                )}
              </View>
              <View style={styles.subCardInfo}>
                <Text style={styles.titleDescription}>Change %:</Text>
                {Math.sign(item.change_pct) === -1 ||
                item.change_pct === null ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.titleDescription}>
                      0{item.change_pct}
                    </Text>
                    <MaterialCommunityIcons
                      name="arrow-down"
                      color="red"
                      size={16}
                    />
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.titleDescription}>
                      0{item.change_pct}
                    </Text>
                    <MaterialCommunityIcons
                      name="arrow-up"
                      color="green"
                      size={16}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEE" }}>
      <View>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        {isLoading === true ? (
          <View>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              animating={isLoading}
              style={{ justifyContent: "center", marginTop: "40%" }}
            />
            <Text
              style={{
                color: "#0000ff",
                textAlign: "center",
                fontSize: 25,
                paddingTop: 20,
              }}
            >
              Loading . . .{" "}
            </Text>
          </View>
        ) : null}

        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          progressViewOffset={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 27,
    borderColor: "transparent",
    backgroundColor: "#646fDD",
    shadowColor: "#000",
    elevation: 10,
  },
  cardBody: {
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,

    textAlign: "center",
    color: "#EEE",
  },
  subCard: {
    flex: 1,
    backgroundColor: "#EEE",
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 15,
    paddingVertical: 10,
  },
  subCardInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleDescription: {
    fontWeight: "bold",
    fontSize: 13,
    alignSelf: "center",
    paddingRight: 10,
  },
  textInputStyle: {
    marginTop: 17,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderColor: "#784fDD",
    backgroundColor: "#FFFFFF",
  },
});

export default LiveScreen;
