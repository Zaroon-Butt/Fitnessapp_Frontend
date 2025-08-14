// src/Screens/OnBoardingScreens/Onboarding.js
import React from 'react';
import { StyleSheet ,View} from 'react-native';
import Swiper from 'react-native-swiper';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';


export default function Onboarding() {
  return (
    <Swiper
      loop={false}
      showsPagination={true}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      <View style={styles.screen}>
        <Screen1 />
      </View>
      <View style={styles.screen}>
        <Screen2 />
      </View>
      <View style={styles.screen}>
        <Screen3 />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#1C1C1E',
    },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 20,
    height: 4,
    borderRadius: 2,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#D0FD3E',
    width: 30,
    height: 4,
    borderRadius: 2,
    margin: 3,
  },
});
