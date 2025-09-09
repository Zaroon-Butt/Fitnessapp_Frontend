'use client';

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { heading, light, medium, normal, regular } from '../../utils/Style';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../../Components/Buttons/BackButton';
import { AuthApi } from '../../Api/AuthApi';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { resetToken } = route.params || {};

  const handleResetPassword = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!resetToken) {
      Alert.alert('Error', 'Reset token not found. Please try the process again.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await AuthApi.resetPassword(resetToken, password);
      Alert.alert(
        'Success',
        response.message || 'Password reset successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1c1c1e" />

      {/* Header */}
      <View style={styles.header}>
        <BackButton />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={[normal, { textAlign: 'flex-end' }]}>RESET PASSWORD</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="New Password"
            placeholderTextColor="#434343"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={[styles.passwordInput, { marginTop: 20 }]}
            placeholder="Confirm New Password"
            placeholderTextColor="#434343"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#1C1C1E" size="small" />
          ) : (
            <Text style={{ ...regular, color: '#1C1C1E', padding: 4 }}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '300',
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 44,

    marginBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 64,
  },
  inputContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  passwordInput: {
    fontSize: 18,
    color: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#434343',
    backgroundColor: 'transparent',
  },
  tryAnotherWayButton: {
    marginBottom: 32,
  },
  tryAnotherWayText: {
    fontSize: 16,
    color: '#d0fd3e',
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#d0fd3e',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  }
});

export default ResetPassword;
