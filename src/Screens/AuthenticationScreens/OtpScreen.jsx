'use client';

import React, { use, useRef, useState } from 'react';
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
import { normal, regular } from '../../utils/Style';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../../Components/Buttons/BackButton';
import { AuthApi } from '../../Api/AuthApi';
import AlertModal from '../Modals/AlertModal';

const OtpScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
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

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      showAlert({
        title: 'Error',
        message: 'Please enter the complete 6-digit OTP',
      });
      return;
    }

    if (!email) {
      showAlert({
        title: 'Error',
        message: 'Email not found. Please go back and try again.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await AuthApi.verifyOTP(email, otpString);
      showAlert({
        title: 'Success',
        message: 'OTP verified successfully',
        onClose: () =>
          navigation.navigate('ResetPassword', {
            resetToken: response.resetToken,
          }),
      });
    } catch (error) {
      showAlert({
        title: 'Error',
        message: error.message || 'OTP verification failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      showAlert({
        title: 'Error',
        message: 'Email not found. Please go back and try again.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await AuthApi.forgotPassword(email);
      showAlert({ title: 'Success', message: 'OTP sent again to your email' });
      // Clear current OTP
      setOtp(new Array(6).fill(''));
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      showAlert({
        title: 'Error',
        message: error.message || 'Failed to resend OTP',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    if (text === '') {
      // Allow clearing the input
      newOtp[index] = '';
      setOtp(newOtp);
    } else if (/^\d$/.test(text)) {
      // Only allow single digits
      newOtp[index] = text;
      setOtp(newOtp);

      // Auto-focus next input if available
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] !== '') {
        // Clear current field if it has content
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it if current field is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1c1c1e" />

      <View style={styles.header}>
        <BackButton onPress={handleBack} />
      </View>

      <View style={styles.mainContent}>
        <Text style={[normal, { textAlign: 'left' }]}>VERIFICATION</Text>

        <Text style={[regular, { marginTop: 20, textAlign: 'left' }]}>
          Check your email. We’ve sent you{'\n'} the PIN at your email
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  borderBottomColor: digit ? '#d0fd3e' : '#333',
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              autoFocus={index === 0}
              selectionColor="#d0fd3e"
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.tryAnotherWayButton}
          onPress={handleResendOTP}
        >
          <Text style={regular}>Did You Receive Any Code? Resend OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.verifyButton, isLoading && { opacity: 0.7 }]}
          onPress={handleVerifyOTP}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#1C1C1E" size="small" />
          ) : (
            <Text style={{ ...regular, color: '#1C1C1E' }}>Verify</Text>
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
    flex: 1,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 45,
    marginBottom: 32,
  },
  otpInput: {
    width: 40,
    height: 50,
    fontSize: 22,
    textAlign: 'center',
    color: '#ffffff',
    borderBottomWidth: 2,
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
  verifyButton: {
    backgroundColor: '#d0fd3e',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 32,
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});

export default OtpScreen;
