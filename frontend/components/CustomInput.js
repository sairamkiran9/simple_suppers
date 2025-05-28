import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ placeholder, secureTextEntry, value, onChangeText }) => (
  <TextInput
    style={inputStyles.input}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    value={value}
    onChangeText={onChangeText}
    placeholderTextColor="#999"
  />
);

const inputStyles = StyleSheet.create({
  input: {
  width: '100%',
  paddingVertical: 12,
  paddingHorizontal: 14,
  borderWidth: 1,
  borderColor: '#cbd5e1',
  borderRadius: 8,
  fontSize: 16,
  color: '#334155',
  backgroundColor: '#f8fafc',
  marginBottom: 0,
},
inputFocused: {
  borderColor: '#6366f1',
  shadowColor: '#6366f1',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
},

});

export default CustomInput;
