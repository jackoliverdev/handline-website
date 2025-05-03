import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeFirebaseAdmin } from '@/lib/firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
try {
  initializeFirebaseAdmin();
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
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