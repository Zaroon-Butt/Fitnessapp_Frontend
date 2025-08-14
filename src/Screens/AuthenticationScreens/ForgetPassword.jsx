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
} from 'react-native';
import { heading, light, medium, normal, regular } from '../../utils/Style';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../Components/Buttons/BackButton';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

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

        <TouchableOpacity style={styles.tryAnotherWayButton}>
          <Text style={styles.tryAnotherWayText}>Try another way</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => navigation.navigate('OtpScreen')}
        >
          <Text style={styles.sendButtonText}>Send</Text>
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
