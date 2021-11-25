import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator
} from 'react-native';

const HomeScreen = ({ navigation }) => {
	const apiData = [];
	const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

	{/*Get teh data from the api */}
    useEffect(() => {
        fetch('http://api.coinlayer.com/list?access_key=85810237744104965dbfe907cadf263b')
        .then((response) => response.json())
        .then((responseJson) => {

            for (var key in responseJson.crypto) {
              	apiData.push(responseJson.crypto[key])
			}
			setIsLoading(false);
            setFilteredDataSource(apiData);
            setMasterDataSource(apiData);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

	 // Search through the data for the text(name of the currrency) in the list of currencies
const searchFilterFunction = (text) => {
    if (text) {
    const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
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
        <TouchableOpacity 
            style={styles.card} 
			//Open the details screen when the currency tab is selected
            onPress={() => navigation.navigate('Details', {
					screen: 'Details',
					params: { 
						symbol: item.symbol,
						name_full: item.name_full,
					}
				})
			}
		>
		  	<SafeAreaView style={styles.cardBody}>
				<View style={{ flex: 1, paddingLeft: 20 }}>
					{/*Display the currency's icon */}
					<Image 
						source={{ uri: item.icon_url }}
						style={{ height: 60, resizeMode: 'contain' }}
					/>
				</View>
				<View style={{ flex: 2 }}>
					{/*Display the currency's full name and name shortened */}
					<Text style={styles.cardTitle}>
						{item.name_full}
					</Text>
					<Text style={styles.cardSubTitle}>
						{item.name}
					</Text>
				</View>
				<View style={{ flex: 2 }}>
					{/*Display the max supply */}
					<Text style={{ fontWeight: 'bold' }}>
						Max Supply: {item.max_supply}
					</Text>
					{/*Display the symbol*/}
					<Text >
						Symbol: {item.symbol}
					</Text>
				</View>
			
			</SafeAreaView>
      </TouchableOpacity>
    );
  };

  return (
	  //Display the search box
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEE' }}>
      <View>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />

		{/*if the screen is loading, display a loading animation */}
		{ isLoading === true ? 
			<View>
				<ActivityIndicator 
					size="large" 
					color="#1b73b3" 
					animating={isLoading}
					style={{ justifyContent: 'center', marginTop: '40%' }}
				/>
				<Text style={{ color: "#1b73b3" , textAlign: 'center', fontSize: 25, paddingTop: 20 }} >Loading . . . </Text>
			</View>
			: null
		}

		{/*Display the currency details to the screen */}
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

{/*Properties of the display screen */}
const styles = StyleSheet.create({
	card: {
		paddingVertical: 15,
        marginHorizontal: 17,
        marginVertical: 10,
		borderWidth: 2,
		borderRadius: 27,
        borderColor: 'transparent',
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 10
	},
	cardBody: {
		flexDirection: 'row',
		marginBottom: 10,
        alignItems: 'center'
	},
	cardTitle: {
		fontWeight: "bold",
        fontSize: 23,
        marginLeft: 11
    },
	cardSubTitle: {
		fontWeight: '200',
        fontSize: 14,
        marginLeft: 11,
        color: 'grey'
	},
	textInputStyle: {
        marginTop: 17,
		height: 40,
		borderWidth: 1,
		paddingLeft: 20,
		margin: 5,
		borderRadius: 20,
		borderBottomLeftRadius: 0,
		borderColor: '#1b73b3',
		backgroundColor: '#FFFFFF',
	},
});

export default HomeScreen;