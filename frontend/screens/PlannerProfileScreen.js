import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const PlannerProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        navigation.replace("Login");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>
            Welcome, {user.displayName || user.email}
          </Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
};

export default PlannerProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1f2937",
  },
  loading: {
    fontSize: 16,
    color: "#6b7280",
  },
});
