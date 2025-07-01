import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { auth } from "./firebase";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

// Hook to handle Google Sign-In
export const useGoogleAuth = (navigation) => {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "948449411635-dbihbjbvcitoakmlcgbpburh2bl9j0ve.apps.googleusercontent.com",
    redirectUri,
    responseType: "id_token",
    scopes: ["openid", "email", "profile"],
  });

  useEffect(() => {
    console.log("OAuth response:", response);

    if (response?.type === "success") {
      const { id_token, access_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      //Sign-in to Firebase
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Firebase Signed in as:", userCredential.user.email);

          dispatch(
            setUser({
              userInfo: userCredential.user, // This becomes `userInfo` in Redux
              token: id_token, // This becomes `token` in Redux
            })
          );
          // Let the auth listener handle navigation
          console.log('Google OAuth successful - letting auth listener handle navigation');
          // // Fetch Google user profile info
          // fetch("https://www.googleapis.com/userinfo/v2/me", {
          //   headers: { Authorization: `Bearer ${access_token}` },
          // })
          //   .then((res) => res.json())
          //   .then((userInfo) => {
          //     console.log("👤 Google user info:", userInfo);
          //     dispatch(setUser(userInfo));
          //     navigation.navigate("PlannerProfile");
          //   })
          //   .catch((err) =>
          //     console.error("Failed to fetch Google user info:", err)
          //   );
        })
        .catch((err) => {
          console.error("Firebase Sign-in error:", err);
        });
    }
  }, [response]);

  return { promptAsync, request };
};
