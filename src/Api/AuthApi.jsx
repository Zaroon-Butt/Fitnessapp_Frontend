import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ProfilePicture } from '../utils';

// const BASE_URL = 'http://10.0.2.2:3000/api/auth';  // Emulator loopback
const BASE_URL = 'http://localhost:3000/api/auth';  // Localhost for PC
// const BASE_URL = 'https://fitness.webevis.com/api/auth'; // Production server
// const BASE_URL = 'http://192.168.100.23:3000/api/auth';

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
      console.log(
        'AuthApi: Login successful, response:',
        JSON.stringify(response.data, null, 2),
      );
      return response.data;
    } catch (error) {
      console.log('AuthApi: Login error:', error);
      console.log('AuthApi: Error response status:', error.response?.status);
      console.log(
        'AuthApi: Error response data:',
        JSON.stringify(error.response?.data, null, 2),
      );

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error(
        'Login failed. Please check your credentials and try again.',
      );
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

  signUp: async ({ email, password }) => {
    try {
      const requestData = {
        email,
        password
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

  verifyEmailOtp: async (email, otp) => {
    try {
      const response = await api.post('/verify-email-otp', { email, otp });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Email OTP verification failed');
    }
  },

  completeProfile: async ({
    token,
    Gender,
    Age,
    Height,
    Goal,
    ActivityLevel,
    Weight,
    ProfilePicture,
    
  }) => {
    try {
      const requestData = {
        token,
        Gender,
        Age,
        Height,
        Goal,
        ActivityLevel,
        Weight,
      };
      
      if (ProfilePicture) {
        requestData.ProfilePicture = ProfilePicture;
      }

      const response = await api.post('/complete-profile', requestData);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Profile completion failed');
    }
  },

  forgotPassword: async email => {
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
      const response = await api.post('/verify-reset-otp', { email, otp });
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
      const response = await api.post('/reset-password', {
        resetToken,
        newPassword,
      });
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

  updateIsPro: async (userId, isPro) => {
    try {
      const response = await api.patch('/updateIsPro', {
        userId,
        isPro,
      });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to update Pro status');
    }
  },

  // Google Sign-Up: creates/updates user profile on backend (no /complete-profile step)
  googleSignUp: async (userData = {}) => {
    try {
      console.log('=== AuthApi.googleSignUp STARTED ===');
      console.log(
        'AuthApi: Input userData:',
        JSON.stringify(userData, null, 2),
      );

      // Get user info from userData or sign in with Google if not available
      let googleUserInfo = userData.userInfo?.user;

      if (!googleUserInfo) {
        console.log(
          'AuthApi: No userInfo provided, initiating new Google Sign-In...',
        );
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
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
      console.log(
        'AuthApi: Full googleUserInfo:',
        JSON.stringify(googleUserInfo, null, 2),
      );

      // Ensure we have a photo for ProfilePicture if possible (avoid extra prompts)
      try {
        if (!googleUserInfo?.photo) {
          const current = await GoogleSignin.getCurrentUser();
          if (current?.user?.photo) {
            googleUserInfo = { ...googleUserInfo, photo: current.user.photo };
          } else if (GoogleSignin.signInSilently) {
            // signInSilently may throw if not signed in; ignore
            const silent = await GoogleSignin.signInSilently();
            if (silent?.user?.photo) {
              googleUserInfo = { ...googleUserInfo, photo: silent.user.photo };
            }
          }
        }
      } catch (e) {
        // Non-fatal: continue without photo if not available
        console.log('AuthApi: Could not enrich Google user photo:', e?.message || e);
      }

      // Prepare data for the backend
      const signUpData = {
        email: googleUserInfo.email,
        googleId: googleUserInfo.id,
        name: googleUserInfo.name || googleUserInfo.email.split('@')[0],
        // Backend no longer requires Google idToken here; it sets isEmailVerified=true
        Gender: userData.Gender,
        Age: userData.Age,
        Height: userData.Height,
        Goal: userData.Goal,
        ActivityLevel: userData.ActivityLevel,
        Weight: userData.Weight,
        ProfilePicture:
          userData.ProfilePicture || googleUserInfo?.photo || ProfilePicture || '',
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
      const response = await api.post('/google-signup', signUpData);

      return response.data;
    } catch (error) {
      // Handle specific Google Sign-In errors
      if (error.code === 7) {
        console.log('AuthApi: Error type - Google sign-in was cancelled');
        throw new Error('Google sign-in was cancelled');
      } else if (error.code === 2) {
        console.log(
          'AuthApi: Error type - Google Play Services unavailable or outdated',
        );
        throw new Error('Google Play Services unavailable or outdated');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(
          'AuthApi: Error type - Backend error with message:',
          error.response.data.message,
        );
        throw new Error(error.response.data.message);
      }
      console.log('AuthApi: Error type - Generic error');
      throw new Error(
        'Google sign-up failed: ' + (error.message || 'Unknown error'),
      );
    }
  },

  // Google Sign-In: authenticate existing Google user
  // Accepts optional payload: { googleId, email, idToken }
  // If provided, uses it directly; otherwise falls back to interactive Google sign-in
  googleSignIn: async (payload = {}) => {
    try {
      console.log('=== AuthApi.googleSignIn STARTED ===');

      let googleId = payload.googleId;
      let email = payload.email;
      const idToken = payload.idToken; // optional, forwarded if backend expects it

      if (!googleId || !email) {
        // Fallback to interactive sign-in if credentials not provided
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        googleId = userInfo?.user?.id;
        email = userInfo?.user?.email;
      }

      if (!googleId || !email) {
        throw new Error('Missing Google user id or email');
      }

      const body = { googleId, email };
      if (idToken) body.idToken = idToken;

      const response = await api.post('/google-signin', body);
      console.log('AuthApi: Google Sign-In backend response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      if (error.code === 7) {
        throw new Error('Google sign-in was cancelled');
      } else if (error.code === 2) {
        throw new Error('Google Play Services unavailable or outdated');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Google sign-in failed: ' + (error.message || 'Unknown error'));
    }
  },

  // Deprecated alias maintained for backward compatibility (will be removed)
  SignUp: async (userData) => {
    console.warn('AuthApi.SignUp is deprecated; use AuthApi.googleSignUp instead.');
    return AuthApi.googleSignUp(userData);
  },

};

// SignUp: async userData => {
//     try {
//       let googleUserInfo = userData.userInfo?.user;

//       if (!googleUserInfo) {
//         
//         await GoogleSignin.hasPlayServices({
//           showPlayServicesUpdateDialog: true,
//         });
//         const userInfo = await GoogleSignin.signIn();
//         googleUserInfo = userInfo.user;
//       } else {
//         console.log('AuthApi: Using provided userInfo from userData');
//       // Prepare data for the backend
//       const signUpData = {
//         email: googleUserInfo.email,
//         googleId: googleUserInfo.id,
//         name: googleUserInfo.name || googleUserInfo.email.split('@')[0],
//         Gender: userDatagoogle.Gender,
//         Age: userData.Age,
//         Height: userData.Height,
//         Goal: userData.Goal,
//         ActivityLevel: userData.ActivityLevel,
//         Weight: userData.Weight,
//       };

//       // Send to backend
//       const response = await api.post('/google-signup', signUpData);
//       return response.data;
//     } catch (error) {
//       // Handle specific Google Sign-In errors
//       if (error.code === 7) {
//         console.log('AuthApi: Error type - Google sign-in was cancelled');
//         throw new Error('Google sign-in was cancelled');
//       } else if (error.code === 2) {
//         console.log(
//           'AuthApi: Error type - Google Play Services unavailable or outdated',
//         );
//         throw new Error('Google Play Services unavailable or outdated');
//       } else if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         console.log(
//           'AuthApi: Error type - Backend error with message:',
//           error.response.data.message,
//         );
//         throw new Error(error.response.data.message);
//       }
//       console.log('AuthApi: Error type - Generic error');
//       throw new Error(
//         'Google sign-up failed: ' + (error.message || 'Unknown error'),
//       );
//     }
//   }