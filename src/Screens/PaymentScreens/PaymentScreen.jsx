import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { normal } from '../../utils/Style';
import BigButton from '../../Components/Buttons/BigButton';
import BackButton from '../../Components/Buttons/BackButton';
import TrainerDetailCard from '../../Components/Cards/TrainerDetailCard';
import { WorkoutDetailImage } from '../../utils';
import BankCard from '../../Components/Cards/BankCard';
import { useNavigation } from '@react-navigation/native';

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isCard = useSelector(state => state.user.isCard);
  const cards = useSelector(state => state.user.cards || []);

  const { selectedDate, selectedTime, appointmentDetails } = route.params || {};
  const trainerName = appointmentDetails?.trainer?.name;
  const trainerSpecialty =
    appointmentDetails?.trainer?.specialty || 'Personal Trainer';
  const trainerRating = appointmentDetails?.trainer?.rating || 4.8;
  const appointmentTime = selectedTime || 'Time not selected';
  const appointmentDate =
    appointmentDetails?.date ||
    (selectedDate
      ? selectedDate.toString().substring(0, 15)
      : 'Date not selected');

  const generateRandomPrice = () => {
    return Math.round(Math.random() * 100) + 50;
  };
  const [estimatedCost] = useState(generateRandomPrice());

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={normal}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.bankCardContainer, { padding: 10 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {
            <TouchableOpacity
              style={[
                styles.AddCardContainer,
                cards.length === 0 && { width: 260 },
              ]}
              onPress={() => navigation.navigate('AddCard')}
            >
              <Text style={styles.addCardText}>+</Text>
            </TouchableOpacity>
          }
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('EditCard', { cardIndex: index })
                }
                style={styles.cardWrapper}
              >
                <View style={styles.bankCardWrapper}>
                  <BankCard name={card.name} number={card.number} />
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <View style={styles.orderDetailContainer}>
        <Text style={styles.orderDetailTitle}>Order Details</Text>
        <View style={styles.trainerDetailContainer}>
          <TrainerDetailCard
            style={{ backgroundColor: '#1c1c1e', marginLeft: 0 }}
            name={trainerName}
            rating={trainerRating}
            specialty={trainerSpecialty}
            image={WorkoutDetailImage}
            showNextButton={false}
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>Date: {appointmentDate}</Text>
          <Text style={styles.time}>Time: {appointmentTime}</Text>
        </View>
        <View style={styles.estimateContainer}>
          <Text style={styles.estimate}>Estimated Cost: ${estimatedCost}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <BigButton
          text="Confirm"
          onPress={() =>
            navigation.navigate('PaymentCompleteScreen', {
              appointmentDetails: {
                trainer: {
                  name: trainerName,
                  specialty: trainerSpecialty,
                  rating: trainerRating,
                },
                date: appointmentDate,
                time: appointmentTime,
              },
            })
          }
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
  },
  bankCardContainer: {
    alignItems: 'center',
    marginBottom: 10,
    height: 220,
    paddingHorizontal: 10,
  },
  orderDetailContainer: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  orderDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    color: '#fff',
    marginTop: 12,
  },
  time: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
  },
  estimate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    padding: 10,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  dateTimeContainer: {
    borderBottomColor: '#2C2C2E',
    borderBottomWidth: 2,
    padding: 10,
  },
  estimateContainer: {
    borderBottomColor: '#2C2C2E',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  trainerDetailContainer: {
    borderBottomColor: '#2C2C2E',
    borderBottomWidth: 2,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  cardWrapper: {
    marginLeft: 5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  AddCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 150,
    backgroundColor: '#2C2C2E',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3A3A3C',
    borderStyle: 'dashed',
  },
  bankCardWrapper: {
    transform: [{ scale: 0.8 }],
  },
  addCardText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Payment;
