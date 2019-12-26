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
  Home: HomeScreen,
  Overview: ReviewOverviewScreen
});

const AppTabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Add: AddReviewScreen,
  Profile: ProfileScreen
});

const AppSwitchNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Loading: LoadingScreen,
  Main: AppTabNavigator
});

export default createAppContainer(AppSwitchNavigator);
