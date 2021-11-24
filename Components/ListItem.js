import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30';
  const priceChangeshapecolour = priceChangePercentage7d > 0 ? 'green' : 'red';
  const priceChangeshape = priceChangePercentage7d > 0 ? 'arrow-up' : 'arrow-down';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        
        {/* Left side */}
        <View style={styles.leftWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{ name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        
        {/* Right side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
          <Text style={[styles.subtitle, {color: priceChangeColor}]}>
            
            <MaterialCommunityIcons
                        name={priceChangeshape}
                        color={priceChangeshapecolour}
                        size={16}
                      />
            {priceChangePercentage7d.toFixed(2)}%</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

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