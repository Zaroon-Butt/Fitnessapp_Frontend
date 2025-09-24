import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// const BASE_URL = 'http://10.0.2.2:3000/api/auth';
const BASE_URL = 'http://localhost:3000/api/auth'; // iOS simulator


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const AuthApi = {
  signIn: async ({ email, password }) => {
    try {
      console.log('AuthApi: Attempting login with email:', email);
      const response = await api.post('/login', { email, password });
      console.log('AuthApi: Login successful, response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.log('AuthApi: Login error:', error);
      console.log('AuthApi: Error response status:', error.response?.status);
      console.log('AuthApi: Error response data:', JSON.stringify(error.response?.data, null, 2));
      
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  },

  checkEmail: async email => {
    try {
      const response = await api.post('/checkEmail', { email });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Email check failed');
    }
  },

  signUp: async ({
    email,
    password,
    Gender,
    Age,
    Height,
    Goal,
    ActivityLevel,
    Weight,
    isPro,
  }) => {
    try {
      const requestData = {
        email,
        password,
        Gender,
        Age,
        Height,
        Goal,
        ActivityLevel,
        Weight,
        isPro,
      };

      const response = await api.post('/signup', requestData);

      return response.data;
    } catch (error) {
      console.log('Error status:', error.response?.status);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Signup failed');
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/forgot-password', { email });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to send OTP');
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const response = await api.post('/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('OTP verification failed');
    }
  },

  resetPassword: async (resetToken, newPassword) => {
    try {
      const response = await api.post('/reset-password', { resetToken, newPassword });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Password reset failed');
    }
  },

  // Google Sign-In for existing users
  // googleSignIn: async () => {
  //   try {
  //     console.log('=== AuthApi.googleSignIn STARTED ===');
      
  //     // Step 1: Sign in with Google to get user information
  //     console.log('AuthApi: Step 1 - Checking Google Play Services...');
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     console.log('AuthApi: Google Play Services check passed');
      
  //     console.log('AuthApi: Step 2 - Initiating Google Sign-In...');
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('AuthApi: Google Sign-In successful, user info received:');
  //     console.log('AuthApi: User Email:', userInfo.user.email);
  //     console.log('AuthApi: User ID:', userInfo.user.id);
  //     console.log('AuthApi: User Name:', userInfo.user.name);
  //     console.log('AuthApi: Full userInfo object:', JSON.stringify(userInfo, null, 2));
      
  //     // Step 2: Send Google user info to your backend for authentication
  //     console.log('AuthApi: Step 3 - Preparing backend request...');
  //     const backendPayload = {
  //       email: userInfo.user.email,
  //       googleId: userInfo.user.id,
  //       name: userInfo.user.name || userInfo.user.email.split('@')[0],
  //     };
  //     console.log('AuthApi: Backend payload:', JSON.stringify(backendPayload, null, 2));
  //     console.log('AuthApi: Making POST request to /google-signin...');
      
  //     const response = await api.post('/google-signin', backendPayload);
      
  //     console.log('AuthApi: Backend response received:');
  //     console.log('AuthApi: Response status:', response.status);
  //     console.log('AuthApi: Response data:', JSON.stringify(response.data, null, 2));
  //     console.log('=== AuthApi.googleSignIn COMPLETED SUCCESSFULLY ===');
      
  //     return response.data;
  //   } catch (error) {
  //     console.log('=== AuthApi.googleSignIn ERROR ===');
  //     console.log('AuthApi: Error object:', error);
  //     console.log('AuthApi: Error message:', error.message);
  //     console.log('AuthApi: Error code:', error.code);
  //     console.log('AuthApi: Error response status:', error.response?.status);
  //     console.log('AuthApi: Error response data:', error.response?.data);
  //     console.log('AuthApi: Full error details:', JSON.stringify(error, null, 2));
      
  //     // Handle specific Google Sign-In errors
  //     if (error.code === 7) {
  //       console.log('AuthApi: Error type - Google sign-in was cancelled');
  //       throw new Error('Google sign-in was cancelled');
  //     } else if (error.code === 2) {
  //       console.log('AuthApi: Error type - Google Play Services unavailable or outdated');
  //       throw new Error('Google Play Services unavailable or outdated');
  //     } else if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.message
  //     ) {
  //       console.log('AuthApi: Error type - Backend error with message:', error.response.data.message);
  //       throw new Error(error.response.data.message);
  //     }
  //     console.log('AuthApi: Error type - Generic error');
  //     throw new Error('Google sign-in failed: ' + (error.message || 'Unknown error'));
  //   }
  // },

  // Google Sign-Up for new users with onboarding data
  SignUp: async (userData) => {
    try {
      console.log('=== AuthApi.googleSignUp STARTED ===');
      console.log('AuthApi: Input userData:', JSON.stringify(userData, null, 2));
      
      // Get user info from userData or sign in with Google if not available
      let googleUserInfo = userData.userInfo?.user;
      
      if (!googleUserInfo) {
        console.log('AuthApi: No userInfo provided, initiating new Google Sign-In...');
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log('AuthApi: Google Play Services check passed');
        
        const userInfo = await GoogleSignin.signIn();
        console.log('AuthApi: New Google Sign-In successful');
        googleUserInfo = userInfo.user;
      } else {
        console.log('AuthApi: Using provided userInfo from userData');
      }
      
      console.log('AuthApi: Google user info for sign-up:');
      console.log('AuthApi: Email:', googleUserInfo.email);
      console.log('AuthApi: ID:', googleUserInfo.id);
      console.log('AuthApi: Name:', googleUserInfo.name);
      console.log('AuthApi: Full googleUserInfo:', JSON.stringify(googleUserInfo, null, 2));
      
      // Prepare data for the backend
      const signUpData = {
        email: googleUserInfo.email,
        googleId: googleUserInfo.id,
        name: googleUserInfo.name || googleUserInfo.email.split('@')[0],
        Gender: userDatagoogle.Gender,
        Age: userData.Age,
        Height: userData.Height,
        Goal: userData.Goal,
        ActivityLevel: userData.ActivityLevel,
        Weight: userData.Weight,
      };
      
      console.log('AuthApi: Prepared sign-up data for backend:');
      console.log('AuthApi: Email:', signUpData.email);
      console.log('AuthApi: GoogleId:', signUpData.googleId);
      console.log('AuthApi: Name:', signUpData.name);
      console.log('AuthApi: Gender:', signUpData.Gender);
      console.log('AuthApi: Age:', signUpData.Age);
      console.log('AuthApi: Height:', signUpData.Height);
      console.log('AuthApi: Goal:', signUpData.Goal);
      console.log('AuthApi: ActivityLevel:', signUpData.ActivityLevel);
      console.log('AuthApi: Weight:', signUpData.Weight);
      console.log('AuthApi: Full signUpData object:', JSON.stringify(signUpData, null, 2));
      
      // Send to backend
      console.log('AuthApi: Making POST request to /google-signup...');
      const response = await api.post('/google-signup', signUpData);
      
      console.log('AuthApi: Backend response received:');
      console.log('AuthApi: Response status:', response.status);
      console.log('AuthApi: Response data:', JSON.stringify(response.data, null, 2));
      console.log('=== AuthApi.googleSignUp COMPLETED SUCCESSFULLY ===');
      
      return response.data;
    } catch (error) {
      console.log('=== AuthApi.googleSignUp ERROR ===');
      console.log('AuthApi: Error object:', error);
      console.log('AuthApi: Error message:', error.message);
      console.log('AuthApi: Error code:', error.code);
      console.log('AuthApi: Error response status:', error.response?.status);
      console.log('AuthApi: Error response data:', error.response?.data);
      console.log('AuthApi: Full error details:', JSON.stringify(error, null, 2));
      
      // Handle specific Google Sign-In errors
      if (error.code === 7) {
        console.log('AuthApi: Error type - Google sign-in was cancelled');
        throw new Error('Google sign-in was cancelled');
      } else if (error.code === 2) {
        console.log('AuthApi: Error type - Google Play Services unavailable or outdated');
        throw new Error('Google Play Services unavailable or outdated');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log('AuthApi: Error type - Backend error with message:', error.response.data.message);
        throw new Error(error.response.data.message);
      }
      console.log('AuthApi: Error type - Generic error');
      throw new Error('Google sign-up failed: ' + (error.message || 'Unknown error'));
    }
  },
};
