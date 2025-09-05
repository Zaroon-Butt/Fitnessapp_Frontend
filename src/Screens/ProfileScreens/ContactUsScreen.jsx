import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RF } from '../../utils/responsive';
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
        <Text style={styles.infoText}>Contact</Text>
        <Text style={styles.infoText}>01234567890</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Email</Text>
        <Text style={styles.infoText}>Webevis@gmail.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RF(10),
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RF(10),
    marginTop: RF(30),
    marginBottom: RF(60),
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderBottomColor: '#2c2c2e',
    borderBottomWidth: 2,
    paddingVertical: RF(5),
    paddingHorizontal: RF(15),
    borderRadius: RF(12),
    marginBottom: RF(12),
    marginTop: RF(20),
  },
  infoText: {
    color: '#fff',
    fontSize: RF(16),
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: RF(5)
  },
  buttonContainer: {
    marginTop: RF(30),
  },
 
});

export default ContactUsScreen;
