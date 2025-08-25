import { regular16 } from '../../utils/Style';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WorkoutDetailImage } from '../../utils';
import BigButton from '../../Components/Buttons/BigButton';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PaymentCompleteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointmentDetails } = route.params || {};

  const trainerName = appointmentDetails?.trainerName || 'Emily Kevin';
  const trainerRating = appointmentDetails?.trainerRating || 4.9;
  const trainerSpecialty =
    appointmentDetails?.trainerSpecialty || 'High Intensity Training';
  const appointmentDate =
    appointmentDetails?.appointmentDate || '20 October 2021 - Wednesday';
  const appointmentTime = appointmentDetails?.appointmentTime || '09:30 AM';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Payment Completed!</Text>
      <Text style={styles.subtitle}>
        You’ve book a new appointment {'\n'}with your trainer.
      </Text>

      {/* Trainer Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Trainer</Text>
        <View style={styles.trainerRow}>
          <Image source={WorkoutDetailImage} style={styles.profileImage} />
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
        <View style={styles.timeRow}>
          <Text style={styles.time}>{appointmentTime}</Text>
          <Text style={styles.bell}>🔔</Text>
        </View>
      </View>

  <BigButton onPress={() => navigation.navigate('BottomNavbar')}>
  <Text style={[regular16, { color: '#000' }]}>Done</Text>
  </BigButton>
    </View>
  );
};

export default PaymentCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'center',
  },

  checkIcon: {
    fontSize: 24,
    color: '#C6FF3D',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
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
    backgroundColor: '#2C2C2E',
    marginVertical: 12,
  },
  date: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#fff',
  },
  bell: {
    fontSize: 16,
    color: '#fff',
  },
});
