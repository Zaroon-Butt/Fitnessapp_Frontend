import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';
import BackButton from '../../Components/Buttons/BackButton';
import { normal16 } from '../../utils/Style';

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { marginLeft: 70 }]}>Contact Us</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Contact# 012345678910</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Email: Webevis@gmail.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 60,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1e',
    borderBottomColor: '#2c2c2e',
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 20,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    paddingVertical: 15,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ContactUsScreen;
