import axios from 'axios';
import moment from 'moment';

//format the sparkline
const formatSparkline = (numbers) => {
  const sevenDaysAgo = moment().subtract(7, 'days').unix();
  let formattedSparkline = numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,// this makes each item in the sparkline array will increment the time value by 1 hour
      y: item,
    }
  })
  //return the formated sparkline. We do this because we require x and y values for the chart/graph
  //where x is the time and date and y will become the price
  return formattedSparkline;
}
//format data from api call
const formatMarketData = (data) => {
  let formattedData = [];

  data.forEach(item => {
    //gets the array and spilts it into the x and y values
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

    //format the item and update the sparkline to the formated sparkline
    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline
      }
    }

    formattedData.push(formattedItem);
  });

  return formattedData;
}

export const getMarketData = async () => {
  
  try {
    //api call
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d");
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (error) {
    console.log(error.message);
  }
}