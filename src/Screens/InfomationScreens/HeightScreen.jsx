import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normal, regular9 } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import { ProvideContext } from '../../context/ProvideContext';

const itemHeight = 80;

const HeightScreen = ({ initialHeight = 170 }) => {
  const [selectedHeight, setSelectedHeight] = useState(initialHeight);
  const [containerHeight, setContainerHeight] = useState(0);
  const navigation = useNavigation();
  const { updateOnboarding } = useContext(ProvideContext);
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const heights = Array.from({ length: 81 }, (_, i) => i + 120);

  const scrollToHeight = (height, animated = true) => {
    const index = heights.indexOf(height);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: index * itemHeight, animated });
    }
  };

  useEffect(() => {
    if (containerHeight > 0) {
      requestAnimationFrame(() => scrollToHeight(initialHeight, false));
    }
  }, [containerHeight, initialHeight]);

  const handleNext = () => {
    console.log('Height selected:', selectedHeight);
    updateOnboarding({ height: selectedHeight });
    navigation.navigate('GoalScreen');
  };
  const handleBack = () => navigation.goBack();

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
    const newHeight = heights[index];
    if (newHeight !== undefined && newHeight !== selectedHeight) {
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
        style={[styles.heightItem, { height: itemHeight }]}
        onPress={() => {
          setSelectedHeight(height);
          scrollToHeight(height);
        }}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.heightTextContainer, { transform: [{ scale }], opacity }]}>
          <Text style={[styles.heightText, height === selectedHeight && styles.selectedHeightText]}>
            {height} <Text style={styles.heightUnit}>cm</Text>
          </Text>
          {height === selectedHeight}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const spacerHeight = Math.max(0, containerHeight / 2 - itemHeight / 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={normal}>WHAT IS YOUR HEIGHT</Text>
        <Text style={[regular9, { marginTop: 8 }]}>THIS HELPS US CREATE YOUR PERSONALIZED PLAN</Text>
      </View>
      <View style={styles.spinnerContainer} onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}>
        {containerHeight > 0 && (
          <View
            pointerEvents="none"
            style={[styles.selectionOverlay, { top: containerHeight / 2 - itemHeight / 2, height: itemHeight }]}
          />
        )}
        <Animated.ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        >
          <View style={{ height: spacerHeight }} />
          {heights.map((height, index) => renderHeightItem(height, index))}
          <View style={{ height: spacerHeight }} />
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
  container: { flex: 1, backgroundColor: '#1c1c1e', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 60 },
  spinnerContainer: { flex: 1, position: 'relative', width: '100%' },
  selectionOverlay: { position: 'absolute', left: 90, right: 90, borderTopWidth: 3, borderBottomWidth: 3, borderColor: '#d0fd3e', zIndex: 10 },
  scrollView: { flex: 1, width: '100%' },
  heightItem: { justifyContent: 'center', alignItems: 'center', width: '100%' },
  heightTextContainer: { alignItems: 'center', justifyContent: 'center', position: 'relative' },
  heightText: { fontSize: 36, fontWeight: '300', color: '#505050', textAlign: 'center' },
  selectedHeightText: { color: '#ffffff', fontWeight: '400' },
  heightUnit: { fontSize: 24, fontWeight: '300', color: '#ffffff', opacity: 0.8, marginLeft: 8 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 },
});

export default HeightScreen;
