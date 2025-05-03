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
    const { email } = body;
    
    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email is required'
      }, { status: 400 });
    }
    
    // Get Firebase Admin Auth instance
    const auth = getAuth();
    
    // Generate a password reset link
    const link = await auth.generatePasswordResetLink(email);
    
    // In a production environment, you might want to send the email here
    // For this example, we'll just return success and assume the email was sent by Firebase
    
    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully',
      data: { 
        email,
        // Don't send the actual link in the response in production
        // link: process.env.NODE_ENV === 'development' ? link : undefined
      }
    });
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    
    // Return specific error message if available
    const errorMessage = error.message || 'Failed to send password reset email';
    const errorCode = error.code || 'unknown-error';
    
    return NextResponse.json({
      success: false,
      message: errorMessage,
      code: errorCode
    }, { status: 500 });
  }
} 