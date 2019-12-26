import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingScreen = props => {
  return (
    <View>
      <Text style={{ fontWeight: "500", fontSize: 20 }}>
        This is Loading Screen
      </Text>
    </View>
  );
};

export default LoadingScreen;
