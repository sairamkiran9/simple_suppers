import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Add real validation and API call here
      if (!formData.email || !formData.password || !formData.fullName) {
        Alert.alert('Error', 'Please fill all required fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Account created!');
        navigation.navigate('Login');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Simple Suppers today!</Text>

          <View style={styles.inputsContainer}>
            <CustomInput
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={val => handleChange('fullName', val)}
              style={styles.input}
            />
            <CustomInput
              placeholder="Email"
              value={formData.email}
              onChangeText={val => handleChange('email', val)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <CustomInput
              placeholder="Password"
              value={formData.password}
              onChangeText={val => handleChange('password', val)}
              secureTextEntry
              style={styles.input}
            />
            <CustomInput
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={val => handleChange('confirmPassword', val)}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Login')}
            >
              {' '}Login
            </Text>
          </Text>
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
  footerText: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 15,
    color: '#64748b',
  },
  link: {
    color: '#4f46e5',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
