import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from '@env';

export const configureGoogleSignIn = () => {
  const config = {
    webClientId: GOOGLE_WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
  };
  
  console.log('Configuring Google Sign-In with:');
  console.log('- webClientId:', config.webClientId ? `${config.webClientId.substring(0, 8)}...` : 'undefined');
  
  GoogleSignin.configure(config);
  console.log('Google Sign-In configuration complete');
};

/**
 * Performs Google Sign-In and returns user information
 * @returns {Promise<Object>} The user information object from Google
 */
export const googleLogin = async () => {
  try {
    // Make sure Google Play Services are available (Android only)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // Perform the sign-in
    const userInfo = await GoogleSignin.signIn();
    
    return userInfo;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

/**
 * Checks if user is currently signed in with Google
 * @returns {Promise<boolean>} Whether user is signed in
 */
export const isGoogleSignedIn = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  } catch (error) {
    console.error('Error checking Google sign-in status:', error);
    return false;
  }
};

/**
 * Signs out the current Google user
 * @returns {Promise<void>}
 */
export const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('Google Sign-Out successful');
  } catch (error) {
    console.error('Google Sign-Out Error:', error);
    throw error;
  }
};

/**
 * Gets current signed-in user data without triggering the sign-in flow
 * @returns {Promise<Object|null>} The current user or null if not signed in
 */
export const getCurrentGoogleUser = async () => {
  try {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error('Error getting current Google user:', error);
    return null;
  }
};