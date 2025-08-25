import {
  View,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';
import { useState } from 'react';
import BackButton from '../../Components/Buttons/BackButton';
import { normal16, regular } from '../../utils/Style';

const NotificationSettingScreen = () => {
  const [workoutReminders, setWorkoutReminders] = useState(false);
  const [programNotification, setProgramNotification] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { marginLeft: 70 }]}>Settings</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={[regular, { marginLeft: 15 }]}>Workout Reminders </Text>
          <Switch
            value={workoutReminders}
            onValueChange={setWorkoutReminders}
            trackColor={{ false: '#767577', true: '#D0FD3E' }}
            thumbColor={workoutReminders ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.button}>
          <Text style={[regular, { marginLeft: 15 }]}>Program Notification</Text>
          <Switch
            value={programNotification}
            onValueChange={setProgramNotification}
            trackColor={{ false: '#767577', true: '#D0FD3E' }}
            thumbColor={programNotification ? '#ffffff' : '#f4f3f4'}
          />
        </View>
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
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 15,
  },
});

export default NotificationSettingScreen;
