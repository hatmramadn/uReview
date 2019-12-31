import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import colors from "../constants/colors";
import ReviewCard from "../components/ReviewCard";
import { FlatList } from "react-native-gesture-handler";
const dummyData = [
  {
    id: "1",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "2",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "3",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "4",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "5",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "6",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "7",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "8",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  },
  {
    id: "9",
    userPic:
      "https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg",
    userName: "Hatem Ramadan",
    contentPic:
      "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
    reviewTitle: "Hoco Headphones",
    reviewDescription:
      " lorem ipsum dolor sanit pain in the head lorem ipsum dolor pain in the head"
  }
];
const HomeScreen = props => {
  const user = useSelector(state => state.user.user);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Image source={require("../assets/path.png")} style={styles.path} />
        <Text style={styles.greetings}>Hello,</Text>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.header}>
            <View
              style={{ elevation: 2, width: 50, height: 50, borderRadius: 25 }}
            >
              <Image source={{ uri: user.photo }} style={styles.profileImage} />
            </View>
            <Text style={styles.profileTitle}>{user.name}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>Latest Reviews</Text>
          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={dummyData}
              renderItem={({ item }) => (
                <ReviewCard
                  userImage={item.userPic}
                  userName={item.userName}
                  contentPic={item.contentPic}
                  reviewTitle={item.reviewTitle}
                  reviewDescription={item.reviewDescription}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width * 0.8,
    color: colors.white,
    borderRadius: 10,
    alignItems: "flex-start",
    padding: 10
  },
  container: {
    flex: 1,
    alignItems: "flex-start"
  },
  greetings: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginLeft: 20
  },
  path: {
    position: "absolute",
    top: 0,
    left: 0
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginLeft: 10
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 30
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10
  }
});
export default HomeScreen;
