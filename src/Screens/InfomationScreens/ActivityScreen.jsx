import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normal, regular9 } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import BackButton from '../../Components/Buttons/BackButton';

const ITEM_HEIGHT = 65;

const ActivityScreen = ({ onChange, initialActivity = 'Beginner' }) => {
  const [selectedActivity, setSelectedActivity] = useState(initialActivity);
  const [containerHeight, setContainerHeight] = useState(0);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const activities = ['Rookie', 'Beginner', 'Intermediate', 'Advanced', 'True Beast'];

  const scrollToActivity = (activity, animated = true) => {
    const index = activities.indexOf(activity);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: index * ITEM_HEIGHT, animated });
    }
  };

  useEffect(() => {
    if (containerHeight > 0) {
      requestAnimationFrame(() => scrollToActivity(initialActivity, false));
    }
  }, [containerHeight, initialActivity]);

  const handleNext = () => {
    onChange?.(selectedActivity);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newActivity = activities[index];
    if (newActivity && newActivity !== selectedActivity) {
      setSelectedActivity(newActivity);
    }
  };

  const renderActivityItem = (activity, index) => {
    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
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
        key={activity}
        style={[styles.activityItem, { height: ITEM_HEIGHT }]}
        onPress={() => {
          setSelectedActivity(activity);
          scrollToActivity(activity);
        }}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.activityTextContainer,
            { transform: [{ scale }], opacity },
          ]}
        >
          <Text
            style={[
              styles.activityText,
              activity === selectedActivity && styles.selectedActivityText,
            ]}
          >
            {activity}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const spacerHeight = Math.max(0, containerHeight / 2 - ITEM_HEIGHT / 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={normal}>YOUR REGULAR PHYSICAL</Text>
        <Text style={normal}>ACTIVITY LEVEL?</Text>
        <Text style={[regular9, { marginTop: 10 }]}>
          THIS HELPS US CREATE YOUR PERSONALIZED PLAN
        </Text>
      </View>

      <View
        style={styles.spinnerContainer}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        {containerHeight > 0 && (
          <View
            pointerEvents="none"
            style={[
              styles.selectionOverlay,
              {
                top: containerHeight / 2 - ITEM_HEIGHT / 2,
                height: ITEM_HEIGHT,
              },
            ]}
          />
        )}

        <Animated.ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={{ height: spacerHeight }} />
          {activities.map((activity, index) => renderActivityItem(activity, index))}
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
    position: 'relative',
    width: '100%',
  },
  selectionOverlay: {
    position: 'absolute',
    left: 90,
    right: 90,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#d0fd3e',
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  activityItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  activityTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    fontSize: 36,
    fontWeight: '300',
    color: '#505050',
    textAlign: 'center',
  },
  selectedActivityText: {
    color: '#fff',
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
