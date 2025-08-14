import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { heading, normal } from '../../utils/Style';
import { RF } from '../../utils/responsive';
import { onboard2 } from '../../utils';

const { width, height } = Dimensions.get('window');

export default function Screen2() {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image
          source={onboard2}
          style={styles.image}
        />
        <View style={styles.gradientOverlay} />
      </View>
      <View style={styles.diagonalOverlay} />
      <View style={styles.textContainer}>
        <Text style={[normal,{fontSize: RF(18)}]}>CREATE A WORKOUT PLAN</Text>
        <Text style={[normal,{fontSize: RF(18)}]}>TO STAY FIT</Text>
      </View>
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
    zIndex: 1,
  },
});
