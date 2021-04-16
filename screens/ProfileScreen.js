import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../store/actions/authAction";
import colors from "../constants/colors";
import ReviewCard from "../components/ReviewCard";
import Icon from "react-native-vector-icons/Octicons";

import firestore from "@react-native-firebase/firestore";

import { GoogleSignin } from "@react-native-community/google-signin";

const ProfileScreen = (props) => {
  const [reviews, setReviews] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const getReview = async () => {
    setIsRefreshing(true);
    const reviewsCollection = await firestore()
      .collection("Reviews")
      .where("userId", "==", user.id)
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
    console.log(reviews);
  }, [props]);
  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", zIndex: 10, top: 20, left: 20 }}>
        <TouchableOpacity
          onPress={() => {
            console.log("cl");
            props.navigation.navigate("Auth");
            dispatch(signOut(props.navigation));
          }}
        >
          <Icon size={24} color="white" name="sign-out" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={{ uri: user.photo }} style={styles.avatar} />
        <Text style={styles.title}>{user.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>My latest review</Text>
        <FlatList
          refreshing={isRefreshing}
          onRefresh={() => getReview()}
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
              onItemPressed={() => {
                props.navigation.navigate("Overview", {
                  item: item,
                });
              }}
            />
          )}
        />

        <View style={{ marginBottom: 150 }} />
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
    height: Dimensions.get("screen").height / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  content: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    position: "absolute",
    top: 140,
  },
  contentTitle: {
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
});

export default ProfileScreen;
