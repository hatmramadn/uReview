import React from "react";
import { View, Text } from "react-native";

const ReviewOverviewScreen = props => {
  const item = props.navigation.getParam("item");
  console.log(item);
  return (
    <View>
      <Text style={{ fontWeight: "500", fontSize: 20 }}>
        This is ReviewOverviewScreen Screen
      </Text>
    </View>
  );
};

export default ReviewOverviewScreen;
