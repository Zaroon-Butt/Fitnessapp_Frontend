import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';
import { normal, regular16 } from '../../utils/Style';
import BigButton from '../../Components/Buttons/BigButton';
import BackButton from '../../Components/Buttons/BackButton';
import TrainerDetailCard from '../../Components/Cards/TrainerDetailCard';
import { WorkoutDetailImage, Next, BackButtonIcon } from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scheduleAppointmentNotification } from '../../utils/NotificationService';
import { useSelector } from 'react-redux';
import NotificationModal from '../Modals/NotificationModal';
import AlertModal from '../Modals/AlertModal';

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('09:30 AM');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReminderTime, setModalReminderTime] = useState('');
  const [modalAppointmentTime, setModalAppointmentTime] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const today = new Date();
  const AppointmentNotification = useSelector(
    state => state.user.AppointmentNotification,
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Get trainer data from navigation params, fallback to default data
  const trainerData = route.params?.trainer || {
    name: 'Jennifer James',
    specialty: 'Functional Strength',
    experience: '6 years',
    rating: 4.8,
    image: WorkoutDetailImage,
  };

  const onDateChange = date => {
    setSelectedDate(date);
  };

  const generateTimeSlots = () => {
    const slots = [];
    let hour = 0;
    let minute = 0;

    // If selectedDate is today, filter out past times
    let isToday = false;
    if (selectedDate) {
      const selected = new Date(selectedDate);
      isToday =
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate();
    }

    while (hour < 24) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const displayMinute = minute === 0 ? '00' : '30';
      // Only show future slots if today is selected
      let showSlot = true;
      if (isToday) {
        const now = new Date();
        const slotDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hour,
          minute,
        );
        showSlot = slotDate > now;
      }
      if (showSlot) {
        slots.push(`${displayHour}:${displayMinute} ${period}`);
      }
      if (minute === 0) {
        minute = 30;
      } else {
        minute = 0;
        hour++;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={normal}>Appointment</Text>
        <View style={{ width: 40 }} />
      </View>

      <TrainerDetailCard
        trainer={trainerData}
        name={trainerData.name}
        specialty={trainerData.specialty}
        experience={trainerData.experience}
        rating={trainerData.rating}
        image={trainerData.image}
        showNextButton={false}
      />

      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>Select Appointment Date</Text>
        <CalendarPicker
          minDate={today}
          onDateChange={onDateChange}
          selectedDayColor="#D0FD3E"
          selectedDayTextColor="#000"
          todayBackgroundColor="#444"
          textStyle={{ color: '#fff' }}
          nextComponent={
            <Image
              source={Next}
              style={{ width: 20, height: 20, tintColor: '#fff' }}
            />
          }
          previousComponent={
            <Image
              source={BackButtonIcon}
              style={{ width: 20, height: 20, tintColor: '#fff' }}
            />
          }
          dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
          monthTitleStyle={{ color: '#fff', fontSize: 16 }}
          yearTitleStyle={{ color: '#fff', fontSize: 16 }}
          width={320}
          height={350}
        />
        {selectedDate && (
          <Text style={styles.selectedDateText}>
            Selected: {selectedDate.toString().substring(0, 15)}
          </Text>
        )}

        <Text style={styles.sectionTitle}>Select Time</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.timeScroll}
        >
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedSlot,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sendButtonContainer}>
        <BigButton
          onPress={async () => {
            if (!selectedDate) {
              setAlertTitle('Missing Information');
              setAlertMessage('Please select a date for your appointment.');
              setAlertVisible(true);
              return;
            }

            const appointmentDetails = {
              date: selectedDate.toString().substring(0, 15),
              time: selectedTime,
              trainer: {
                name: trainerData.name,
                specialty: trainerData.specialty,
                rating: trainerData.rating,
                image: trainerData.image,
              },
            };

            if (AppointmentNotification) {
              try {
                // Schedule notification
                const notificationResult = await scheduleAppointmentNotification(appointmentDetails);
                if (notificationResult) {
                  setModalReminderTime(notificationResult.reminderTime);
                  setModalAppointmentTime(notificationResult.appointmentTime);
                  setModalVisible(true);
                  return;
                }
              } catch (error) {
                console.error('Error scheduling notification:', error);
                setAlertTitle('Notification Error');
                setAlertMessage('Failed to schedule notification, but your appointment will still be processed.');
                setAlertVisible(true);
              }
            }
            // If AppointmentNotification is off or notification failed, just navigate
            navigation.navigate('Payment', {
              selectedDate,
              selectedTime,
              appointmentDetails,
            });
          }}
        >
          <Text style={[regular16, { color: '#000' }]}>Send</Text>
        </BigButton>
      </View>
      <NotificationModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.navigate('Payment', {
            selectedDate,
            selectedTime,
            appointmentDetails: {
              date: selectedDate?.toString().substring(0, 15),
              time: selectedTime,
              trainer: {
                name: trainerData.name,
                specialty: trainerData.specialty,
                rating: trainerData.rating,
                image: trainerData.image,
              },
            },
          });
        }}
        trainerName={trainerData.name}
        reminderTime={modalReminderTime}
        appointmentTime={modalAppointmentTime}
      />

      <AlertModal
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        alertTitle={alertTitle}
        alertMessage={alertMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  calendarContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#2c2c2e',
    borderRadius: 12,
    padding: 12,
    paddingTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  selectedDateText: {
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
  },
  timeScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  timeSlot: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 8,
  },
  selectedSlot: {
    backgroundColor: '#D0FD3E',
    borderColor: '#D0FD3E',
  },
  timeText: {
    color: '#aaa',
    fontSize: 14,
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  sendButtonContainer: {
    marginTop: 5,
    marginHorizontal: 16,
  },
});

export default Appointment;
