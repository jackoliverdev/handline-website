import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK if not already initialized
if (getApps().length === 0) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK || '{}');
  
  try {
    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid } = body;
    
    if (!firebaseUid) {
      return NextResponse.json({
        success: false,
        message: 'Firebase UID is required'
      }, { status: 400 });
    }
    
    // Get Firebase Admin Auth instance
    const auth = getAuth();
    
    // Delete the user from Firebase
    await auth.deleteUser(firebaseUid);
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      data: { 
        firebaseUid
      }
    });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    
    // Return specific error message if available
    const errorMessage = error.message || 'Failed to delete user';
    const errorCode = error.code || 'unknown-error';
    
    return NextResponse.json({
      success: false,
      message: errorMessage,
      code: errorCode
    }, { status: 500 });
  }
} 