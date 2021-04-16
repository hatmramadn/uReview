import React from "react";
import { View, TochableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../constants/colors";

export default AddButton = () => {
  return (
    <View style={styles.button}>
      <Icon name="md-add" size={30} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 36,
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: 10,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    elevation: 2
  }
});
