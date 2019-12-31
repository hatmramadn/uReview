import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import colors from "../constants/colors";
import { AuthenticateSilently } from "../store/actions/authAction";

const LoadingScreen = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    dispatch(AuthenticateSilently());
  }, []);
  useEffect(() => {
    if (!user) {
      props.navigation.navigate("Auth");
    } else {
      props.navigation.navigate("Main");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.main} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default LoadingScreen;
