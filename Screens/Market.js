import React, { useRef, useMemo, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import ListItem from "../Components/ListItem";
import Chart from "../Components/chart";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { getMarketData } from "../services/cryptoService";

//show the market change of the top crypto currencies over the past week
export default function Market() {
  //data from api
  const [data, setData] = useState([]);
  //stores most recent data of a coin
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  //get the data
  useEffect(() => {
    //function to ffetch the data and set it
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  //reference to modal
  const bottomSheetModalRef = useRef(null);

  //how much of the screen the bottom sheet will occupy
  const snapPoints = useMemo(() => ["60%"], []);

    //open the bottom sheet using the most recent clicked items data
  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      {/* safe area view prevents the scroll from moving over the other components*/}
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: "#ECECEC",
            paddingVertical: 10,
          }}
        >
          {/*displays data in a scrollable list*/}
          <FlatList
            //splitting the data from the api so we can create a listitem for each crypto currency
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({ item }) => (
              //creates each list item
              <ListItem
                
                name={item.name}
                symbol={item.symbol}
                //formats the currentPrice
                currentPrice={item.current_price
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                priceChangePercentage7d={
                  item.price_change_percentage_7d_in_currency
                }
                logoUrl={item.image}
                //Opens the modal and takes in the current data of that coin selected as parameters
                onPress={() => openModal(item)}
              />
              
            )}
           
          />
        </View>
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}

      >
        {selectedCoinData ? (
          <Chart
            // passing in all the data for the current selected coin
            currentPrice={selectedCoinData.current_price.toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
            //this item is responsible for the graph line
            sparkline={selectedCoinData?.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

//styles for this screen
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#EEEE",
  },

});
