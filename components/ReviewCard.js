import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import colors from "../constants/colors";

const ReviewCard = props => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleWrapper}>
        <Image style={styles.titleImage} source={{ uri: props.userImage }} />
        <Text style={styles.title}>{props.userName}</Text>
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.contentImage}
            source={{ uri: props.contentPic }}
          />
        </View>
        <View style={styles.reviewWrapper}>
          <Text style={styles.reviweTitle}>{props.reviewTitle}</Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Image
              source={require("../assets/star.png")}
              style={{ width: 20, height: 20 }}
            />
            <Image
              source={require("../assets/star.png")}
              style={{ width: 20, height: 20 }}
            />
            <Image
              source={require("../assets/star.png")}
              style={{ width: 20, height: 20 }}
            />
            <Image
              source={require("../assets/star.png")}
              style={{ width: 20, height: 20 }}
            />
            <Image
              source={require("../assets/star.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <Text style={styles.reviewComment}>{props.reviewDescription}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("screen").width - 40,
    backgroundColor: "white",
    elevation: 2,
    padding: 25,
    margin: 10,
    borderRadius: 15
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  titleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text
  },
  contentWrapper: {
    flexDirection: "row"
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    width: 120,
    height: 170,
    marginRight: 15
  },
  contentImage: {
    width: "100%",
    height: "100%"
  },
  reviewWrapper: {
    flex: 1
  },
  reviweTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10
  }
});
export default ReviewCard;