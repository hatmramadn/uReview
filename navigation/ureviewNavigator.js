import React from "react";
import { View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import LoadingScreen from "../screens/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import ReviewOverviewScreen from "../screens/ReviewOverviewScreen";
import AddReviewScreen from "../screens/AddReviewScreen";
import AuthScreen from "../screens/AuthScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../constants/colors";
import AddButton from "../components/AddButton";

const TabBarComponent = props => <BottomTabBar {...props} />;
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Overview: ReviewOverviewScreen
  },
  {
    headerMode: "none"
  }
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-list-box" size={30} color={tintColor} />
        )
      }
    },
    Add: {
      screen: AddReviewScreen,
      navigationOptions: {
        tabBarIcon: <AddButton />,
        tabBarLabel: ""
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-person" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopColor: "white",
          elevation: 15
        }}
      />
    ),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.blueGrey,
      labelStyle: {
        fontSize: 14
      }
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Main: AppTabNavigator,
  Auth: AuthScreen
});

export default createAppContainer(AppSwitchNavigator);
