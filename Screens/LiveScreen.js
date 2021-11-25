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

/*
  Create hooks that needs to be called inside a function components
  used for:
  * State management
  * Conditional rendering
  * Toggle flags (true/false)
  * Counter
  * Get API data and store it in a state
*/
const LiveScreen = ({ navigation }) => {
  const apiData = [];
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    // Get the data via the API
    fetch(
      "http://api.coinlayer.com/live?access_key=f85a0848af743a54be52332e3d35abae&expand=1"
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
          // Gets the key for each currency 
          tempData.key = key;
          // Gets the rate for each currency 
          tempData.rate = responseJson.rates[key].rate
            ? responseJson.rates[key].rate.toFixed(3)
            : null;
          // Gets the high value for each currency
          tempData.high = responseJson.rates[key].high
            ? responseJson.rates[key].high.toFixed(2)
            : null;
          // Gets the low value for each currency
          tempData.low = responseJson.rates[key].low
            ? responseJson.rates[key].low.toFixed(2)
            : null;
          // Gets the volume for each currency
          tempData.vol = responseJson.rates[key].vol
            ? responseJson.rates[key].vol.toFixed(3)
            : null;
          // Gets the change in value for each currency
          tempData.change = responseJson.rates[key].change
            ? responseJson.rates[key].change.toFixed(3)
            : null;
          // Gets the change in percentage for each currency
          tempData.change_pct = responseJson.rates[key].change_pct
            ? responseJson.rates[key].change_pct.toFixed(3)
            : null;
          // Add data to array
          apiData.push(tempData);
        });
        setIsLoading(false);
        setFilteredDataSource(apiData);
        setMasterDataSource(apiData);
      })
      // if theres an error, display it
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Search through the data for the text(name of the currrency) in the list of currencies
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

  // Display each currency's details in a card style
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <SafeAreaView style={styles.cardBody}>
          <View>
            {/*Display the title of the currency */}
            <Text style={styles.cardTitle}>{item.key}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: 10,
            }}
          >
            {/*Display the details of the currency */}
            <View style={[styles.subCard]}>
              <View style={styles.subCardInfo}>
                {/*Display the rate of the currency, if there is no value display null */}
                <Text style={styles.titleDescription}>Rate:</Text>
                {item.rate === null ? (
                  <Text style={styles.titleDescription}>null</Text>
                ) : (
                  <Text style={styles.titleDescription}>{item.rate}</Text>
                )}
              </View>
              <View style={styles.subCardInfo}>
                {/*Display the volume of the currency, if there is no value display null */}
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
                {/*Display the currency's high value */}
                <Text style={styles.titleDescription}>High:</Text>
                {/*If the value is null or negative one display the red down arrow otherwise display a green up arrow */}
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
                {/*Display the currency's low value*/}
                <Text style={styles.titleDescription}>Low:</Text>
                {/*If the value is null or negative one, display a red down arrow otherwise display a green up arrow */}
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
                {/*Display the currency's change value */}
                <Text style={styles.titleDescription}>Change:</Text>
                {/*If the value if null or negative one, display a red down arrow otherwise display a green up arrow */}
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
                {/*Display the currency's change percentage value */}
                <Text style={styles.titleDescription}>Change %:</Text>
                {/*If the value is null or negative one display a red down arrow otherwise display a green up arrow */}
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
        {/*Display the search area */}
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        {/*If the screen is loading, display a loading animation */}
        {isLoading === true ? (
          <View>
            <ActivityIndicator
              size="large"
              color="#082133"
              animating={isLoading}
              style={{ justifyContent: "center", marginTop: "60%" }}
            />
            <Text
              style={{
                color: "#082133",
                textAlign: "center",
                fontSize: 25,
                paddingTop: 20,
              }}
            >
              Loading . . .{" "}
            </Text>
          </View>
        ) : null}

        {/*Display the currencies on a flat list */}
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
{/*Properties of the display */}
const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "transparent",
    backgroundColor: "#082133",
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
    borderColor: "#082133",
    backgroundColor: "#FFFFFF",
  },
});

export default LiveScreen;
