import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios"; /*Axios is a library that serves to create HTTP requests that are present externally*/
import { Card, Title, Paragraph } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export default class NewsScreen extends Component {
  state = {
    /*we declare the state */ articles: [],
    isLoading: true,
    errors: null,
  };

  getArticles() {
    /*then  we define the states*/
    const current = new Date();
    const date = `{${current.getFullYear()}/${
      /*gets the current date*/
      current.getMonth() + 1
    }/${current.getDate()}`;
    axios /*calls the axios api to open specified link with browser and sorts by popularity*/
      .get(
        "https://newsapi.org/v2/everything?q=Cryptocurrency&from=" +
          date /*to ensure current news is dispalyed*/ +
          "&sortBy=popularity&apiKey=7f0268bbd7e74178b529b3eb0e8ec9e4"
      )
      .then((response /*gets article information from previous call */) =>
        response.data.articles.map((article) => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`,
          description: `${article.description}`,
          urlToImage: `${article.urlToImage}`,
        }))
      )
      .then((articles) => {
        /*sets the states with new info */
        this.setState({
          articles,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    /*Articles are inserted into the DOM and componentDidMount() was used since we interact with the browser */
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/*main container */}
        <View style={{ flex: 1 }}>
          <StatusBar style="light" />

          <ScrollView
            style={{
              backgroundColor: "#EEE",
              marginHorizontal: 10,
              marginTop: 9,
            }}
          >
            {!isLoading ? ( //after screen loads, data retrieved from the response and palced on card
              articles.map((article) => {
                const { date, title, url, description, urlToImage } = article;
                return (
                  <Card
                    key={url}
                    style={{
                      marginTop: 10,
                      borderRadius: 20,
                      borderBottomWidth: 1,
                      elevated: 1,
                    }}
                    onPress={() => {
                      Linking.openURL(`${url}`);
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      {/*  Text */}
                      <View
                        style={{
                          justifyContent: "space-around",
                          flex: 2 / 3,
                          margin: 10,
                        }}
                      >
                        <Title>{title}</Title>
                      </View>
                      {/*  Image */}
                      <View style={{ flex: 1 / 3, margin: 10 }}>
                        <Image
                          style={{ width: 100, height: 110, borderRadius: 10 }}
                          source={{ uri: urlToImage }}
                        />
                      </View>
                    </View>
                    <View style={{ margin: 10 }}>
                      <Paragraph>{description}</Paragraph>
                      <Text>Published At: {date}</Text>
                    </View>
                  </Card>
                );
              })
            ) : (
              <View>
                <ActivityIndicator
                  size="large"
                  color="#155A8B"
                  animating={isLoading}
                  style={{ justifyContent: "center", marginTop: "60%" }}
                />
                <Text
                  style={{
                    color: "#155A8B",
                    textAlign: "center",
                    fontSize: 25,
                    paddingTop: 20,
                  }}
                >
                  Loading . . .{" "}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
