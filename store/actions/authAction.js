import { ToastAndroid, AsyncStorage, ActionSheetIOS } from "react-native";
import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";

import { firebase } from "@react-native-firebase/auth";
GoogleSignin.configure({
  webClientId:
    "138221793576-e3215kf65ubs8kv96pmbvpf51k37j1r9.apps.googleusercontent.com",
  offlineAccess: true
});

export const AUTHENTICATE = "AUTHENTICATE";
export const AUTHENTICATE_SILENTLY = "AUTHENTICATE_SILENTLY";
export const GET_CURRENT_USER = "GET_CURRENT_USER";

export const authAction = () => {
  return async dispatch => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken, user } = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await firebase.auth().signInWithCredential(credential);
      dispatch({ type: AUTHENTICATE, payload: user });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravity(
          "Please allow authenticating your account",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.showWithGravity(
          "in progress",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        ToastAndroid.showWithGravity(
          "play services not available or outdated",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      } else {
        ToastAndroid.showWithGravity(
          "something went wrong",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
    }
  };
};

export const AuthenticateSilently = () => {
  return async dispatch => {
    const { user } = await GoogleSignin.signInSilently();
    dispatch({ type: "AUTHENTICATE_SILENTLY", payload: user });
  };
};

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      dispatch({ type: GET_CURRENT_USER, payload: currentUser.user });
    } catch (error) {
      console.log(error);
    }
  };
};
