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
import { useNavigation } from '@react-navigation/native';
import { normal, regular16 } from '../../utils/Style';
import BigButton from '../../Components/Buttons/BigButton';
import BackButton from '../../Components/Buttons/BackButton';
import BankCard from '../../Components/Cards/BankCard';
import { store } from '../../redux/store';
import { addCard } from '../../redux/Reducers/userReducer';

const AddCard = () => {
  const navigation = useNavigation();
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false);
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
        <BackButton />
        <Text style={normal}>Add new Card</Text>
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
            onChangeText={text => setCardNumber(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={16}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Expiry MM/YY"
              placeholderTextColor="#888"
              value={expiryDate}
              onChangeText={text => setExpiryDate(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={4}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVC"
              placeholderTextColor="#888"
              value={cvc}
              onChangeText={text => setCvc(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, saveCard && styles.checkboxChecked]}
              onPress={() => setSaveCard(!saveCard)}
            />
            <TouchableOpacity onPress={() => setSaveCard(!saveCard)}>
              <Text style={styles.checkboxLabel}>
                Save as default payment card
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <BigButton
            onPress={() => {
              if (cardHolderName && cardNumber) {
                const cardData = {
                  name: cardHolderName,
                  number: formattedCardNumber,
                  expiryDate: expiryDate,
                  cvc: cvc,
                  isDefault: saveCard,
                };
                store.dispatch(addCard(cardData));
                navigation.goBack();
              }
            }}
          >
            <Text style={[regular16, { color: '#000' }]}>Done</Text>
          </BigButton>
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
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
});

export default AddCard;
