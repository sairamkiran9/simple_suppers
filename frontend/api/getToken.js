import { getAuth } from "firebase/auth";

export const getToken = async (forceRefresh = false) => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    // Force refresh can be used to get a fresh token
    const token = await user.getIdToken(forceRefresh);
    return token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    
    // If token refresh fails, the user might need to re-authenticate
    if (error.code === 'auth/user-token-expired' || 
        error.code === 'auth/invalid-user-token') {
      // Clear the invalid user session
      await auth.signOut();
      throw new Error("Session expired. Please log in again.");
    }
    
    throw error;
  }
};
