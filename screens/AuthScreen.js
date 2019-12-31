import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  AsyncStorage
} from "react-native";
import { GoogleSigninButton } from "@react-native-community/google-signin";
import { useSelector, useDispatch } from "react-redux";

import { authAction } from "../store/actions/authAction";
import colors from "../constants/colors";

const AuthScreen = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const handleAuth = () => {
    dispatch(authAction());
  };
  useEffect(() => {
    if (user != null) {
      props.navigation.navigate("Main");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require("../assets/pic.png")}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>uReview</Text>
        <Text style={styles.subhead}>Share good experoences with people</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 48, elevation: 0 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={handleAuth}
          disabled={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.greyLight
  },
  header: {
    flex: 1,
    marginTop: 70
  },
  headerImage: {
    width: 250,
    height: 250
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text
  },
  subhead: {
    fontSize: 20,
    width: 260,
    color: colors.text,
    textAlign: "center",
    marginBottom: 20
  }
});

export default AuthScreen;
