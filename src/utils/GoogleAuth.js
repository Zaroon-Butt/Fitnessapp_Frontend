import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GOOGLE_WEB_CLIENT_ID,
} from '@env';

// Log the configuration values to check if they're loaded correctly
console.log('GoogleAuth: Configuration values:');
console.log('- WebClientID:', GOOGLE_WEB_CLIENT_ID ? 'Available' : 'Missing');

// Configure GoogleSignin
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
  offlineAccess: false, // Don't ask for offline access
  forceCodeForRefreshToken: true, // Force code for refresh token
  hostedDomain: '', // Specify domain for Google accounts
  accountName: '', // Specify account name
  uxMode: 'popup', // Use popup for web
  prompt: 'select_account', // Always prompt for account selection
});

/**
 * Performs Google Sign In and returns user info
 * @returns {Promise} Google user info object
 */
export const GoogleLogin = async () => {
  try {
    console.log('GoogleAuth: Starting Google Sign In process');
    
    // Check if your device supports Google Play
    console.log('GoogleAuth: Checking Google Play Services');
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('GoogleAuth: Google Play Services available');
    
    // Sign in with Google
    console.log('GoogleAuth: Initiating Google Sign In');
    const userInfo = await GoogleSignin.signIn();
    
    // Log user info safely
    if (userInfo) {
      console.log('GoogleAuth: Google Sign In successful');
      console.log('GoogleAuth: User ID:', userInfo.user?.id || 'Not available');
      console.log('GoogleAuth: User Email:', userInfo.user?.email || 'Not available');
      console.log('GoogleAuth: User Name:', userInfo.user?.name || 'Not available');
    } else {
      console.log('GoogleAuth: Google Sign In successful but no user info returned');
    }
    
    return userInfo;
  } catch (error) {
    console.log('GoogleAuth: Google Sign In Error:', error);
    console.log('GoogleAuth: Error Code:', error.code);
    console.log('GoogleAuth: Error Message:', error.message);
    
    // Handle common error codes with clearer messages
    if (error.code === 7) {
      console.log('GoogleAuth: User cancelled sign-in');
    } else if (error.code === 2) {
      console.log('GoogleAuth: Play Services not available');
    }
    
    throw error;
  }
};

/**
 * Signs out the current Google user
 */
export const GoogleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error('Google Sign-Out Error:', error);
    throw error;
  }
};

/**
 * Checks if a user is currently signed in
 * @returns {Promise} Current signed-in user info or null
 */
export const isGoogleSignedIn = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser;
    }
    return null;
  } catch (error) {
    console.error('Google Sign-In Check Error:', error);
    return null;
  }
};