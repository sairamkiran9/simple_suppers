import { Alert } from "react-native";
import { auth } from "../api/firebase";
import { logout } from "../redux/userSlice";
import { persistor } from "../redux/store";

/**
 * Logs the user out and redirects to Login.
 * @param {Function} dispatch - The Redux dispatch function
 * @param {object} navigation - The React Navigation object from useNavigation()
 */
export const handleLogout = async (dispatch, navigation) => {
  try {
    await auth.signOut();

    dispatch(logout());
    await persistor.purge();

    Alert.alert("Logged out", "You have been logged out.");
    navigation.replace("Login");
  } catch (err) {
    console.log("Logout error:", err.message);
  }
};
