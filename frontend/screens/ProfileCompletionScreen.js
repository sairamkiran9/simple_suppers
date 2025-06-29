import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { ProfileAPI } from '../api/profileApi';
import { setProfile } from '../redux/userSlice';

const ProfileCompletionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, profileLoading } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    firstname: profile?.firstname || '',
    lastname: profile?.lastname || '',
    phone: profile?.phone || '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9\-\+\s\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const validateZipCode = (zipCode) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'firstname':
        if (!value.trim()) error = 'First name is required';
        else if (value.trim().length < 2) error = 'First name must be at least 2 characters';
        break;
      
      case 'lastname':
        if (!value.trim()) error = 'Last name is required';
        else if (value.trim().length < 2) error = 'Last name must be at least 2 characters';
        break;
      
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!validatePhone(value)) error = 'Please enter a valid phone number';
        break;
      
      case 'street':
        if (!value.trim()) error = 'Street address is required';
        break;
      
      case 'city':
        if (!value.trim()) error = 'City is required';
        break;
      
      case 'state':
        if (!value.trim()) error = 'State is required';
        break;
      
      case 'zipCode':
        if (!value) error = 'ZIP code is required';
        else if (!validateZipCode(value)) error = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
        break;
    }
    
    return error;
  };

  const handleChange = (field, value) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Real-time validation
    if (touched[field]) {
      const error = validateField(field.replace('address.', ''), value);
      setErrors(prev => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));

    const fieldName = field.replace('address.', '');
    const fieldValue = field.startsWith('address.') 
      ? formData.address[fieldName] 
      : formData[fieldName];
    
    const error = validateField(fieldName, fieldValue);
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = async () => {
    // Validate all fields
    const fieldsToValidate = [
      'firstname', 'lastname', 'phone', 
      'address.street', 'address.city', 'address.state', 'address.zipCode'
    ];
    
    const newErrors = {};
    let hasErrors = false;

    fieldsToValidate.forEach(field => {
      const fieldName = field.replace('address.', '');
      const fieldValue = field.startsWith('address.') 
        ? formData.address[fieldName] 
        : formData[fieldName];
      
      const error = validateField(fieldName, fieldValue);
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
      const result = await ProfileAPI.completeProfile(formData);
      
      // Update Redux state
      dispatch(setProfile({
        profile: result.profile,
        needsCompletion: false
      }));

      Alert.alert(
        'Profile Completed!', 
        'Your profile has been completed successfully.',
        [{ 
          text: 'OK', 
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const ErrorText = ({ error }) => {
    if (!error) return null;
    return <Text style={styles.errorText}>{error}</Text>;
  };

  if (profileLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            We need a few more details to get you started with Simple Suppers!
          </Text>

          <View style={styles.inputsContainer}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <CustomInput
              placeholder="First Name"
              value={formData.firstname}
              onChangeText={val => handleChange('firstname', val)}
              onBlur={() => handleBlur('firstname')}
              style={[
                styles.input,
                errors.firstname && touched.firstname && styles.inputError
              ]}
            />
            <ErrorText error={touched.firstname && errors.firstname} />

            <CustomInput
              placeholder="Last Name"
              value={formData.lastname}
              onChangeText={val => handleChange('lastname', val)}
              onBlur={() => handleBlur('lastname')}
              style={[
                styles.input,
                errors.lastname && touched.lastname && styles.inputError
              ]}
            />
            <ErrorText error={touched.lastname && errors.lastname} />

            <CustomInput
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={val => handleChange('phone', val)}
              onBlur={() => handleBlur('phone')}
              keyboardType="phone-pad"
              style={[
                styles.input,
                errors.phone && touched.phone && styles.inputError
              ]}
            />
            <ErrorText error={touched.phone && errors.phone} />

            <Text style={styles.sectionTitle}>Delivery Address</Text>

            <CustomInput
              placeholder="Street Address"
              value={formData.address.street}
              onChangeText={val => handleChange('address.street', val)}
              onBlur={() => handleBlur('address.street')}
              style={[
                styles.input,
                errors['address.street'] && touched['address.street'] && styles.inputError
              ]}
            />
            <ErrorText error={touched['address.street'] && errors['address.street']} />

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <CustomInput
                  placeholder="City"
                  value={formData.address.city}
                  onChangeText={val => handleChange('address.city', val)}
                  onBlur={() => handleBlur('address.city')}
                  style={[
                    styles.input,
                    errors['address.city'] && touched['address.city'] && styles.inputError
                  ]}
                />
                <ErrorText error={touched['address.city'] && errors['address.city']} />
              </View>

              <View style={styles.halfInput}>
                <CustomInput
                  placeholder="State"
                  value={formData.address.state}
                  onChangeText={val => handleChange('address.state', val)}
                  onBlur={() => handleBlur('address.state')}
                  style={[
                    styles.input,
                    errors['address.state'] && touched['address.state'] && styles.inputError
                  ]}
                />
                <ErrorText error={touched['address.state'] && errors['address.state']} />
              </View>
            </View>

            <CustomInput
              placeholder="ZIP Code"
              value={formData.address.zipCode}
              onChangeText={val => handleChange('address.zipCode', val)}
              onBlur={() => handleBlur('address.zipCode')}
              keyboardType="numeric"
              style={[
                styles.input,
                errors['address.zipCode'] && touched['address.zipCode'] && styles.inputError
              ]}
            />
            <ErrorText error={touched['address.zipCode'] && errors['address.zipCode']} />
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSubmit} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Complete Profile</Text>
            )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#6366f1',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 60, // Balance the back button width
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
    lineHeight: 22,
  },
  inputsContainer: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    marginTop: 8,
  },
  input: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
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
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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

export default ProfileCompletionScreen;