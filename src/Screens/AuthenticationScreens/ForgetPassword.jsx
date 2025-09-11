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
  ActivityIndicator,
} from 'react-native';
import { heading, light, medium, normal, regular } from '../../utils/Style';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../Components/Buttons/BackButton';
import { AuthApi } from '../../Api/AuthApi';
import AlertModal from '../Modals/AlertModal';

const ForgotPasswordScreen = () => {

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtonText, setAlertButtonText] = useState('OK');
  const [onAlertClose, setOnAlertClose] = useState(null);




  const showAlert = ({
    title = 'Alert',
    message = '',
    buttonText = 'OK',
    onClose = null,
  }) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertButtonText(buttonText);
    setOnAlertClose(() => onClose);
    setAlertVisible(true);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (onAlertClose) {
      onAlertClose();
    }
  };

  const handleSendOTP = async () => {
    if (!email.trim()) {
      showAlert({ title: 'Error', message: 'Please enter your email address' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert({ title: 'Error', message: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending OTP to:', email);
      const response = await AuthApi.forgotPassword(email);
      console.log('OTP Response:', response);
      showAlert({
        title: 'Success',
        message: response.message || 'OTP sent to your email successfully',
        buttonText: 'OK',
        onClose: () => {
          console.log('Navigating to OtpScreen with email:', email);
          navigation.navigate('OtpScreen', { email });
        },
      });
    } catch (error) {
      console.error('OTP Error:', error);
      showAlert({ title: 'Error', message: error.message || 'Failed to send OTP' });
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
        <Text style={[normal, { textAlign: 'flex-end' }]}>
          FORGOT PASSWORD?
        </Text>

        <Text style={[regular, { marginTop: 20, textAlign: 'flex-end' }]}>
          ENTER YOUR INFORMATIONS BELOW OR{'\n'}LOGIN WITH A OTHER ACCOUNT
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Email"
            placeholderTextColor="#434343"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* <TouchableOpacity style={styles.tryAnotherWayButton}>
          <Text style={regular}>Try another way</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.sendButton, isLoading && { opacity: 0.7 }]}
          onPress={handleSendOTP}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#1C1C1E" size="small" />
          ) : (
            <Text style={{ ...regular, color: '#1C1C1E', padding: 4 }}>Send</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Alert Modal */}
      <AlertModal
        visible={alertVisible}
        onClose={handleAlertClose}
        alertTitle={alertTitle}
        alertMessage={alertMessage}
        buttonText={alertButtonText}
      />
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
  emailInput: {
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
  sendButton: {
    backgroundColor: '#d0fd3e',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});

export default ForgotPasswordScreen;
