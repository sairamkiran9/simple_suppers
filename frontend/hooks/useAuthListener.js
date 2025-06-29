import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import { setUser, setProfile, setProfileLoading, logout } from '../redux/userSlice';
import { ProfileAPI } from '../api/profileApi';

export const useAuthListener = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  const syncUserProfile = async (firebaseUser) => {
    try {
      dispatch(setProfileLoading(true));
      
      // First set Firebase user data
      const token = await firebaseUser.getIdToken();
      dispatch(setUser({
        userInfo: firebaseUser,
        token: token
      }));

      // Then sync with backend and get profile data
      const profileResult = await ProfileAPI.syncProfile();
      dispatch(setProfile({
        profile: profileResult.profile,
        needsCompletion: profileResult.needsCompletion
      }));

      console.log('Profile synced:', profileResult);
      dispatch(setProfileLoading(false));
      
    } catch (error) {
      console.error('Profile sync failed:', error);
      dispatch(setProfileLoading(false));
      // Continue with Firebase-only auth if backend sync fails
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is authenticated
          setIsAuthenticated(true);
          await syncUserProfile(firebaseUser);
        } else {
          // User is not authenticated
          dispatch(logout());
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        // If token retrieval fails, log out the user
        dispatch(logout());
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [dispatch]);

  return { isLoading, isAuthenticated };
};