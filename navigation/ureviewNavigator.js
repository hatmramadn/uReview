import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoadingScreen from "../screens/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import ReviewOverviewScreen from "../screens/ReviewOverviewScreen";
import AddReviewScreen from "../screens/AddReviewScreen";
import AuthScreen from "../screens/AuthScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Overview: ReviewOverviewScreen
});

const AppTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Add: AddReviewScreen,
  Profile: ProfileScreen
});

const AppSwitchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Main: AppTabNavigator,
  Auth: AuthScreen
});

export default createAppContainer(AppSwitchNavigator);
