import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normal, regular } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import { RF } from '../../utils/responsive';

const { height: screenHeight } = Dimensions.get('window');
const itemHeight = 80;

const AgeScreen = ({ onAgeChange, initialAge = 35 }) => {
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value((initialAge - 13) * itemHeight)).current;

  const ages = Array.from({ length: 68 }, (_, i) => i + 13);

  const scrollToAge = (age) => {
    const index = ages.indexOf(age);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.getNode().scrollTo({
        y: index * itemHeight,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    onAgeChange && onAgeChange(selectedAge);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    const newAge = ages[index];
    if (newAge !== selectedAge) {
      setSelectedAge(newAge);
    }
  };

  const renderAgeItem = (age, index) => {
    const inputRange = [
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
      (index + 1) * itemHeight,
      (index + 2) * itemHeight,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.6, 0.8, 1, 0.8, 0.6],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.3, 0.6, 1, 0.6, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        key={age}
        style={[styles.ageItem, { height: itemHeight }]}
        onPress={() => {
          setSelectedAge(age);
          scrollToAge(age);
        }}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.ageTextContainer,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <Text style={[styles.ageText, age === selectedAge && styles.selectedAgeText]}>
            {age}
          </Text>
          {age === selectedAge && <View style={styles.selectionIndicator} />}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={normal}>HOW OLD ARE YOU ?</Text>
        <Text style={[regular, { fontSize: RF(9), marginTop: 8 }]}>
          THIS HELPS US CREATE YOUR PERSONALIZED PLAN
        </Text>
      </View>

      <View style={styles.spinnerContainer}>
        <View style={styles.selectionOverlay} />

        <Animated.ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          contentOffset={{ y: (initialAge - 13) * itemHeight }}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {ages.map((age, index) => renderAgeItem(age, index))}
        </Animated.ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <BackButton onPress={handleBack} />
        <NextButton onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectionOverlay: {
    position: 'absolute',
    top: '50%',
    left: 90,
    right: 90,
    height: 70,
    marginTop: -68,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#d0fd3e',
    zIndex: 1,
  },
  scrollView: {
    height: 400,
    width: '100%',
  },
  scrollContent: {
    paddingVertical: 165,
    paddingBottom: 250,
  },
  ageItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ageText: {
    fontSize: 56,
    fontWeight: '300',
    color: '#505050',
    textAlign: 'center',
  },
  selectedAgeText: {
    color: '#ffffff',
    fontWeight: '400',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },

});

export default AgeScreen;
