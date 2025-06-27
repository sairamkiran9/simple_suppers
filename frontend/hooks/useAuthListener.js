import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import { setUser, logout } from '../redux/userSlice';

export const useAuthListener = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is authenticated
          const token = await firebaseUser.getIdToken();
          dispatch(setUser({
            userInfo: firebaseUser,
            token: token
          }));
          setIsAuthenticated(true);
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