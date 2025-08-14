import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normal, regular } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import { RF } from '../../utils/responsive';

const { height: screenHeight } = Dimensions.get('window');
const itemHeight = 80;

const HeightScreen = ({ onChange, initialHeight = 170 }) => {
  const [selectedHeight, setSelectedHeight] = useState(initialHeight);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value((initialHeight - 120) * itemHeight)).current;

  const heights = Array.from({ length: 81 }, (_, i) => i + 120);

  const scrollToHeight = (height) => {
    const index = heights.indexOf(height);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.getNode().scrollTo({
        y: index * itemHeight,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    onChange && onChange(selectedHeight);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    const newHeight = heights[index];

    if (newHeight !== selectedHeight) {
      setSelectedHeight(newHeight);
    }
  };

  const renderHeightItem = (height, index) => {
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
        key={height}
        onPress={() => {
          setSelectedHeight(height);
          scrollToHeight(height);
        }}
        activeOpacity={0.7}
        style={{ height: itemHeight, justifyContent: 'center', alignItems: 'center' }}
      >
        <Animated.View
          style={{
            transform: [{ scale }],
            opacity,
            alignItems: 'center',
          }}
        >
          <Text style={[styles.ageText, height === selectedHeight && styles.selectedAgeText]}>
            {height} <Text style={styles.heightUnit}>cm</Text>
          </Text>
          {height === selectedHeight && <View style={styles.selectionIndicator} />}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={normal}>WHAT IS YOUR HEIGHT</Text>
        <Text style={[regular, { fontSize: RF(9), marginTop: 8 }]}>
          THIS HELPS US CREATE YOUR PERSONALIZED PLAN
        </Text>
      </View>

      <View style={styles.spinnerContainer}>
        <View style={styles.selectionOverlay} />

        <Animated.ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          overScrollMode="never"
          contentOffset={{ y: (initialHeight - 120) * itemHeight }}
        >
          {heights.map((height, index) => renderHeightItem(height, index))}
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
    marginTop: -75,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#d0fd3e',
    zIndex: 1,
  },
  scrollContent: {
    paddingVertical: 165,
    paddingBottom: 260,
  },
  ageText: {
    fontSize: 36,
    fontWeight: '300',
    color: '#505050',
    textAlign: 'center',
  },
  selectedAgeText: {
    color: '#ffffff',
    fontWeight: '400',
  },
  heightUnit: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ffffff',
    opacity: 0.8,
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default HeightScreen;
