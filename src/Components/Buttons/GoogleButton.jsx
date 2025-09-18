import { useState } from 'react';
import { View, Pressable, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setIsLogin, setIsUsername } from '../../redux/Reducers/userReducer';
import { AuthApi } from '../../Api/AuthApi';
import { Google } from '../../utils';
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from '@env';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
//   androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    console.log('Google Sign-In Error:', error);
    throw error;
  }
};

export default function GoogleButton({ onLoginSuccess, onLoginError, buttonText = '', buttonStyle, textStyle, iconOnly = false }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      console.log('=== GoogleButton: handleGoogleLogin started ===');
      const response = await GoogleLogin();
      console.log('GoogleButton: Google Sign-In response:', JSON.stringify(response, null, 2));
      
      const { idToken, user } = response;

      if (idToken) {
        console.log('GoogleButton: Validating token with backend...');
        try {
          // First attempt to use the GoogleSignin from AuthApi (which calls backend)
          const apiResponse = await AuthApi.googleSignIn();
          console.log('GoogleButton: Backend response:', JSON.stringify(apiResponse, null, 2));
          
          // Set user as logged in
          dispatch(setIsLogin(true));
          
          // Set username from user info
          const username = user.name || user.email.split('@')[0].replace(/[0-9]/g, '');
          dispatch(setIsUsername(username));
          
          // Call the success callback if provided
          if (onLoginSuccess) {
            onLoginSuccess(apiResponse);
          }
        } catch (error) {
          console.log('GoogleButton: Error from AuthApi.googleSignIn:', error);
          
          // If there's an error and the callback is provided, call it
          if (onLoginError) {
            onLoginError(error);
          } else {
            // Re-throw the error if no callback is provided
            throw error;
          }
        }
      }
    } catch (apiError) {
      console.log('GoogleButton: Error during Google Sign-In:', apiError);
      setError(apiError?.message || 'Something went wrong');
      
      // Call the error callback if provided
      if (onLoginError) {
        onLoginError(apiError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    iconOnly ? (
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50 }}>
        <TouchableOpacity 
          onPress={handleGoogleLogin}
          disabled={loading}
          style={[{ borderRadius: 25, overflow: 'hidden', width: 50, height: 50, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }, buttonStyle]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#1C1C1E" />
          ) : (
            <Image source={Google} style={styles.googleIconOnly} />
          )}
        </TouchableOpacity>
      </View>
    ) : (
      <Pressable 
        style={[styles.googleButton, buttonStyle]}
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#1C1C1E" />
        ) : (
          <>
            <Image source={Google} style={styles.googleIcon} />
            {/* {buttonText && <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>} */}
          </>
        )}
      </Pressable>
    )
  );
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleIconOnly: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#1C1C1E',
    fontSize: 16,
    fontWeight: '500',
  },
});