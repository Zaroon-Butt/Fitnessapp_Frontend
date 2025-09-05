import { useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import { normal16, regular } from '../../utils/Style';
import { RF } from '../../utils/responsive';
import { setAppointmentNotification, setWorkoutReminder } from '../../redux/Reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeWorkoutReminders, sendTestNotification } from '../../utils/NotificationService';

const NotificationSettingScreen = () => {
  const WorkoutReminder = useSelector(state => state.user.WorkoutReminder);
  const AppointmentNotification = useSelector(state => state.user.AppointmentNotification);
  const dispatch = useDispatch();
  console.log('Appointment Notification:', AppointmentNotification);
  console.log('Workout Reminder:', WorkoutReminder);

  // Handle workout reminder toggle
  const handleWorkoutReminderToggle = async (value) => {
    dispatch(setWorkoutReminder(value));
    try {
      await initializeWorkoutReminders(value);
      console.log('Workout reminders', value ? 'enabled' : 'disabled');
    } catch (error) {
      console.error('Error toggling workout reminders:', error);
    }
  };

  // Initialize workout reminders on component mount
  useEffect(() => {
    const initReminders = async () => {
      try {
        await initializeWorkoutReminders(WorkoutReminder);
      } catch (error) {
        console.error('Error initializing workout reminders on mount:', error);
      }
    };
    initReminders();
  }, []); // Run once on mount


  // Test notification function
  // const handleTestNotification = async () => {
  //   try {
  //     const success = await sendTestNotification();
  //     if (success) {
  //       Alert.alert('Success', 'Test notification sent! Check your notification panel.');
  //     } else {
  //       Alert.alert('Error', 'Failed to send test notification. Please check your notification permissions.');
  //     }
  //   } catch (error) {
  //     console.error('Error sending test notification:', error);
  //     Alert.alert('Error', 'Failed to send test notification.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { flex: 1, marginRight: RF(10) }]}>
          Notification Settings
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={[regular, { marginLeft: RF(15) }]}> 
            Workout Reminders{' '}
          </Text>
          <Switch
            value={WorkoutReminder}
            onValueChange={handleWorkoutReminderToggle}
            trackColor={{ false: '#767577', true: '#D0FD3E' }}
            thumbColor={WorkoutReminder ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.button}>
          <Text style={[regular, { marginLeft: RF(15) }]}>
            Appointment Notification
          </Text>
          <Switch
            value={AppointmentNotification}
            onValueChange={value => dispatch(setAppointmentNotification(value))}
            trackColor={{ false: '#767577', true: '#D0FD3E' }}
            thumbColor={AppointmentNotification ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        {/* Test notification button */}
        {/* <TouchableOpacity style={styles.testButton} onPress={handleTestNotification}>
          <Text style={[regular, { color: '#000', textAlign: 'center' }]}>
            Send Test Notification
          </Text>
        </TouchableOpacity> */}
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
  },
  buttonContainer: {
    marginTop: RF(40),
  },
  button: {
    paddingVertical: RF(15),
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testButton: {
    backgroundColor: '#D0FD3E',
    paddingVertical: RF(12),
    paddingHorizontal: RF(20),
    borderRadius: RF(8),
    marginTop: RF(20),
    alignSelf: 'center',
  },
});

export default NotificationSettingScreen;
