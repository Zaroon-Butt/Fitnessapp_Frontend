import React, { useState, useContext } from 'react';
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
import { useDispatch } from 'react-redux';
import { SignUpImage, Apple, Google } from '../../utils';
import { medium24, regular, regular9 } from '../../utils/Style';
import { Formik } from 'formik';
import { SignUpSchema } from '../../utils/Validation';
import { ProvideContext } from '../../context/ProvideContext';
import { setIsUsername } from '../../redux/Reducers/userReducer';

const { width, height } = Dimensions.get('window');

export default function SignUp() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { checkEmail, updateOnboarding } = useContext(ProvideContext);

  const handleSignUp = async values => {
    try {
      setIsLoading(true);
      const emailCheck = await checkEmail(values.email);
      if (emailCheck.exists) {
        Alert.alert('Email Exists', 'This email is already registered');
        setIsLoading(false);
        return;
      }

      updateOnboarding({
        email: values.email,
        password: values.password,
      });

      // Set username in Redux to the part before '@'
      const username = values.email.split('@')[0].replace(/[0-9]/g, '');
      dispatch(setIsUsername(username));

      setIsLoading(false);
      navigation.navigate('GenderScreen');
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        'Error',
        error.message || 'An error occurred while checking email',
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      navigation.navigate('GenderScreen');
    } catch (error) {
      console.log('Google sign in error:', error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      // Add Apple sign-in logic here
      console.log('Apple sign in pressed');
      // navigation.navigate('GenderScreen');
    } catch (error) {
      console.log('Apple sign in error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundImage}>
        <Image source={SignUpImage} style={styles.image} />
        <View style={styles.gradientOverlay} />
      </View>

      {/* Top Navigation */}
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text
            style={[
              regular,
              {
                borderBottomColor: '#FFFFFF',
                borderBottomWidth: 3,
                paddingBottom: 5,
              },
            ]}
          >
            LogIn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={[
              regular,
              {
                borderBottomColor: '#D0FD3E',
                borderBottomWidth: 3,
                paddingBottom: 5,
              },
            ]}
          >
            SignUp
          </Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Text */}
      {!isInputFocused && (
        <View style={styles.textContainer}>
          <Text style={[medium24, { color: '#FFFFFF' }]}>HELLO ROOKIES</Text>
          <Text style={[regular9, { marginTop: 15 }]}>
            ENTER YOUR INFORMATION BELOW OR
          </Text>
          <Text style={regular9}>LOGIN WITH OTHER ACCOUNTS</Text>
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
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={SignUpSchema}
              onSubmit={handleSignUp}
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
                      placeholderTextColor="#888"
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
                      placeholderTextColor="#888"
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

                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#888"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      secureTextEntry
                      autoCapitalize="none"
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => {
                        setIsInputFocused(false);
                        handleBlur('confirmPassword');
                      }}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </ScrollView>

                  <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSubmit}
                  >
                    <Text style={[regular9, { color: '#1C1C1E' }]}>
                      SIGN UP
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          )}

          {!isLoading && (
            <>
              <TouchableOpacity style={styles.icon} onPress={handleAppleSignIn}>
                <View>
                  <Image source={Apple} style={{ width: 50, height: 50 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.icon, { left: 80 }]}
                onPress={handleGoogleSignIn}
              >
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
    marginBottom: 20,
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
  signUpButton: {
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
    backgroundColor: '#D0FD3E',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
