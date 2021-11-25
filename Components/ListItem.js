import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {
  //image and colour of directional arrows and num depending on price change value
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30';
  const priceChangeshapecolour = priceChangePercentage7d > 0 ? 'green' : 'red';
  const priceChangeshape = priceChangePercentage7d > 0 ? 'arrow-up' : 'arrow-down';
  //utilizing the values we passed we will populate the list item
  return (
    
    //allow each item to be clicked
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        
        {/* Left side */}
        <View style={styles.leftWrapper}>
          {/* image for the crypto currency */}
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{ name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        
        {/* Right side */}
        <View style={styles.rightWrapper}>
          {/* converting the currentPrice to currency format */}
          <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
          <Text style={[styles.subtitle, {color: priceChangeColor}]}>
            {/* provides the image we use to show directional arrows for the priceChangePercentage7d*/}
            <MaterialCommunityIcons
                        name={priceChangeshape}
                        color={priceChangeshapecolour}
                        size={16}
                      />
            {/* rounding priceChangePercentage7d to 2 decimal units */}
            {priceChangePercentage7d.toFixed(2)}%</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

//styles for this screen
const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 17,
    marginVertical: 10,
		borderWidth: 2,
		borderRadius: 27,
    borderColor: 'transparent',
    backgroundColor: '#fff',
    shadowColor: '#000',
    //elevation: 1,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: 'center',
  },
  image: {
    height: 48,
    width: 48,
  },
  titlesWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9ABB1",
  },
  rightWrapper: {
    alignItems: 'flex-end',
  },
})

export default ListItem