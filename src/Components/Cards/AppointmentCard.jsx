import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { regular16 } from '../../utils/Style';

const AppointmentCard = ({ appointment, onCancel, onCall }) => {
  const [isCallEnabled, setIsCallEnabled] = useState(false);
  
  if (!appointment) {
    console.error("AppointmentCard: appointment is undefined");
    return null;
  }
  
  const {
    trainerName = "Unknown Trainer",
    trainerRating = 0,
    trainerSpecialty = "General Training",
    appointmentDate = "01 January 2023 - Monday",
    appointmentTime = "12:00 PM",
    trainerImage = null
  } = appointment || {};

  // Function to check if the appointment time has been reached
  useEffect(() => {
    const checkAppointmentTime = () => {
      const now = new Date();
      // Extract appointment date and time
      const [day, month, year, dayOfWeek] = appointmentDate
        .replace('-', '')
        .split(' ')
        .filter(item => item !== '');
      
      // Convert month name to number
      const monthMap = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      
      const monthNum = monthMap[month];
      
      // Parse time (convert 12h format to 24h)
      const [time, period] = appointmentTime.split(' ');
      let [hours, minutes] = time.split(':');
      if (period === 'PM' && hours !== '12') {
        hours = parseInt(hours) + 12;
      } else if (period === 'AM' && hours === '12') {
        hours = 0;
      }
      
      // Create appointment date object
      const appointmentDateTime = new Date(
        parseInt(year), 
        monthNum, 
        parseInt(day), 
        parseInt(hours), 
        parseInt(minutes)
      );
      
      // Enable call button if current time is within 15 minutes of appointment time
      const timeDiff = (appointmentDateTime - now) / (1000 * 60); // difference in minutes
      setIsCallEnabled(timeDiff <= 15 && timeDiff >= -60); // Enable 15 min before and up to 60 min after
    };
    
    // Check initially
    checkAppointmentTime();
    
    // Set interval to check every minute
    const intervalId = setInterval(checkAppointmentTime, 60000);
    
    return () => clearInterval(intervalId);
  }, [appointmentDate, appointmentTime]);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Upcoming Appointment</Text>
      <View style={styles.trainerRow}>
        <Image 
          source={typeof trainerImage === 'number' ? trainerImage : require('../../images/ProfilePic.png')} 
          style={styles.profileImage} 
        />
        <View style={styles.trainerInfo}>
          <Text style={styles.trainerName}>{trainerName}</Text>
          <Text style={styles.trainerSpecialty}>{trainerSpecialty}</Text>
        </View>
        <View style={styles.ratingBox}>
          <Text style={styles.ratingText}>{trainerRating}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      {/* Date and Time */}
      <Text style={styles.label}>Date</Text>
      <Text style={styles.date}>{appointmentDate}</Text>
      <Text style={styles.label}>Time</Text>
      <Text style={styles.time}>{appointmentTime}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={onCancel}
        >
          <Text style={[regular16, { color: '#fff' }]}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.callButton,
            !isCallEnabled && styles.disabledButton
          ]} 
          onPress={onCall}
          disabled={!isCallEnabled}
        >
          <Text style={[regular16, { color: '#000' }]}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 6,
  },
  trainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trainerSpecialty: {
    color: '#C6FF3D',
    fontSize: 13,
  },
  ratingBox: {
    backgroundColor: '#C6FF3D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#3C3C3E',
    marginVertical: 12,
  },
  date: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  time: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#3A3A3C',
  },
  callButton: {
    backgroundColor: '#C6FF3D',
  },
  disabledButton: {
    backgroundColor: '#666666',
    opacity: 0.6,
  },
});

export default AppointmentCard;