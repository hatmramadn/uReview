import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { AirbnbRating } from "react-native-ratings";

const ReviewOverviewScreen = (props) => {
  const item = props.navigation.getParam("item");
  const [rating, setRating] = React.useState(item.rating);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => props.navigation.goBack()}
        >
          <Icon name="md-arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.overlay} />
        <Image source={{ uri: item.photo }} style={styles.headerImage} />
        <View
          style={{
            marginLeft: 20,
            marginBottom: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            top: -20,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.reviewTitle}>{item.reviewTitle}</Text>
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
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "flex-start" }}
          style={{ flex: 1 }}
        >
          <View>
            <Text
              style={{
                marginBottom: 20,
                marginRight: 20,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              By
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{ uri: item.user.photo }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  width: "80%",
                }}
              >
                {item.user.givenName} {item.user.familyName}{" "}
                <Text style={{ fontSize: 14 }}> About {item.reviewTitle}</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.reviewDescription}>{item.reviewDescription}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLight,
  },
  header: {
    backgroundColor: colors.primary,
    height: Dimensions.get("screen").height / 2,
    alignItems: "flex-start",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -10,
    resizeMode: "stretch",
  },
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    borderRadius: 30,
    position: "absolute",
    padding: 30,
    top: 200,
  },
  overlay: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    opacity: 0.4,
    position: "absolute",
    zIndex: -9,
  },
  reviewTitle: {
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,

    marginTop: 50,
  },

  reviewDescription: {
    alignSelf: "flex-start",
    marginTop: 20,
    fontSize: 18,
    paddingBottom: 200,
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginTop: 10,
  },
});
export default ReviewOverviewScreen;
