import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";
import { AirbnbRating } from "react-native-ratings";

const ReviewCard = (props) => {
  const [rating, setRating] = React.useState(props.rating);
  return (
    <View
      style={{
        ...styles.cardContainer,
        elevation: 4,
        flex: 1,
      }}
    >
      <TouchableOpacity activeOpacity={0.3} onPress={props.onItemPressed}>
        <View>
          <View style={styles.titleWrapper}>
            <Image
              style={styles.titleImage}
              source={{ uri: props.userImage }}
            />
            <Text style={styles.title}>{props.userName}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                resizeMode="cover"
                style={styles.contentImage}
                source={{ uri: props.contentPic }}
              />
            </View>
            <View style={styles.reviewWrapper}>
              <Text style={styles.reviweTitle}>{props.reviewTitle}</Text>

              <AirbnbRating
                showRating={false}
                isDisabled={true}
                defaultRating={rating}
                count={rating}
                size={22}
                starStyle={{
                  tintColor: "#FCB040",
                  marginBottom: 10,
                }}
              />

              <Text
                lineBreakMode="tail"
                numberOfLines={3}
                style={{ width: 200 }}
              >
                {props.reviewDescription}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("screen").width - 40,
    backgroundColor: "white",

    padding: 25,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  titleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  title: {
    width: "80%",
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  contentWrapper: {
    flexDirection: "row",
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    width: 120,
    height: 170,
    marginRight: 15,
  },
  contentImage: {
    width: "100%",
    height: "100%",
  },
  reviewWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  reviweTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 5,
  },
});
export default ReviewCard;
