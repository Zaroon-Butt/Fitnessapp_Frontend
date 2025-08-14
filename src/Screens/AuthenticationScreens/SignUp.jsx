import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { setIsUsername } from '../../redux/Reducers/userReducer';
import { SignUpImage, Apple, Google } from '../../utils';
import { medium24, regular, regular9 } from '../../utils/Style';
const { width, height } = Dimensions.get('window');

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Email validation function
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const isValidPassword = password => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    try {
      // Validate email
      if (!email.trim()) {
        Alert.alert('Error', 'Please enter your email address');
        return;
      }

      if (!isValidEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      // Validate password
      if (!password.trim()) {
        Alert.alert('Error', 'Please enter your password');
        return;
      }

      if (!isValidPassword(password)) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
      }

      // Validate confirm password
      if (!confirmPassword.trim()) {
        Alert.alert('Error', 'Please confirm your password');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      console.log('Sign up attempted with:', { email, password });

  store.dispatch(setIsUsername(email.split('@')[0]));
  navigation.navigate('GenderScreen');
    } catch (error) {
      console.log('Sign up error:', error);
      Alert.alert(
        'Sign Up Error',
        'An error occurred during sign up. Please try again.',
      );
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
        <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={[
              regular,
              { borderBottomColor: '#FFFFFF', borderBottomWidth: 2 },
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
              { borderBottomColor: '#FFFFFF', borderBottomWidth: 2 },
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Password Again"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={handleSignUp}>
            <View>
              <Image source={Apple} style={{ width: 50, height: 50 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { left: 80 }]}
            onPress={handleSignUp}
          >
            <View>
              <Image source={Google} style={{ width: 50, height: 50 }} />
            </View>
          </TouchableOpacity>
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
  signUpButtonText: {
    color: '#1C1C1E',
    fontSize: 16,
    fontWeight: 'bold',
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
