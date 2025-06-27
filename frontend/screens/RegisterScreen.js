import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput';
import { registerUser} from '../api/customAuth';

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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateFullName = (name) => {
    return name.trim().length >= 2;
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (!validateFullName(value)) {
          error = 'Full name must be at least 2 characters';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (!validatePassword(value)) {
          error = 'Password must be at least 6 characters';
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
    }
    
    return error;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Real-time validation
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }

    // Special case for password confirmation
    if (field === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));

    const error = validateField(field, formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = async () => {
    // Validate all fields
    const fieldsToValidate = ['fullName', 'email', 'password', 'confirmPassword'];
    const newErrors = {};
    let hasErrors = false;

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    // Mark all fields as touched
    const newTouched = {};
    fieldsToValidate.forEach(field => {
      newTouched[field] = true;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (hasErrors) {
      Alert.alert('Validation Error', 'Please fix the errors below and try again.');
      return;
    }

    setLoading(true);
    try {
      const user = await registerUser(formData.email, formData.password, formData.fullName);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper component for error messages
  const ErrorText = ({ error }) => {
    if (!error) return null;
    return <Text style={styles.errorText}>{error}</Text>;
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
              onBlur={() => handleBlur('fullName')}
              style={[
                styles.input,
                errors.fullName && touched.fullName && styles.inputError
              ]}
            />
            <ErrorText error={touched.fullName && errors.fullName} />

            <CustomInput
              placeholder="Email"
              value={formData.email}
              onChangeText={val => handleChange('email', val)}
              onBlur={() => handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                errors.email && touched.email && styles.inputError
              ]}
            />
            <ErrorText error={touched.email && errors.email} />
           
            <CustomInput
              placeholder="Password"
              value={formData.password}
              onChangeText={val => handleChange('password', val)}
              onBlur={() => handleBlur('password')}
              secureTextEntry
              style={[
                styles.input,
                errors.password && touched.password && styles.inputError
              ]}
            />
            <ErrorText error={touched.password && errors.password} />

            <CustomInput
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={val => handleChange('confirmPassword', val)}
              onBlur={() => handleBlur('confirmPassword')}
              secureTextEntry
              style={[
                styles.input,
                errors.confirmPassword && touched.confirmPassword && styles.inputError
              ]}
            />
            <ErrorText error={touched.confirmPassword && errors.confirmPassword} />
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
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 4,
  },
});

export default RegisterScreen;
