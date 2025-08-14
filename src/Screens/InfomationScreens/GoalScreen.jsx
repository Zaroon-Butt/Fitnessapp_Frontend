import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normal, regular9 } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';

const GoalScreen = ({ onChange, initialGoal = 'Get Fitter' }) => {
  const [selectedGoal, setSelectedGoal] = useState(initialGoal);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const itemHeight = 65;

  const goals = [
    'Gain Weight',
    'Loose Weight',
    'Get Fitter',
    'More Flexible',
    'Learn The Basics',
  ];

  useEffect(() => {
    // Initialize scroll position after component mounts
    const timer = setTimeout(() => {
      const initialIndex = goals.indexOf(selectedGoal);
      if (initialIndex !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: initialIndex * itemHeight,
          animated: false,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.max(
      0,
      Math.min(goals.length - 1, Math.round(offsetY / itemHeight)),
    );
    const newGoal = goals[index];

    if (newGoal && newGoal !== selectedGoal) {
      setSelectedGoal(newGoal);
      // Remove auto-navigation during scrolling
      // onChange && onChange(newGoal);

      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const scrollToGoal = goal => {
    const index = goals.indexOf(goal);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: index * itemHeight,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    onChange && onChange(selectedGoal);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderGoalItem = (goal, index) => {
    const isSelected = goal === selectedGoal;
    const distance = Math.abs(
      goals.indexOf(goal) - goals.indexOf(selectedGoal),
    );
    const opacity = Math.max(0.2, 1 - distance * 0.3);
    const scale = isSelected ? 1 : Math.max(0.5, 1 - distance * 0.2);
    const translateY = distance === 1 ? -8 : distance === 2 ? -16 : 0;

    return (
      <TouchableOpacity
        key={goal}
        style={[styles.goalItem, { height: itemHeight }]}
        onPress={() => {
          setSelectedGoal(goal);
          // Remove auto-navigation when item is pressed
          // onChange && onChange(goal);
          scrollToGoal(goal);
        }}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.goalTextContainer,
            {
              opacity,
              transform: [{ scale }, { translateY }],
            },
          ]}
        >
          <Text style={[styles.goalText, isSelected && styles.selectedgoalText]}>
            {goal}
          </Text>
          {isSelected && <View style={styles.selectionIndicator} />}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={normal}>WHAT IS YOUR GOAL ?</Text>
        <Text style={[regular9, { marginTop: 8 }]}>
          THIS HELPS US CREATE YOUR PERSONALIZED PLAN
        </Text>
      </View>

      <View style={styles.spinnerContainer}>
        <View style={styles.selectionOverlay} />

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={itemHeight}
          decelerationRate="fast"
        >
          {goals.map((goal, index) => renderGoalItem(goal, index))}
        </ScrollView>
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
    height: 60,
    marginTop: -75,
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
    paddingTop: 165,
    paddingBottom: 260,
  },
  goalItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  goalTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  goalText: {
    fontSize: 30,
    fontWeight: '300',
    color: '#505050',
    textAlign: 'center',
  },
  selectedgoalText: {
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

export default GoalScreen;
