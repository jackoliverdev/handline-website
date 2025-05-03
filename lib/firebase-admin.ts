import { initializeApp, getApps, cert } from 'firebase-admin/app';

export function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    try {
      const serviceAccountStr = process.env.FIREBASE_ADMIN_SDK;
      if (!serviceAccountStr) {
        throw new Error('FIREBASE_ADMIN_SDK environment variable is not set');
      }

      // Clean the service account string
      // 1. Replace literal \n with newlines
      // 2. Remove any unexpected control characters
      const cleanedStr = serviceAccountStr
        .replace(/\\n/g, '\n')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

      const serviceAccount = JSON.parse(cleanedStr);

      initializeApp({
        credential: cert(serviceAccount)
      });
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      throw error;
    }
  }
}
