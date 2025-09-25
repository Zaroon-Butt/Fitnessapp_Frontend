import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RF } from '../../utils/responsive'; // use RF(val) or replace with val directly
import { Subscription } from '../../utils'; // Replace with actual image, e.g. require('../../assets/Subscription.jpg')
import { medium, regular, regular16, regular9 } from '../../utils/Style';
import BackButton from '../../Components/Buttons/BackButton';
import BigButton from '../../Components/Buttons/BigButton';

const { width, height } = Dimensions.get('window');

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Background image with dark gradient overlay */}
      <ImageBackground source={Subscription} style={styles.backgroundImage}>
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>
        <View style={styles.gradientOverlay}>
          <Text style={[medium, { textAlign: 'left', marginBottom: 5 }]}>
            BE PREMIUM
          </Text>
          <Text style={[medium, { textAlign: 'left' }]}>GET UNLIMITED</Text>
          <Text style={[medium, { textAlign: 'left' }]}>ACCESS</Text>
          <Text
            style={[
              regular9,
              { marginBottom: 120, marginTop: 20, textAlign: 'left' },
            ]}
          >
            When you subscribe, you’ll get instant unlimited access
          </Text>
        </View>
      </ImageBackground>

      {/* Diagonal transition overlay */}
      <View style={styles.diagonalOverlay} />

      {/* Subscription options */}
      <View style={styles.subscriptionContainer}>
        {/* Monthly Option */}
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'monthly' && styles.activePlanCard,
          ]}
          onPress={() => setSelectedPlan('monthly')}
        >
          <View style={styles.planLeft}>
            <View
              style={[
                styles.radioButton,
                selectedPlan === 'monthly' && styles.radioSelected,
              ]}
            />
            <View>
              <Text style={[regular, { textAlign: 'left' }]}>Monthly</Text>
              <Text style={[regular9, { textAlign: 'left' }]}>Pay monthly cancel any time</Text>
            </View>
          </View>
          <Text style={styles.planPrice}>
            $ 19.99 <Text style={styles.unit}>/m</Text>
          </Text>
        </TouchableOpacity>

        {/* Yearly Option */}
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'yearly' && styles.activePlanCard,
          ]}
          onPress={() => setSelectedPlan('yearly')}
        >
          <View style={styles.planLeft}>
            <View
              style={[
                styles.radioButton,
                selectedPlan === 'yearly' && styles.radioSelected,
              ]}
            />
            <View>
              <Text style={[regular, { textAlign: 'left' }]}>Yearly</Text>
              <Text style={regular9}>Pay for a full year</Text>
            </View>
          </View>
          <Text style={styles.planPrice}>
            $ 129.99 <Text style={styles.unit}>/y</Text>
          </Text>
        </TouchableOpacity>

        {/* Subscribe Button */}

        <BigButton
          onPress={() => {
            navigation.navigate('SubscriptionPayment', { plan: selectedPlan });
          }}
        >
          <Text style={[regular16, { color: '#000' }]}>Subscribe Now</Text>
        </BigButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  backgroundImage: {
    width: width,
    height: height * 0.55,
    justifyContent: 'flex-end',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  gradientOverlay: {
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  diagonalOverlay: {
    position: 'absolute',
    top: height * 0.5 - 40,
    left: -width * 0.5,
    width: width * 2,
    height: 200,
    backgroundColor: '#1C1C1E',
    transform: [{ rotate: '-15deg' }],
    zIndex: 1,
  },
  subscriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 2,
  },
  planCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
  },
  activePlanCard: {
    borderColor: '#FF3B30',
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#FF3B30',
    backgroundColor: '#FF3B30',
  },

  planPrice: {
    color: 'white',
    fontSize: RF(16),
    flexShrink: 0,
  },
  unit: {
    color: '#CCC',
    fontSize: RF(10),
  },
});
