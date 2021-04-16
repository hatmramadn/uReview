import { ToastAndroid } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";

import { firebase } from "@react-native-firebase/auth";
GoogleSignin.configure({
  webClientId,
  offlineAccess: true,
});

export const AUTHENTICATE = "AUTHENTICATE";
export const AUTHENTICATE_SILENTLY = "AUTHENTICATE_SILENTLY";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const SIGN_USER_OUT = "SIGN_USER_OUT";

export const authAction = () => {
  return async (dispatch) => {
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
  return async (dispatch) => {
    try {
      const { user } = await GoogleSignin.signInSilently();
      dispatch({ type: "AUTHENTICATE_SILENTLY", payload: user });
    } catch (error) {}
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      dispatch({ type: GET_CURRENT_USER, payload: currentUser.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = (navigation) => {
  return async (dispatch) => {
    try {
      await GoogleSignin.signOut();
      dispatch({ type: SIGN_USER_OUT });
    } catch (error) {
      console.log(error);
    }
  };
};
