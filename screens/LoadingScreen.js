import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingScreen = props => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (!user) {
      props.navigation.navigate("Auth");
    } else {
      props.navigation.navigate("Main");
    }
  }, []);
  return (
    <View>
      <Text style={{ fontWeight: "500", fontSize: 20 }}>
        This is Loading Screen
      </Text>
    </View>
  );
};

export default LoadingScreen;
