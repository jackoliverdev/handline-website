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
    const { email, password, displayName, role, status, preferences } = body;
    
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 });
    }
    
    // Get Firebase Admin Auth instance
    const auth = getAuth();
    
    // Create the user in Firebase
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: displayName || undefined,
      disabled: status === 'suspended'
    });
    
    // Set custom claims for role
    await auth.setCustomUserClaims(userRecord.uid, {
      role: role || 'user',
      status: status || 'active'
    });
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: { 
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName
      }
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    // Return specific error message if available
    const errorMessage = error.message || 'Failed to create user';
    const errorCode = error.code || 'unknown-error';
    
    // Handle common Firebase errors
    if (errorCode === 'auth/email-already-exists') {
      return NextResponse.json({
        success: false,
        message: 'The email address is already in use by another account.',
        code: errorCode
      }, { status: 400 });
    }
    
    if (errorCode === 'auth/invalid-password') {
      return NextResponse.json({
        success: false,
        message: 'The password must be a string with at least 6 characters.',
        code: errorCode
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: errorMessage,
      code: errorCode
    }, { status: 500 });
  }
} 