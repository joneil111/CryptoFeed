import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { Card, Title, Paragraph } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import Header from "../Components/AppBar";

export default class NewsScreen extends Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null,
  };

  getArticles() {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=Cryptocurrency&from=2021-11-20&sortBy=popularity&apiKey=7f0268bbd7e74178b529b3eb0e8ec9e4"
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`,
          description: `${article.description}`,
          urlToImage: `${article.urlToImage}`,
        }))
      )
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <StatusBar style="light" />
          <Header />

          <ScrollView
            style={{
              backgroundColor: "black",
              marginHorizontal: 10,
              marginTop: 80,
            }}
          >
            {!isLoading ? (
              articles.map((article) => {
                const { date, title, url, description, urlToImage } = article;
                return (
                  <Card
                    key={url}
                    style={{
                      marginTop: 10,
                      borderColor: "black",
                      borderRadius: 10,
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
              <Text style={{ justifyContent: "center", alignItems: "center" }}>
                Loading...
              </Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
