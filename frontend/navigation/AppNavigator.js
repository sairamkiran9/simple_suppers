import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PlannerProfileScreen from '../screens/PlannerProfileScreen';
import CreatePlanScreen from '../screens/CreatePlanScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen name="PlannerProfile" component={PlannerProfileScreen} /> */}
      {/* <Stack.Screen name="CreatePlan" component={CreatePlanScreen} /> */}
      {/* <Stack.Screen name="ShoppingList" component={ShoppingListScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
