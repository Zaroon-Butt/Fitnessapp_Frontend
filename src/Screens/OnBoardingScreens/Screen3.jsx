import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normal } from '../../utils/Style';
import { RF } from '../../utils/responsive';
import { store } from '../../redux/store';
import { setIsOnboarding } from '../../redux/Reducers/userReducer';

const { width, height } = Dimensions.get('window');

export default function Screen3() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    store.dispatch(setIsOnboarding(false))
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image
          source={require('../../images/onBoarding3.png')}
          style={styles.image}
        />
        <View style={styles.gradientOverlay} />
      </View>
      <View style={styles.diagonalOverlay} />
      <View style={styles.textContainer}>
        <Text style={[normal, { fontSize: RF(18) }]}>ACTION IS THE KEY</Text>
        <Text style={[normal, { fontSize: RF(18) }]}>TO SUCCESS</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  backgroundImage: {
    width: width,
    height: height * 0.694,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 28, 30, 0.4)',
  },
  diagonalOverlay: {
    position: 'absolute',
    bottom: -50,
    right: -width * 0.25,
    width: width * 1.5,
    height: 350,
    backgroundColor: '#1C1C1E',
    transform: [{ rotate: '-20deg' }],
    zIndex: 0,
  },
  textContainer: {
    position: 'absolute',
    bottom: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#D0FD3E',
    bottom: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
