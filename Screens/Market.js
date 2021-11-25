import React, { useRef, useMemo, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import ListItem from "../Components/ListItem";
import Chart from "../Components/chart";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { getMarketData } from "../services/cryptoService";


export default function Market() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["60%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: "#ECECEC",
            paddingVertical: 10,
          }}
        >
          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({ item }) => (
              
              <ListItem
                
                name={item.name}
                symbol={item.symbol}
                currentPrice={item.current_price
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                priceChangePercentage7d={
                  item.price_change_percentage_7d_in_currency
                }
                logoUrl={item.image}
                
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
            currentPrice={selectedCoinData.current_price}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
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
