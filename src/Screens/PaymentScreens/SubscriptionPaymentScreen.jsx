import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
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

const SubscriptionPayment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isCard = useSelector(state => state.user.isCard);
  const cards = useSelector(state => state.user.cards || []);

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
        <Text style={styles.orderDetailSubtitle}>
          Plan: {route.params.plan} Selected
        </Text>
        <Text  style={styles.orderDetailSubtitle}>
          {' '}
          Price: {route.params.plan === 'monthly' ? '$19.99' : '$129.99'}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <BigButton
          text="Confirm"
          onPress={() => {
            if (cards.length === 0) return Alert.alert('Please Add a Card');
            navigation.navigate('BottomNavbar', {
              screen: 'SubscriptionPayment',
              params: {
                plan: route.params.plan,
              },
            });
          }}
          disabled={cards.length === 0}
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
  orderDetailSubtitle: {
    fontSize: 20,
    color: '#ffffff',
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

export default SubscriptionPayment;
