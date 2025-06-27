import { PersonRepository } from '../repositories/person.repository';
import { FirebaseProfile, ProfileCompletion } from '../validators/person.validator';

export const PersonService = {
  // Sync profile from Firebase auth data
  syncFromFirebase: async (firebaseData: any) => {
    // Parse displayName into firstname/lastname if available
    let firstname: string | undefined;
    let lastname: string | undefined;
    
    if (firebaseData.name || firebaseData.displayName) {
      const nameParts = (firebaseData.name || firebaseData.displayName).split(' ');
      firstname = nameParts[0];
      lastname = nameParts.slice(1).join(' ') || undefined;
    }

    const profileData: FirebaseProfile = {
      firebaseUid: firebaseData.uid,
      email: firebaseData.email,
      displayName: firebaseData.name || firebaseData.displayName,
      photoURL: firebaseData.picture || firebaseData.photoURL,
      emailVerified: firebaseData.email_verified || firebaseData.emailVerified || false,
      firstname,
      lastname,
    };

    return PersonRepository.upsertFromFirebase(profileData);
  },

  // Get profile by Firebase UID
  getProfile: async (firebaseUid: string) => {
    return PersonRepository.findByFirebaseUid(firebaseUid);
  },

  // Complete profile with additional required data
  completeProfile: async (firebaseUid: string, completionData: ProfileCompletion) => {
    return PersonRepository.completeProfile(firebaseUid, completionData);
  },

  // Update profile
  updateProfile: async (firebaseUid: string, updateData: Partial<FirebaseProfile>) => {
    return PersonRepository.updateProfile(firebaseUid, updateData);
  },

  // Check if profile needs completion
  needsCompletion: async (firebaseUid: string) => {
    const profile = await PersonRepository.findByFirebaseUid(firebaseUid);
    if (!profile) return true;
    
    return !profile.profileCompleted || !profile.phone || !profile.address;
  },
};
