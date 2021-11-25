import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native'
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


//set size from screen
const { width: SIZE } = Dimensions.get('window');


const Chart = ({ currentPrice, logoUrl, name, symbol, priceChangePercentage7d, sparkline }) => {
  
  //value to syncs the ui thread and javascript thread currentPrice variable so that the new charts value will be the current selected item
  const latestCurrentPrice = useSharedValue(currentPrice);
  //makes sure the chart is ready to render the next chart
  const [chartReady, setChartReady] = useState(false);

  //image and colour of directional arrows and num depending on price change value
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30';
  const priceChangeshapecolour = priceChangePercentage7d > 0 ? 'green' : 'red';
  const priceChangeshape = priceChangePercentage7d > 0 ? 'arrow-up' : 'arrow-down';

  //when the current price changes set the newest current price to latestCurrentPrice
  useEffect(() => {
    latestCurrentPrice.value = currentPrice;

    //wait before making the chart ready to display
    setTimeout(() => {
      setChartReady(true);
    }, 0)

  }, [currentPrice])

  //format the latestCurrentPrice
  const formatUSD = value => {
    'worklet';
    //if you arnt selecting anything on the graph display the current price
    if (value === '') {
      const formattedValue = `$${latestCurrentPrice.value.toLocaleString('en-US', { style: 'currency',currency: 'USD' })}`
      return formattedValue;
    }
    //display the price at that point
    const formattedValue =`$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    return formattedValue;
  };

  if (sparkline.length === 0) {
    return <Text>Loading...</Text>
  }

  return (
    //creates the chart path
    <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
      <View style={styles.chartWrapper}>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          {/* Creating the uppersection of the title*/}
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              {/*gets the image of the currency from the url */}
              <Image source={{ uri: logoUrl }} style={styles.image} />
              {/* Displays the name and symbol */}
              <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
            </View>
            <Text style={styles.subtitle}>7d</Text>
          </View>
          {/* Creating the lowersection of the title*/}
          <View style={styles.lowerTitles}>
            {/*render the value at the current position on the path*/}
            <ChartYLabel
              format={formatUSD}
              style={styles.boldTitle}
            />
            <Text style={[styles.title, {color: priceChangeColor}]}>
              <MaterialCommunityIcons
                          name={priceChangeshape}
                          color={priceChangeshapecolour}
                          size={16}
                        />
              {/*format priceChangePercentage7d */}
              {priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>
        {/*when the chart is ready then render the graph */}
        { chartReady ?
        (<View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="#0F4165" width={SIZE} />
          <ChartDot style={{ backgroundColor: '#0F4165' }} />
          </View>)

          :

          null
        
        }
        
      </View>
    </ChartPathProvider>
  )
}

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16
  },
  titlesWrapper: {
    marginHorizontal: 16
  },
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#A9ABB1',
  },
  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
});

export default Chart