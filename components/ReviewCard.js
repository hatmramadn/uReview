import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import colors from "../constants/colors";
import { AirbnbRating } from "react-native-ratings";

const ReviewCard = props => {
  return (
    <TouchableOpacity onPress={props.onItemPressed}>
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

            <AirbnbRating
              showRating={false}
              isDisabled={true}
              defaultRating={5}
              size={22}
              starStyle={{
                tintColor: "#FCB040",
                marginBottom: 10
              }}
            />

            <Text style={styles.reviewComment}>{props.reviewDescription}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    marginBottom: 5
  }
});
export default ReviewCard;
