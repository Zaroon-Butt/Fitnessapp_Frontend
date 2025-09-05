import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normal, regular9 } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';
import { ProvideContext } from '../../context/ProvideContext';

const itemHeight = 65;

const GoalScreen = ({ initialGoal = 'Get Fitter' }) => {
  const [selectedGoal, setSelectedGoal] = useState(initialGoal);
  const [containerHeight, setContainerHeight] = useState(0);
  const navigation = useNavigation();
  const { updateOnboarding } = useContext(ProvideContext);
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const goals = ['Gain Weight', 'Loose Weight', 'Get Fitter', 'More Flexible', 'Learn The Basics'];

  const scrollToGoal = (goal, animated = true) => {
    const index = goals.indexOf(goal);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: index * itemHeight, animated });
    }
  };

  useEffect(() => {
    if (containerHeight > 0) {
      requestAnimationFrame(() => scrollToGoal(initialGoal, false));
    }
  }, [containerHeight, initialGoal]);

  const handleNext = () => {
    console.log('Goal selected:', selectedGoal);
    updateOnboarding({ goal: selectedGoal });
    navigation.navigate('ActivityScreen');
  };
  const handleBack = () => navigation.goBack();

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
    const newGoal = goals[index];
    if (newGoal && newGoal !== selectedGoal) setSelectedGoal(newGoal);
  };

  const renderGoalItem = (goal, index) => {
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
        key={goal}
        style={[styles.goalItem, { height: itemHeight }]}
        onPress={() => {
          setSelectedGoal(goal);
          scrollToGoal(goal);
        }}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.goalTextContainer, { transform: [{ scale }], opacity }]}>
          <Text style={[styles.goalText, goal === selectedGoal && styles.selectedgoalText]}>{goal}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const spacerHeight = Math.max(0, containerHeight / 2 - itemHeight / 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={normal}>WHAT IS YOUR GOAL ?</Text>
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
          {goals.map((goal, index) => renderGoalItem(goal, index))}
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
  goalItem: { justifyContent: 'center', alignItems: 'center', width: '100%' },
  goalTextContainer: { alignItems: 'center', justifyContent: 'center', position: 'relative' },
  goalText: { fontSize: 36, fontWeight: '300', color: '#505050', textAlign: 'center' },
  selectedgoalText: { color: '#ffffff', fontWeight: '400' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 },
});

export default GoalScreen;
