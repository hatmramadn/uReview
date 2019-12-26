import { Alert } from "react-native";
import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";

GoogleSignin.configure({
  webClientId:
    "138221793576-e3215kf65ubs8kv96pmbvpf51k37j1r9.apps.googleusercontent.com",
  offlineAccess: true
});

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    Alert.alert(
      `Welcome, ${userInfo.user.givenName} ${userInfo.user.familyName}`
    );
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
