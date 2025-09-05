import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { setIsLogin, setIsUsername } from '../../redux/Reducers/userReducer';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignInImage, Apple, Google } from '../../utils';
import {
  medium24,
  regular,
} from '../../utils/Style';
import { Formik } from 'formik';
import { SignInSchema } from '../../utils/Validation';
import { AuthApi } from '../../Api/AuthApi';
const { width, height } = Dimensions.get('window');

export default function SignIn() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  // Removed AuthContext usage for login

  const handleSignIn = async (values) => {
    try {
      setIsLoading(true);
      const data = await AuthApi.signIn({ email: values.email, password: values.password });
      const username = values.email.split('@')[0].replace(/[0-9]/g, '');

      dispatch(setIsLogin(true));
      dispatch(setIsUsername(username));
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'An error occurred');
      console.log('Sign in error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      const currentState = store.getState().user;
      if (currentState.isLogin && !currentState.gender) {
        navigation.navigate('GenderScreen');
      }
    } catch (error) {
      console.log('Google sign in error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundImage}>
        <Image source={SignInImage} style={styles.image} />
        <View style={styles.gradientOverlay} />
      </View>

      {/* Top Navigation */}
      <View style={styles.topNavigation}>
        <TouchableOpacity>
          <Text
            style={[
              regular,
              {
                borderBottomColor: '#D0FD3E',
                borderBottomWidth: 3,
                paddingBottom: 5,
                color: '#FFFFFF',
              },
            ]}
          >
            LogIn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={[
              regular,
              {
                borderBottomColor: '#FFFFFF',
                borderBottomWidth: 3,
                paddingBottom: 5,
                color: '#FFFFFF',
              },
            ]}
          >
            SignUp
          </Text>
        </TouchableOpacity>
      </View>

      {!isInputFocused && (
        <View style={styles.textContainer}>
          <Text style={[medium24, { color: '#FFFFFF' }]}>WELCOME BACK</Text>
          <Text style={[medium24, { color: '#FFFFFF' }]}>
            {store.getState().user.isUsername}
          </Text>
        </View>
      )}

      {/* Diagonal Overlay with Form */}
      <View style={styles.overlayWrapper}>
        <View style={styles.diagonalOverlay} />

        <View style={styles.formContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#D0FD3E" marginBottom={20} />
          ) : (
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignInSchema}
              onSubmit={handleSignIn}
            >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <ScrollView style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                      setIsInputFocused(false);
                      handleBlur('email');
                    }}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                    autoCapitalize="none"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                      setIsInputFocused(false);
                      handleBlur('password');
                    }}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <TouchableOpacity>
                    <Text
                      onPress={() => navigation.navigate('ForgetPassword')}
                      style={{
                        ...regular,
                        color: '#D0FD3E',
                        marginTop: 10,
                        textAlign: 'right',
                      }}
                    >
                      Forget Password ?
                    </Text>
                  </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity
                  style={styles.SignInButton}
                  onPress={handleSubmit}
                >
                  <Text style={{ ...regular, color: '#1C1C1E' }}>LOGIN </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          )}

          {!isLoading && (
            <>
              <TouchableOpacity style={styles.icon} onPress={() => console.log('Apple sign in pressed')}>
                <View>
                  <Image source={Apple} style={{ width: 50, height: 50 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.icon, { left: 80 }]} onPress={handleGoogleSignIn}>
                <View>
                  <Image source={Google} style={{ width: 50, height: 50 }} />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  backgroundImage: {
    width: width,
    height: height * 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 28, 30, 0.4)',
  },
  topNavigation: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    gap: 20,
    zIndex: 2,
  },
  textContainer: {
    position: 'absolute',
    top: height * 0.3,
    left: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  overlayWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  diagonalOverlay: {
    position: 'absolute',
    width: width * 1.5,
    height: height * 0.5,
    backgroundColor: '#1C1C1E',
    transform: [{ rotate: '-20deg' }],
    bottom: -height * 0.1,
    right: -width * 0.25,
    zIndex: 0,
  },
  formContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    zIndex: 1,
    position: 'relative',
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1C1C1E',
    marginBottom: 15,
    color: '#FFFFFF',
    placeholderTextColor: '#FFFFFF',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 12,
    marginBottom: 10,
    marginTop: -10,
  },
  SignInButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 100,
    height: 40,
    backgroundColor: '#D0FD3E',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  icon: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
