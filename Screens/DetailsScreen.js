import React from 'react';
import { 
	View, 
	Text,
	StyleSheet,
	SafeAreaView} from 'react-native';
import DatePicker from 'react-native-datepicker';


class DetailsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			isLoading: true,
			// Get the currency's symbol
			symbol: props.route.params.params.symbol,
			// Get the currency's full name
			name_full: props.route.params.params.name_full ? props.route.params.params.name_full : null,
			// Start date on calender
			date: '2020-10-19',
			dateTime: [],
			maxDate: (new Date).toISOString().substring(0,10),
			data: []
		};
	}

	// Separate the date 
	getDate = string => (([year, month, day]) => ({ day, month, year }))(string.split('-'));

// Get the data from the API
	callToAPI() {
		fetch(`http://api.coinlayer.com/${this.state.date}?access_key=f85a0848af743a54be52332e3d35abae&symbols=${this.state.symbol}`)
			.then((response) => response.json())
			.then((response) => {
				this.setState({ 
					data: response, 
					dateTime: this.getDate(response.date)
				});
			})
			// If there is an error, display what the error is
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

  	render(){
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#E9F0FB'  }}>
				{/*Display the button that is used to select a date on history */}
				<View style={{ flex: 1, paddingVertical: 20 }} />
				{ this.state.data.length === 0 ? 
					<SafeAreaView style={{ marginHorizontal: 20 }}>
						<Text style={[styles.cardDetails, { color: '#fff', fontSize: 20, textAlign: 'center' }]}>
							Click This Button After Clicking The Calender Icon and Selecting A Date in History
						</Text> 
					</SafeAreaView> 
					:
					<SafeAreaView style={{ flex: 5 }}>
						<View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
							<View style={styles.timeCards}>
								{/*Display the year selected*/}
								<Text style={styles.cardTitle}>Year</Text>
								<Text style={styles.cardSubtitle}>{this.state.dateTime.year}</Text>
							</View>
							<View style={styles.timeCards}>
								{/*Display the month selected */}
								<Text style={styles.cardTitle}>Month</Text>
								<Text style={styles.cardSubtitle}>{this.state.dateTime.month}</Text>
							</View>	
							<View style={styles.timeCards}>
								{/*Display the day selected */}
								<Text style={styles.cardTitle}>Day</Text>
								<Text style={styles.cardSubtitle}>{this.state.dateTime.day}</Text>
							</View>									
						</View>
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }}>
							<View style={{ flex: 1 }} />
							<View style={{ flexDirection: 'column' }}>
								<View style={styles.cardDetails}>
									{/*Display the currency name*/}
									<Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: '#fff'}}>
										Currency Name: {this.state.name_full}
									</Text>
								</View>
								<View style={styles.cardDetails}>
									{/*Display the exchange rate of the currency */}
									<Text style={{ fontWeight: 'bold', fontSize: 23, textAlign: 'center', color: '#fff' }}>
										Rate: 1 {this.state.symbol} = {this.state.data.rates[this.state.symbol]} {this.state.data.target}
									</Text>
								</View>
							</View>
							<View style={{ flex: 1 }} />
						</View>
						<View style={{ flex: 1 }} />
					</SafeAreaView>
				}
				{/*Display the calender icon and calender to select the date */}
				<View style={{ flex: 2, alignContent: 'center', alignItems:'center' }}>
					<DatePicker
						style={styles.datePickerStyle}
						date={this.state.date} 
						mode="date" 
						placeholder="Select Date"
						format="YYYY-MM-DD"
						minDate="2018-04-01"
						maxDate={this.state.maxDate}
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0,
							},
							dateInput: {
								marginLeft: 36,
							},
						}}
						onDateChange={(date) => {
							this.setState({date: date});
							this.callToAPI();
						}}
					/>
				</View>
			</SafeAreaView>
		);
	}
}
{/*Properties of the display */}
const styles = StyleSheet.create({
	cardDetails: { 
		backgroundColor: '#1b73b3', 
		justifyContent: 'center', 
		padding: 20, 
		marginVertical: 10, 
		borderRadius: 20, 
		elevation: 10
	},
	cardTitle: { 
		fontSize: 20, 
		fontWeight: "900",
		color: '#fff',
		marginTop: -40,
	},
	cardSubtitle: {
		paddingTop: 20,
		fontSize: 17,
		color: '#fff',
		marginTop: -10,
		height:50,
	},
	datePickerStyle: {
		width: 200,
		marginTop: 20,
	},
	timeCards: {
        //backgroundColor: '#1b73b3',
        //borderRadius: 20,
        height: 80,
        width: 110,
        paddingVertical: 60,
		paddingBottom: 10,
        //justifyContent: 'space-between',
		flexDirection:'column', 
        alignItems: 'center',
        elevation: 15,
		backgroundColor: '#1b73b3', 
		justifyContent: 'center', 
		padding: 20, 
		marginVertical: 10, 
		borderRadius: 20, 
		
    },

});

export default DetailsScreen;