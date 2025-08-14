import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { normal } from '../../utils/Style';
import BigButton from '../../Components/Buttons/BigButton';
import BackButton from '../../Components/Buttons/BackButton';
import BankCard from '../../Components/Cards/BankCard';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { deleteCard, updateCard } from '../../redux/Reducers/userReducer';




const EditCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.user.cards || []);
  const { cardIndex } = route.params || {};

  // Get the card info if cardIndex is valid
  const card = typeof cardIndex === 'number' && cards[cardIndex] ? cards[cardIndex] : null;

  const [cardHolderName, setCardHolderName] = useState(card ? card.name : '');
  const [cardNumber, setCardNumber] = useState(card ? card.number.replace(/\s/g, '') : '');
  const [expiryDate, setExpiryDate] = useState(card ? card.expiry : '');
  const [cvc, setCvc] = useState(card ? card.cvc : '');
  const [formattedCardNumber, setFormattedCardNumber] = useState('');

  useEffect(() => {
    const formatted = cardNumber
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    setFormattedCardNumber(formatted);
  }, [cardNumber]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={normal}>Edit Card</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bankCardContainer}>
          <BankCard name={cardHolderName} number={formattedCardNumber} />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Card Holder Name"
            placeholderTextColor="#888"
            value={cardHolderName}
            onChangeText={setCardHolderName}
            maxLength={30}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#888"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            maxLength={16}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Expiry MM/YY"
              placeholderTextColor="#888"
              value={expiryDate}
              onChangeText={setExpiryDate}
              maxLength={5}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVC"
              placeholderTextColor="#888"
              value={cvc}
              onChangeText={setCvc}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              dispatch(deleteCard(cardIndex));
              navigation.goBack();
            }}
          >
            <Text style={styles.deleteButtonText}>Delete Card</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonWrapper}>
          <BigButton text="Done" onPress={() => {
            const updatedCardObj = {
              name: cardHolderName,
              number: formattedCardNumber,
              expiry: expiryDate,
              cvc: cvc,
            };
            dispatch(updateCard({ index: cardIndex, card: updatedCardObj }));
            navigation.goBack();
          }} />
        </View>
      </ScrollView>
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
  content: {
    paddingTop: 20,
  },
  bankCardContainer: {
    alignItems: 'center',
    marginBottom: 20,
    height: 200,
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 10,
    marginLeft: 8,
    marginTop: 5,
  },
  checkboxChecked: {
    backgroundColor: '#D0FD3E',
    borderColor: '#D0FD3E',
  },
  checkboxLabel: {
    color: '#fff',
    marginTop: 8,
    fontSize: 10,
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
});

export default EditCard;
