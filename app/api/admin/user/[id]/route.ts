import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'User ID is required'
      }, { status: 400 });
    }
    
    // First try to get user from 'users' table
    let { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    // If not found in users table, try with firebase_uid
    if (userError) {
      let { data: userByFirebaseId, error: firebaseIdError } = await supabase
        .from('users')
        .select('*')
        .eq('firebase_uid', id)
        .single();
        
      if (!firebaseIdError && userByFirebaseId) {
        userData = userByFirebaseId;
        userError = null;
      }
    }
    
    // If still not found, try profiles table
    if (userError) {
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
        
      if (!profileError && profileData) {
        userData = profileData;
        userError = null;
      } else {
        // Try with firebase_uid in profiles
        let { data: profileByFirebaseId, error: profileFirebaseIdError } = await supabase
          .from('profiles')
          .select('*')
          .eq('firebase_uid', id)
          .single();
          
        if (!profileFirebaseIdError && profileByFirebaseId) {
          userData = profileByFirebaseId;
          userError = null;
        }
      }
    }
    
    if (userError || !userData) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: userData
    });
  } catch (error: any) {
    console.error('Error getting user:', error);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to get user'
    }, { status: 500 });
  }
} 