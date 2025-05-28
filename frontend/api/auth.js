import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAnZxfRbpjzUFbv9OXRZonNm7mm9_S0Dgg",
  authDomain: "simplesuppers-68904.firebaseapp.com",
  projectId: "simplesuppers-68904",
  storageBucket: "simplesuppers-68904.appspot.com", // ✅ fixed extension
  messagingSenderId: "948449411635",
  appId: "1:948449411635:web:d66b69669e4f3602235946",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// 🔐 Hook to handle Google Sign-In
export const useGoogleAuth = () => {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true, // ✅ you're testing on web, so no proxy
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "948449411635-dbihbjbvcitoakmlcgbpburh2bl9j0ve.apps.googleusercontent.com",
    redirectUri,
    responseType: "id_token",
    scopes: ["openid", "email", "profile"],
  });

  useEffect(() => {
    console.log("OAuth response:", response); // Debugging

    if (response?.type === "success") {
      console.log(response);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("✅ Signed in as:", userCredential.user.email);
        })
        .catch((err) => {
          console.error("❌ Sign-in error:", err);
        });
    }
  }, [response]);

  // Optional: track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("👤 Current user:", user.email);
      } else {
        console.log("👋 User signed out");
      }
    });

    return unsubscribe;
  }, []);

  return { promptAsync, request };
};
