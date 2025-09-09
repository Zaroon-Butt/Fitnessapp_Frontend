import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NotificationModal = ({
  visible,
  onClose,
  trainerName = '',
  reminderTime = '',
  appointmentTime = '',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Appointment Booked!</Text>
          <Text style={styles.message}>
            Your appointment with <Text style={styles.bold}>{trainerName}</Text> has been scheduled.{"\n\n"}
            <Text style={styles.label}>Reminder:</Text> {reminderTime}{"\n"}
            <Text style={styles.label}>Appointment:</Text> {appointmentTime}
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 320,
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    width: 56,
    height: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    fontFamily: 'IntegralCF-Bold',
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'IntegralCF-Regular',
  },
  bold: {
    fontWeight: 'bold',
    color: '#D3FF25',
  },
  label: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#D3FF25',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'IntegralCF-Bold',
  },
});

export default NotificationModal;
