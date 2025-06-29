import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export const useProfileNavigation = () => {
  const navigation = useNavigation();
  const { userInfo, needsCompletion, profileLoading } = useSelector((state) => state.user);

  useEffect(() => {
    // Only navigate if user is authenticated and profile is not loading
    if (userInfo && !profileLoading) {
      const currentRoute = navigation.getState()?.routes[navigation.getState()?.index]?.name;
      
      if (needsCompletion && currentRoute !== 'ProfileCompletion') {
        // Profile needs completion - navigate to completion screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProfileCompletion' }],
        });
      } else if (!needsCompletion && currentRoute === 'ProfileCompletion') {
        // Profile is complete - navigate to Home
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    }
  }, [userInfo, needsCompletion, profileLoading, navigation]);

  return { needsCompletion, profileLoading };
};