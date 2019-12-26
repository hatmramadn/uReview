import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  StatusBar
} from "react-native";
import colors from "../constants/colors";

const AuthScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require("../assets/pic.png")}
        />
      </View>
      <TouchableNativeFeedback onPress={() => signInWithGoogleAsync()}>
        <View style={styles.button}>
          <Image
            style={{ height: 20, width: 20, marginRight: 10 }}
            source={require("../assets/search.png")}
          />
          <Text style={{ fontSize: 16, color: colors.text }}>
            Sign in with Google
          </Text>
        </View>
      </TouchableNativeFeedback>
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
    position: "absolute",
    top: 100
  },
  headerImage: {
    width: 300,
    height: 300
  },
  button: {
    marginTop: Dimensions.get("screen").height / 1.5,
    elevation: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10
  }
});

export default AuthScreen;
