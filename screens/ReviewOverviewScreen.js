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
import Icon from "react-native-vector-icons/Ionicons";

const ReviewOverviewScreen = props => {
  const item = props.navigation.getParam("item");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => props.navigation.goBack()}
        >
          <Icon name="md-arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.overlay}></View>
        <Image source={{ uri: item.contentPic }} style={styles.headerImage} />
        <Text style={styles.reviewTitle}>{item.reviewTitle}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.reviewDescription}>{item.reviewDescription}</Text>
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
    height: Dimensions.get("screen").height / 2,
    alignItems: "flex-start"
  },
  headerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -10
  },
  content: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 30,
    position: "absolute",
    top: 200
  },
  overlay: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    opacity: 0.4,
    position: "absolute",
    zIndex: -9
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginLeft: 20,
    marginTop: 90
  },

  reviewDescription: {
    margin: 20,
    fontSize: 15
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginTop: 10
  }
});
export default ReviewOverviewScreen;
