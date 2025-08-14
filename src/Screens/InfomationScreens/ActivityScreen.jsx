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
import { normal16, regular, regular9 } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';

const { height: screenHeight } = Dimensions.get('window');

const ActivityScreen = ({ onChange, initialActivity = 'Beginner' }) => {
  const [selectedActivity, setSelectedActivity] = useState(initialActivity);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const itemHeight = 65;

  const Activity = [
    'Rookie',
    'Beginner',
    'Intermediate',
    'Advanced',
    'True Beast',
  ];

  useEffect(() => {
    // Initialize scroll position after component mounts
    setTimeout(() => {
      const initialIndex = Activity.indexOf(selectedActivity);
      if (scrollViewRef.current && initialIndex !== -1) {
        scrollViewRef.current.scrollTo({
          y: initialIndex * itemHeight,
          animated: false,
        });
      }
    }, 100);
  }, []);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);

    // Ensure index is within bounds
    if (index >= 0 && index < Activity.length) {
      const newActivity = Activity[index];

      if (newActivity && newActivity !== selectedActivity) {
        setSelectedActivity(newActivity);

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
    }
  };

  const scrollToActivity = activity => {
    const index = Activity.indexOf(activity);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: index * itemHeight,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    onChange && onChange(selectedActivity);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderActivityItem = (activity, index) => {
    const isSelected = activity === selectedActivity;
    const distance = Math.abs(
      Activity.indexOf(activity) - Activity.indexOf(selectedActivity),
    );
    const opacity = Math.max(0.2, 1 - distance * 0.3);
    const scale = isSelected ? 1 : Math.max(0.5, 1 - distance * 0.2);
    const translateY = distance === 1 ? -8 : distance === 2 ? -16 : 0;

    return (
      <TouchableOpacity
        key={activity}
        style={[styles.activityItem, { height: itemHeight }]}
        onPress={() => {
          setSelectedActivity(activity);

          scrollToActivity(activity);
        }}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.activityTextContainer,
            {
              opacity,
              transform: [{ scale }, { translateY }],
            },
          ]}
        >
          <Text
            style={[
              styles.activityText,
              isSelected && styles.selectedactivityText,
            ]}
          >
            {activity}
          </Text>
          {isSelected && <View style={styles.selectionIndicator} />}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={normal16}>YOUR REGULAR PHYSICAL</Text>
        <Text style={normal16}> ACTIVITY LEVEL ?</Text>
        <Text style={[regular9, {marginTop: 10}]}>
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
          contentOffset={{ y: Activity.indexOf(selectedActivity) * itemHeight }}
        >
          {Activity.map((activity, index) =>
            renderActivityItem(activity, index),
          )}
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
    marginTop: -55,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#d0fd3e',
    zIndex: 1,
  },
  scrollView: {
    height: 300,
    width: '100%',
  },
  scrollContent: {
    paddingVertical: 175,
    paddingBottom: 240,
  },
  activityItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  activityTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activityText: {
    fontSize: 30,
    fontWeight: '300',
    color: '#505050',
    textAlign: 'center',
  },
  selectedactivityText: {
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

export default ActivityScreen;
