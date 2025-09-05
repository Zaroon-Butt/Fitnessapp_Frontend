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
} from 'react-native';
import { normal, regular } from '../../utils/Style'; // Assuming these styles are defined in your Style.js
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../Components/Buttons/BackButton';
const OtpScreen = () => {
  const navigation = useNavigation();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));

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

        <TouchableOpacity style={styles.tryAnotherWayButton}>
          <Text style={regular}>
            Did You Receive Any Code ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.verifyButton} onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ ...regular, color: '#1C1C1E' }}>Verify</Text>
        </TouchableOpacity>
      </View>
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
