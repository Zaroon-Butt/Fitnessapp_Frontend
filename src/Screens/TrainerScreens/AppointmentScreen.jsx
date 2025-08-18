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
import { normal } from '../../utils/Style';
import BigButton from '../../Components/Buttons/BigButton';
import BackButton from '../../Components/Buttons/BackButton';
import TrainerDetailCard from '../../Components/Cards/TrainerDetailCard';
import { WorkoutDetailImage, Next, BackButtonIcon } from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';

const Appointment = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('09:30 AM');
  const navigation = useNavigation();
  const route = useRoute();
  const today = new Date();

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

    while (hour < 24) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      const displayMinute = minute === 0 ? '00' : '30';
      slots.push(`${displayHour}:${displayMinute} ${period}`);

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
          text="Send"
          onPress={() => {
            navigation.navigate('Payment', {
              selectedDate,
              selectedTime,
              appointmentDetails: {
                date: selectedDate
                  ? selectedDate.toString().substring(0, 15)
                  : null,
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
        />
      </View>
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
