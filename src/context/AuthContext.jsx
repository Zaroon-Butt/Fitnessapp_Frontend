// import React, { createContext, useState, useEffect } from 'react';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { Alert, Platform, ToastAndroid } from 'react-native';
// import { store } from '../redux/store';
// import { setIsLogin, setIsUsername } from '../redux/Reducers/userReducer';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Show notification based on platform
//   const showNotification = message => {
//     if (Platform.OS === 'android') {
//       ToastAndroid.showWithGravity(
//         message,
//         ToastAndroid.LONG,
//         ToastAndroid.CENTER,
//       );
//     } else {
//       Alert.alert('Notification', message);
//     }
//   };

//   useEffect(() => {
//     try {
//       // Check if Firebase is initialized
//       if (firebase.apps.length === 0) {
//         console.error(
//           'Firebase not initialized. Please check your configuration.',
//         );
//         return;
//       }

//       const subscriber = auth().onAuthStateChanged(userState => {
//         setUser(userState);
//         // The user must complete onboarding first, then manually set isLogin in WeightScreen
//         if (userState && userState.displayName) {
//           store.dispatch(
//             setIsUsername(
//               userState.displayName || userState.email.split('@')[0],
//             ),
//           );
//         }
//       });
//       return subscriber;
//     } catch (error) {
//       console.error('Error setting up auth state listener:', error);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         isLoading,
//         login: async (email, password) => {
//           try {
//             setIsLoading(true);
//             const userCredential = await auth().signInWithEmailAndPassword(
//               email,
//               password,
//             );

//             // Check if user has completed onboarding by checking Firestore
//             const userDoc = await firestore()
//               .collection('users')
//               .doc(userCredential.user.uid)
//               .get();

//             const userData = userDoc.data();

//             if (userDoc.exists && userData && userData.onboardingCompleted) {
//               showNotification('Login successful');

//               // Update Redux state
//               store.dispatch(setIsLogin(true));
//               store.dispatch(setIsUsername(email.split('@')[0]));
//             } else {
//               // If user hasn't completed onboarding, they need to go through the onboarding flow
//               showNotification('Please complete your profile setup');
//               store.dispatch(
//                 setIsUsername(
//                   userCredential.user.displayName || email.split('@')[0],
//                 ),
//               );
//               // User will be navigated to GenderScreen by the SignIn component
//             }

//             setIsLoading(false);
//           } catch (e) {
//             console.log('Login error:', e);
//             showNotification('Login details are incorrect');
//             setIsLoading(false);
//           }
//         },
//         googleLogin: async () => {
//           GoogleSignin.configure({
//             webClientId:
//               '297191463032-43rpfe3huj4t3j4862fm7u1ridan25ls.apps.googleusercontent.com',
//           });

//           try {
//             setIsLoading(true);
//             const { idToken } = await GoogleSignin.signIn();
//             const googleCredential =
//               auth.GoogleAuthProvider.credential(idToken);

//             // Sign in with Google credential
//             const userCredential = await auth().signInWithCredential(
//               googleCredential,
//             );
//             const currentUser = userCredential.user;

//             // Check if this is an existing user or new user
//             const userDoc = await firestore()
//               .collection('users')
//               .doc(currentUser.uid)
//               .get();

//             const userData = userDoc.data();

//             if (userDoc.exists && userData && userData.onboardingCompleted) {
//               // Existing user who has completed onboarding - log them in directly
//               store.dispatch(setIsLogin(true));
//               store.dispatch(
//                 setIsUsername(
//                   currentUser.displayName || currentUser.email.split('@')[0],
//                 ),
//               );
//               showNotification('Google login successful');
//             } else {
//               // New user or user who hasn't completed onboarding - save basic data and start onboarding
//               await firestore()
//                 .collection('users')
//                 .doc(currentUser.uid)
//                 .set(
//                   {
//                     name: currentUser.displayName,
//                     email: currentUser.email,
//                     createdAt: firestore.Timestamp.fromDate(new Date()),
//                     userImg: currentUser.photoURL,
//                     onboardingCompleted: false,
//                   },
//                   { merge: true },
//                 )
//                 .catch(error => {
//                   console.log('Error adding user to Firestore:', error);
//                 });

//               store.dispatch(
//                 setIsUsername(
//                   currentUser.displayName || currentUser.email.split('@')[0],
//                 ),
//               );
//               showNotification('Please complete your profile setup');
//             }

//             setIsLoading(false);
//           } catch (error) {
//             console.log('Google sign in process error:', error);
//             showNotification('Google login failed');
//             setIsLoading(false);
//           }
//         },

//         register: async values => {
//           const { email, password, name } = values;
//           try {
//             setIsLoading(true);
//             // store.dispatch(setIsLogin(false));
//             // store.dispatch(setIsUsername(''));

//             await auth()
//               .createUserWithEmailAndPassword(email, password)
//               .then(async () => {
//                 const currentUser = auth().currentUser;
//                 await currentUser.updateProfile({
//                   displayName: email.split('@')[0],
//                 });

//                 // Save user data to Firestore
//                 firestore()
//                   .collection('users')
//                   .doc(currentUser.uid)
//                   .set({
//                     name: name || email.split('@')[0],
//                     email: email,
//                     createdAt: firestore.Timestamp.fromDate(new Date()),
//                     userImg:
//                       'https://cdn-icons-png.flaticon.com/128/924/924915.png',
//                     onboardingCompleted: false,
//                   });

//                 // Update Redux state - Set username but don't login until onboarding is complete
//                 store.dispatch(setIsUsername(name || email.split('@')[0]));

//                 showNotification('Registration successful');
//                 setIsLoading(false);
//               })
//               .catch(error => {
//                 console.log('Registration error:', error);
//                 setIsLoading(false);
//                 if (error.code === 'auth/email-already-in-use') {
//                   showNotification('Email already in use');
//                   throw new Error('Email already exists');
//                 } else {
//                   showNotification('Registration failed');
//                   throw new Error('Registration failed');
//                 }
//               });
//           } catch (e) {
//             console.log('Registration process error:', e);
//             if (
//               e.message !== 'Email already exists' &&
//               e.message !== 'Registration failed'
//             ) {
//               showNotification('Registration failed');
//             }
//             setIsLoading(false);
//             throw e; // Re-throw the error to prevent navigation
//           }
//         },
//         logout: async () => {
//           try {
//             setIsLoading(true);
//             await auth().signOut();
//             store.dispatch(setIsLogin(false));
//             dispatch(userLogout());
//             showNotification('Logged out successfully');
//             setIsLoading(false);
//           } catch (e) {
//             console.log('Logout error:', e);
//             showNotification('Logout failed');
//             setIsLoading(false);
//           }
//         },
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
