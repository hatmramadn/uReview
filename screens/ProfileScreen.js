import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar
} from "react-native";
import { useSelector } from "react-redux";
import colors from "../constants/colors";
import ReviewCard from "../components/ReviewCard";
import { ScrollView } from "react-native-gesture-handler";

const ProfileScreen = props => {
  const user = useSelector(state => state.user.user);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.photo }} style={styles.avatar} />
        <Text style={styles.title}>{user.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>My latest review</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ReviewCard
            userImage={user.photo}
            userName={user.name}
            contentPic="https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687"
            reviewTitle="hoco"
            reviewDescription="sdsd"
          />
          <ReviewCard
            userImage={user.photo}
            userName={user.name}
            contentPic="https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687"
            reviewTitle="hoco"
            reviewDescription="sdsd"
          />
          <View style={{ marginBottom: 150 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLight
  },
  header: {
    backgroundColor: colors.primary,
    height: Dimensions.get("screen").height / 4,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginBottom: 10
  },
  content: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    position: "absolute",
    top: 140
  },
  contentTitle: {
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "700",
    color: colors.text
  }
});

export default ProfileScreen;
