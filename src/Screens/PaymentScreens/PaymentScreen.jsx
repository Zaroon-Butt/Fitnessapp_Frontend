import { useState } from 'react';
import { View,  Text,StyleSheet,  SafeAreaView,TouchableOpacity,ScrollView, Alert} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { normal, regular16 } from '../../utils/Style';
import BigButton from '../../Components/Buttons/BigButton';
import BackButton from '../../Components/Buttons/BackButton';
import TrainerDetailCard from '../../Components/Cards/TrainerDetailCard';
import BankCard from '../../Components/Cards/BankCard';
import { WorkoutDetailImage } from '../../utils';

const Payment = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const cards = useSelector(state => state.user.cards || []);

  const {
    selectedDate,
    selectedTime,
    appointmentDetails = {},
  } = params || {};

  const trainerData = appointmentDetails.trainer || {
    name: 'Jennifer James',
    specialty: 'Functional Strength',
    experience: '6 years',
    rating: 4.8,
    image: WorkoutDetailImage,
  };

  const today = new Date().toLocaleDateString();
  const appointmentDate =
    appointmentDetails.date ||
    (selectedDate
      ? selectedDate.toString().substring(0, 15)
      : today);

  const appointmentTime =
    selectedTime || appointmentDetails.time || 'Time not selected';

  const [estimatedCost] = useState(
    Math.round(Math.random() * 100) + 50
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={normal}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Bank Cards */}
      <View style={[styles.bankCardContainer, { padding: 10 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={[
              styles.AddCardContainer,
              cards.length === 0 && { width: 260 },
            ]}
            onPress={() => navigation.navigate('AddCard')}
          >
            <Text style={styles.addCardText}>+</Text>
          </TouchableOpacity>

          {cards.map((card, index) => (
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

      {/* Order Details */}
      <View style={styles.orderDetailContainer}>
        <Text style={styles.orderDetailTitle}>Order Details</Text>

        <View style={styles.trainerDetailContainer}>
          <TrainerDetailCard
            style={{ backgroundColor: '#1c1c1e', marginLeft: 0 }}
            name={trainerData.name}
            rating={trainerData.rating}
            specialty={trainerData.specialty}
            experience={trainerData.experience}
            image={trainerData.image}
            showNextButton={false}
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>Date: {appointmentDate}</Text>
          <Text style={styles.time}>Time: {appointmentTime}</Text>
        </View>

        <View style={styles.estimateContainer}>
          <Text style={styles.estimate}>
            Estimated Cost: ${estimatedCost}
          </Text>
        </View>
      </View>

      {/* Confirm Button */}
      <View style={styles.buttonWrapper}>
        <BigButton
          disabled={!cards || cards.length === 0 }
          onPress={() => {
            if (!cards || cards.length === 0) {
              Alert.alert(
                "No Payment Method",
                "Please add a payment method to continue.",
                [{ text: "OK" }]
              );
              return;
            }
            navigation.navigate('PaymentCompleteScreen', {
              appointmentDetails: {
                trainer: trainerData,
                date: appointmentDate,
                time: appointmentTime,
              },
            });
          }}
        >
          <Text style={[regular16, { color: '#000' }]}>Confirm</Text>
        </BigButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1e' },
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
  orderDetailContainer: { paddingHorizontal: 20, marginTop: 5 },
  orderDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  date: { fontSize: 14, color: '#fff', marginTop: 12 },
  time: { fontSize: 14, color: '#fff', marginTop: 8 },
  estimate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    padding: 10,
  },
  buttonWrapper: { paddingHorizontal: 20, marginTop: 30 },
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
  scrollContainer: { alignItems: 'center', paddingHorizontal: 10 },
  cardWrapper: { marginLeft: 5 },
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
  bankCardWrapper: { transform: [{ scale: 0.8 }] },
  addCardText: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
});
export default Payment;
