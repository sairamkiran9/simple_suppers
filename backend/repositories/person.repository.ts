import { PrismaClient } from '@prisma/client';
import { FirebaseProfile, ProfileCompletion } from '../validators/person.validator';

const prisma = new PrismaClient();

export const PersonRepository = {
  // Create profile from Firebase data
  createFromFirebase: async (data: FirebaseProfile) => {
    return prisma.person.create({ 
      data: {
        firebaseUid: data.firebaseUid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        emailVerified: data.emailVerified,
        firstname: data.firstname,
        lastname: data.lastname,
        profileCompleted: false,
      }
    });
  },

  // Find profile by Firebase UID
  findByFirebaseUid: async (firebaseUid: string) => {
    return prisma.person.findUnique({
      where: { firebaseUid },
      include: {
        address: true,
        consumer: true,
        producer: true,
      }
    });
  },

  // Update profile (upsert pattern)
  upsertFromFirebase: async (data: FirebaseProfile) => {
    return prisma.person.upsert({
      where: { firebaseUid: data.firebaseUid },
      update: {
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        emailVerified: data.emailVerified,
        firstname: data.firstname,
        lastname: data.lastname,
      },
      create: {
        firebaseUid: data.firebaseUid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        emailVerified: data.emailVerified,
        firstname: data.firstname,
        lastname: data.lastname,
        profileCompleted: false,
      }
    });
  },

  // Complete profile with additional data
  completeProfile: async (firebaseUid: string, data: ProfileCompletion) => {
    return prisma.$transaction(async (tx) => {
      // Update person
      const person = await tx.person.update({
        where: { firebaseUid },
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          profileCompleted: true,
        }
      });

      // Create address
      const address = await tx.address.create({
        data: {
          ...data.address,
          personFirebaseUid: firebaseUid,
        }
      });

      return { person, address };
    });
  },

  // Update profile fields
  updateProfile: async (firebaseUid: string, data: Partial<FirebaseProfile>) => {
    return prisma.person.update({
      where: { firebaseUid },
      data,
    });
  },
};
