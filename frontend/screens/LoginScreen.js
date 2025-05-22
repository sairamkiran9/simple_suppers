<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import { loginUser } from '../api/useGoogleAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import useGoogleAuth from '../api/useGoogleAuth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { promptAsync, request } = useGoogleAuth(navigation);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      dispatch(setUser(res));
      navigation.navigate('PlannerProfile');
    } catch (err) {
      Alert.alert('Login failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputsContainer}>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.outlineButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#e0e7ff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  card: {
    width: '95%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 16,
    marginBottom: 28, 
    textAlign: 'center',
  },
  inputsContainer: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 24, 
  },
  input: {
    marginBottom: 15, 
  },
  button: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    width: '100%',
    maxWidth: 340,
    borderColor: '#6366f1',
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24, 
    alignSelf: 'center',
  },
  outlineButtonText: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
    maxWidth: 340,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#94a3b8',
    fontWeight: '500',
    fontSize: 14,
  },
  googleButton: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#f1f5f9',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'center',
  },
  googleButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginScreen;
=======
import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useGoogleAuth } from "../api/auth";

export default function LoginScreen() {
  const { promptAsync } = useGoogleAuth();

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
>>>>>>> 3fa5ade (working on google sigins and firebase)
