import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import colors from "../constants/colors";
import ReviewCard from "../components/ReviewCard";
import firestore from "@react-native-firebase/firestore";

const HomeScreen = (props) => {
  const [reviews, setReviews] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector((state) => state.user.user);

  const getReview = async () => {
    setIsRefreshing(true);
    const reviewsCollection = await firestore()
      .collection("Reviews")
      .orderBy("timeStamp", "desc")
      .get();
    setReviews(
      reviewsCollection.docs.map((review) => {
        return review.data();
      })
    );
    setIsRefreshing(false);
  };
  useEffect(() => {
    getReview();
    return () => {
      return;
    };
  }, []);
  useEffect(() => {
    if (user === null) {
      props.navigation.navigate("Auth");
    }
  }, [user]);
  const renderHeader = () => {
    return user ? (
      <View style={{ flex: 1 }}>
        <Text style={styles.greetings}>Hello,</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        >
          <View style={styles.header}>
            <View
              style={{ elevation: 2, width: 50, height: 50, borderRadius: 25 }}
            >
              <Image source={{ uri: user.photo }} style={styles.profileImage} />
            </View>
            <Text style={styles.profileTitle}>{user.name}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Latest Reviews</Text>
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/path.png")} style={styles.path} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <FlatList
          refreshing={isRefreshing}
          onRefresh={() => getReview()}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={reviews}
          renderItem={({ item }) => (
            <ReviewCard
              userImage={item.user.photo}
              userName={item.user.name}
              contentPic={item.photo}
              reviewTitle={item.reviewTitle}
              reviewDescription={item.reviewDescription}
              rating={item.rating}
              onItemPressed={() => {
                props.navigation.navigate("Overview", {
                  item: item,
                });
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greyLight,
    flex: 1,
    alignItems: "flex-start",
  },
  greetings: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginLeft: 20,
  },
  path: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginLeft: 10,
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
});
export default HomeScreen;
